import { Redirect, router, useSegments } from "expo-router";
import {
	User,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import React from "react";
import { auth } from "../backend/firebase";


interface AuthContextProps {
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	user: User | null;
  }

  

const AuthContext = React.createContext<AuthContextProps>(  
{	signIn: () => Promise.resolve(),
	signOut: () => Promise.resolve(),
	user: null,
}
);

export function validateRoutePerms (user: any, globalParams: any) {
	if (user == undefined || user != globalParams.id) {
		console.log("hi")
		return <Redirect href = "/login" />
	}
}

export function useAuth() {
	return React.useContext(AuthContext);
}

export function useProtectedRoute(user: any) {
	const segments = useSegments(); // useSegments returns the current in-file 'url'

	React.useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)"; // checks if current url is in (auth)

		// if user not signed in AND not looking at a login page,
		if (!user && !inAuthGroup) {
			// redirect them to the login page
			router.replace("/(auth)/login");
		} else if (user && inAuthGroup) {
			router.replace("/"); // stay on apge
		}
	}, [user, segments]); // run function whenever user or segments change
}

// function to
export function AuthProvider(props: any) {
	const [user, setAuth] = React.useState<User | null>(null);

	/* login/logout/signup functions */

	const login = async (email: string, password: string) => {
		// firebase sign in function
		console.log("attempting to sign in...");
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				if (user) {
					console.log("Signed in with:", user.email);
				}
				setAuth(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	const logout = async () => {
		signOut(auth)
			.then(() => {
				// sign out of firebase
				console.log("user signed out");
				// remove user from the app's local context
				setAuth(null);
			})
			.catch((error) => {
				console.log("error signing out: ", error);
			});
	};
	// function that tracks whether a user is already signed in or not
	// and signs in automatically if true.
	React.useEffect(() => {
		onAuthStateChanged(auth, (authUser) => {
			if (authUser) console.log("Logged in with: ", authUser.email);
			setAuth(authUser);
		});
	}, []);

	useProtectedRoute(user);

	return (
		<AuthContext.Provider
			value={{
				signIn: login,
				signOut: logout,
				user,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
