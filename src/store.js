// Reactive state store with dirty-flag targeted rendering (Item 10 + 11).
//
// The `state` export is a Proxy that forwards all property reads/writes to the
// internal `_state` object, so existing `state.bills.push(x)` code works
// without any call-site changes during the incremental module migration.
//
// New code should prefer `getState()` / `setState()` for explicit control.

let _state = {};
const _subscribers = new Set();

// Dirty-flag system: track which sections need re-rendering.
// '__all__' means every section should re-render (legacy renderAll behaviour).
const _dirty = new Set();

// Registered by main.js after safeRender is defined.
let _sectionRenderers = {};
let _renderAllFn = null;
let _renderScheduled = false;

export function registerSectionRenderers(map, renderAllFn) {
  _sectionRenderers = map;
  _renderAllFn = renderAllFn;
}

function _scheduleFlush() {
  if (_renderScheduled) return;
  _renderScheduled = true;
  requestAnimationFrame(_flushRender);
}

function _flushRender() {
  _renderScheduled = false;
  if (!_renderAllFn) return;
  if (_dirty.has('__all__') || _dirty.size === 0) {
    _dirty.clear();
    _renderAllFn();
    return;
  }
  // Targeted: render only dirty sections + always re-render today (aggregates all data)
  const toRender = new Set(_dirty);
  _dirty.clear();
  toRender.add('today'); // today always reflects latest state
  toRender.forEach(section => {
    const fns = _sectionRenderers[section];
    if (fns) fns.forEach(fn => { try { fn(); } catch (e) { console.error('render error in', section, e); } });
  });
}

export function getState() {
  return _state;
}

// Mutate state, persist, and schedule a targeted re-render.
// `sections`: array of section keys to mark dirty, e.g. ['bills', 'today'].
// Omit `sections` (or pass null) to do a full renderAll.
export function setState(updater, { save = true, sections = null } = {}) {
  if (typeof updater === 'function') {
    updater(_state);
  } else {
    Object.assign(_state, updater);
  }
  if (save && typeof window._saveData === 'function') window._saveData(_state);
  if (sections) {
    sections.forEach(s => _dirty.add(s));
  } else {
    _dirty.add('__all__');
  }
  _scheduleFlush();
  _notifySubscribers();
}

// Subscribe to every state change. Returns an unsubscribe function.
// Used by renderAll for the legacy call-site pattern.
export function subscribe(fn) {
  _subscribers.add(fn);
  return () => _subscribers.delete(fn);
}

function _notifySubscribers() {
  _subscribers.forEach(fn => { try { fn(_state); } catch (e) { console.error('store subscriber error:', e); } });
}

// Replace the entire state object (called by Firestore sync — no save needed).
export function _replaceState(newData) {
  _state = newData;
  _dirty.add('__all__');
  _scheduleFlush();
  _notifySubscribers();
}

// Seed initial state from loadData() — called once at startup.
export function _initState(data) {
  _state = data;
}

// Proxy-based `state` export: every `state.x = y` / `state.x` in the existing
// codebase continues to work, reading and writing through to `_state`.
export const state = new Proxy({}, {
  get(_, key) {
    if (key === 'then') return undefined; // prevent Promise.resolve(state) issues
    return _state[key];
  },
  set(_, key, val) {
    _state[key] = val;
    return true;
  },
  has(_, key)            { return key in _state; },
  ownKeys()              { return Reflect.ownKeys(_state); },
  getOwnPropertyDescriptor(_, key) {
    const desc = Object.getOwnPropertyDescriptor(_state, key);
    return desc ? { ...desc, configurable: true } : undefined;
  },
});
