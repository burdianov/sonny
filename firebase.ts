import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCpFStSU694m_o5nZ4A0GeAoDYIaypGBhs',
  authDomain: 'sonny-bb68c.firebaseapp.com',
  projectId: 'sonny-bb68c',
  storageBucket: 'sonny-bb68c.appspot.com',
  messagingSenderId: '675295819248',
  appId: '1:675295819248:web:778572440de0c1ad0b5935'
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
