import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AboutDataContext = createContext();

export const useAboutData = () => useContext(AboutDataContext);

export const AboutDataProvider = ({ children }) => {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/about-me/get"
        );
        setAboutData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AboutDataContext.Provider value={{ aboutData, isLoading }}>
      {children}
    </AboutDataContext.Provider>
  );
};
