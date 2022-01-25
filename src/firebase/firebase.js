// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDCgT4BhbVMjcFUdG7eBc86VaFPtqsa7-8',
    authDomain: 'comprafacil-5c98e.firebaseapp.com',
    projectId: 'comprafacil-5c98e',
    storageBucket: 'comprafacil-5c98e.appspot.com',
    messagingSenderId: '26608892632',
    appId: '1:26608892632:web:bf8bef966ae678fcc435ad',
    measurementId: 'G-VKEDKZDF01',
}

// Initialize Firebase
initializeApp(firebaseConfig)

export default getFirestore()
