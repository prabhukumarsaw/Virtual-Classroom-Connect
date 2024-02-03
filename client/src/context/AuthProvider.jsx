import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config'
import axios from "axios";


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    //create an account
  const createUser = (email, password)  => {
    return createUserWithEmailAndPassword(auth, email, password)

  }

    //sign with gmail

     //sign with google account
  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider)
  }


  //update Profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name, 
      photoURL: photoURL
    })
  }

  
//check signed-in user

useEffect( () =>{
  const unsubscribe = onAuthStateChanged(auth, currentUser =>{
      // console.log(currentUser);
      setUser(currentUser);
      if(currentUser){
          const userInfo ={email: currentUser.email}
          axios.post('http://localhost:5555/jwt', userInfo)
            .then( (response) => {
              // console.log(response.data.token);
              if(response.data.token){
                  localStorage.setItem("access-token", response.data.token)
              }
            })
      } else{
         localStorage.removeItem("access-token")
      }
     
      setLoading(false);
  });

  return () =>{
      return unsubscribe();
  }
}, [])

   //logout login
     
   const logOut = () => {
    signOut(auth)
}


    const authInfo = {
        user,
        createUser,
        signUpWithGmail,
        updateUserProfile,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider