import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const AboutDataContext = createContext();

export const useAboutData = () => useContext(AboutDataContext);

export const AboutDataProvider = ({ children }) => {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (aboutData || isLoading) return; 

    setIsLoading(true);
    try {
      console.log(`${process.env.REACT_APP_API_URL}api/about-me/get`);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/about-me/get`
      );
      setAboutData(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [aboutData, isLoading]);

  return (
    <AboutDataContext.Provider
      value={{ aboutData, fetchData, isLoading, error }}
    >
      {children}
    </AboutDataContext.Provider>
  );
};
