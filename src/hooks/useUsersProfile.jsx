import { useState } from "react";
import { useProfileContext } from "./useProfileContext";

export const useUsersProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useProfileContext();

  // fetch users
  const getUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      // if response was not 200
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      dispatch({ type: "SET_USERS", payload: data });
    } catch (error) {
      console.error(error);
      setError("Something went wrong during data fetching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { getUsers, loading, error };
};
