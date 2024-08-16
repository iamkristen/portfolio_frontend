import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AboutDataContext = createContext();

export const useAboutData = () => useContext(AboutDataContext);

export const AboutDataProvider = ({ children }) => {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/about-me/get`
      );
      setAboutData(response.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err); // Set error state if the request fails
    } finally {
      setIsLoading(false); // Ensure loading state is updated in both success and failure cases
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AboutDataContext.Provider value={{ aboutData, isLoading, error }}>
      {children}
    </AboutDataContext.Provider>
  );
};
