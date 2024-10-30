import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
import { useAuthContext } from "./useAuthContext";

// hook to sign in with google
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  //sign in with google
  const googleProvider = new GoogleAuthProvider();

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      //google sign in
      const result = await signInWithPopup(auth, googleProvider);

      // if user data could be fetched
      if (result && result.user) {
        const token = result.user.accessToken;
        const owner = result.user;

        // Store token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem(
          "owner",
          JSON.stringify({
            displayName: owner.displayName,
            email: owner.email,
            uid: owner.uid,
          })
        );

        // Dispatch user data and token to context
        dispatch({
          type: "LOGIN",
          payload: { token, owner },
        });

        //navigate to dashboard
        navigate(`/dashboard?id=${owner.uid}`);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
