import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ExperienceDataContext = createContext();

export const useExperienceData = () => useContext(ExperienceDataContext);

export const ExperienceDataProvider = ({ children }) => {
  const [experienceData, setExperienceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/experience/get`
        );
        setExperienceData(response.data.data);
      } catch (error) {
        console.error("Error fetching experience data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperienceData();
  }, []);

  return (
    <ExperienceDataContext.Provider value={{ experienceData, isLoading }}>
      {children}
    </ExperienceDataContext.Provider>
  );
};
