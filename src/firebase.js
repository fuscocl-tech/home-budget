import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore, enableIndexedDbPersistence,
  doc, getDoc, setDoc, deleteDoc, onSnapshot,
} from 'firebase/firestore';

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyBiQq8lIf5yCKGDyinGjLaeAE100u7vF90',
  authDomain:        'home-budget-b0f28.firebaseapp.com',
  projectId:         'home-budget-b0f28',
  storageBucket:     'home-budget-b0f28.firebasestorage.app',
  messagingSenderId: '777614158624',
  appId:             '1:777614158624:web:a8636d1b5894ae4d3e8545',
};

// E2E tests inject window.__FIREBASE_STUB__ = true via page.addInitScript
// before this module runs. When stubbed, skip real Firebase init so tests
// don't hang waiting for network or auth state.
if (window.__FIREBASE_STUB__) {
  const noop    = () => {};
  const noopSub = () => noop;
  window.fbAuth = {
    onAuthStateChanged: noopSub,
    signInWithPopup: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
    GoogleAuthProvider: function() {},
    get currentUser() { return null; },
  };
  window.fbStore = {
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({ exists: false, data: () => ({}) }),
        set: () => Promise.resolve(),
        delete: () => Promise.resolve(),
        onSnapshot: noopSub,
      }),
    }),
  };
} else {
  const _app  = initializeApp(FIREBASE_CONFIG);
  const _auth = getAuth(_app);
  const _db   = getFirestore(_app);

  enableIndexedDbPersistence(_db, { forceOwnership: false }).catch(err => {
    if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
      console.warn('Firestore persistence error:', err.code);
    }
  });

  window.fbAuth = {
    _auth,
    onAuthStateChanged: (cb) => onAuthStateChanged(_auth, cb),
    signInWithPopup:    (provider) => signInWithPopup(_auth, provider),
    signOut:            () => signOut(_auth),
    GoogleAuthProvider,
    get currentUser()   { return _auth.currentUser; },
  };

  window.fbStore = {
    _db,
    collection: (path) => ({
      doc: (id) => ({
        _ref:       doc(_db, path, id),
        get:        ()      => getDoc(doc(_db, path, id)),
        set:        (data)  => setDoc(doc(_db, path, id), data),
        delete:     ()      => deleteDoc(doc(_db, path, id)),
        onSnapshot: (cb, errCb) => onSnapshot(doc(_db, path, id), cb, errCb),
      }),
    }),
  };
}

window.__firebaseReady = true;
window.dispatchEvent(new Event('firebase-ready'));
