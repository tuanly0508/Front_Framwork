import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDJ2dN7IZuv9_V2DN_UK_HeMRk_iVo7qY8",
  authDomain: "front-famework.firebaseapp.com",
  projectId: "front-famework",
  storageBucket: "front-famework.appspot.com",
  messagingSenderId: "1093177927642",
  appId: "1:1093177927642:web:6241b4ee46c2cf7dbe82e3"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)