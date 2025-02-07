import { useEffect, useState } from "react";

// Use environment variable with fallback
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:1234";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BACKEND_URL}/api/menu/${resId}`);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.details || "Failed to fetch menu data");
      }

      setResInfo(responseData.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resId]);

  return { resInfo, error, loading };
};

export default useRestaurantMenu;
