import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import firebaseConfig from '../../../firebase';
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import {initializeApp, getApp, getApps} from "firebase/app"
import {getFirestore, collection, query, getDocs, where, limit, doc, getDoc, addDoc, updateDoc, deleteDoc, runTransaction} from "firebase/firestore"

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  
  ],

  adapter: FirebaseAdapter({
    db, collection, query, getDocs, where, limit, doc, getDoc, addDoc, updateDoc, deleteDoc, runTransaction,
  }),
  secret: process.env.JWT_SECRET,
})