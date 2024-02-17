import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
	getAuth,
	getReactNativePersistence,
	initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_APP_ID,
	measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
// initialize auth with persitance?
if (Platform.OS !== "web") {
	initializeAuth(app, {
		persistence: getReactNativePersistence(ReactNativeAsyncStorage),
	});
}

const auth = getAuth();
export { auth, getAuth };



