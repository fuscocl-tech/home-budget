/**
 * Thin wrapper around the _secure* functions in main.js.
 * main.js pre-warms the cache at startup and exposes these on window
 * so section modules can import them without a circular dependency.
 *
 * All reads are synchronous (from the in-memory cache).
 * Writes are fire-and-forget async to Capacitor Preferences + localStorage fallback.
 */

export function prefsGet(key)        { return window._secureGet(key); }
export function prefsSet(key, val)   { window._secureSet(key, val); }
export function prefsClear(key)      { window._secureClear(key); }
