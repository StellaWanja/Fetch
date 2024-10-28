import { useState } from "react";
import { useProfileContext } from "./useProfileContext";

export const usePhotos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useProfileContext();

  // fetch photos
  const getPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      // if response was not 200
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      const data = await response.json();

      dispatch({ type: "SET_PHOTOS", payload: data });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Something went wrong during data fetching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  return { getPhotos, loading, error };
};
