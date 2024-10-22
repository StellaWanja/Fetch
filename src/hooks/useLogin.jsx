import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import { useAuthContext } from "./useAuthContext";

// hook to sign in with google
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  //sign in with google
  const googleProvider = new GoogleAuthProvider();

  const login = async () => {
    setLoading(true);
    setError(null);

    //google sign in
    const result = await signInWithPopup(auth, googleProvider);

    // if user result could not be fetched
    if (!result) {
      setLoading(false);
      setError("Something went wrong");
      return;
    }

    // else, store user in local storage and update context dispatch
    localStorage.setItem("user", JSON.stringify(result.user)); // store user in local storage (result.user);
    dispatch({ type: "LOGIN", payload: result.user });

    setLoading(false);
  };

  return { login, loading, error };
};
