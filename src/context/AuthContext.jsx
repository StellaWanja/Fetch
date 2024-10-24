import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });
  // Loading state to prevent routing before auth status is confirmed
  const [loading, setLoading] = useState(true);

  // set user to stay on dashboard if local storage still has user even after refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: { token, user: JSON.parse(storedUser) },
      });
    }

    setLoading(false);
  }, []);

  console.log("my state is", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
