import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../page/Firebase';
export const AuthContext = createContext();
const auth = getAuth(app); 
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleAsyncOperation = async (operation) => {
    setLoading(true);
    try {
      const result = await operation();
      return result;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createUser = (email, password) => {
    return handleAsyncOperation(() => createUserWithEmailAndPassword(auth, email, password));
  };

  const logIn = (email, password) => {
    return handleAsyncOperation(() => signInWithEmailAndPassword(auth, email, password));
  };

  const loginWithGoogle = () => {
    return handleAsyncOperation(() => signInWithPopup(auth, googleProvider));
  };

  const logOut = () => {
    return handleAsyncOperation(() => signOut(auth));
  };

  const updateUser = (updatedData) => {
    return handleAsyncOperation(() => {
      if (auth.currentUser) {
        return updateProfile(auth.currentUser, updatedData);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
          if (currentUser) {
                const user = currentUser?.email;
                fetch('https://tour-backend-five.vercel.app/api/v1/jwt', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ user })
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('jwt-token', data?.token);
                        setLoading(false);
                    })
                    .catch(error => console.error(error))
            }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    logIn,
    loading,
    setLoading,
    updateUser,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;