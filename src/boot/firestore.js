import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

Vue.use(firestorePlugin)

const config = {
  // apiKey: 'AIzaSyAoqcdLi-dgX4EXVgFcY-Wut-3ZoXLGXgw',
  // authDomain: 'training-87b39.firebaseapp.com',
  // databaseURL: 'https://training-87b39.firebaseio.com',
  // projectId: 'training-87b39',
  // storageBucket: 'training-87b39.appspot.com',
  // messagingSenderId: '564213086001',
  // appId: '1:564213086001:web:de085735279afb41f4e210',
  // measurementId: 'G-HVJRJD6D5S'
  apiKey: 'AIzaSyAojwrPkFbJ2OKwZblGDxcKoyLyD-L0ueE',
  authDomain: 'training-mge.firebaseapp.com',
  databaseURL: 'https://training-mge.firebaseio.com',
  projectId: 'training-mge',
  storageBucket: 'training-mge.appspot.com',
  messagingSenderId: '550176888114',
  appId: '1:550176888114:web:0db4b12cd3a1a1a314332b',
  measurementId: 'G-N4KM1F0EE1'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
// Get a Firestore instance
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export const Storage = firebase.storage()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
