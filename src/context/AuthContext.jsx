import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        owner: action.payload.owner,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { ...state, owner: null, token: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    owner: null,
    token: null,
  });
  // Loading state to prevent routing before auth status is confirmed
  const [loading, setLoading] = useState(true);

  // set owner to stay on dashboard if local storage still has owner even after refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedOwner = localStorage.getItem("owner");

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: { token, owner: JSON.parse(storedOwner) },
      });
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
