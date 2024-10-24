import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    // remove user from local storage

    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // navigate to login page
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return { logout };
};
