import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createContext } from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyBh74KWDe7wJ5hSm9AOtoLehagNdUkRLOI",
  authDomain: "chat-a8cec.firebaseapp.com",
  projectId: "chat-a8cec",
  storageBucket: "chat-a8cec.appspot.com",
  messagingSenderId: "103541466905",
  appId: "1:103541466905:web:c54d2199157235484a8788",
  measurementId: "G-Q8QMJVCY98"
});
const auth = firebase.auth()
const firestore = firebase.firestore()
export const Context = createContext<any|null>(null)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    firebase,
    auth, 
    firestore
  }}>
    <App />
  </Context.Provider>
);
