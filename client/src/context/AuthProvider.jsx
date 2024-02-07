import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sign in with Google account
  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Update Profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Check signed-in user and fetch JWT token
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          const userInfo = { email: currentUser.email };
          const response = await axios.post(
            "http://localhost:5555/jwt",
            userInfo
          );

          if (response.data.token) {
            localStorage.setItem("access-token", response.data.token);

            // Fetch additional user data from the database
            const userDataResponse = await axios.get(
              `http://localhost:5555/api/auth/users/${currentUser.uid}`
            );

            // Update the user state with additional data
            setUser({
              ...currentUser,
              additionalData: userDataResponse.data,
            });
          }
        } catch (error) {
          console.error("Error fetching JWT token:", error.message);
          setError("Error fetching user data");
        }
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  // Logout
  const logOut = async () => {
    try {
      // Add this line to remove the token from local storage
      localStorage.removeItem("access-token");

      // Sign out the user
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const authInfo = {
    user,
    signUpWithGmail,
    updateUserProfile,
    logOut,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;