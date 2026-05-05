import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore, enableIndexedDbPersistence,
  doc, getDoc, setDoc, deleteDoc, onSnapshot,
} from 'firebase/firestore';

const _app  = initializeApp(window.__FIREBASE_CONFIG__);
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

window.__firebaseReady = true;
window.dispatchEvent(new Event('firebase-ready'));
