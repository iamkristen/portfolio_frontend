import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const ExperienceDataContext = createContext();

export const useExperienceData = () => useContext(ExperienceDataContext);

export const ExperienceDataProvider = ({ children }) => {
  const [experienceData, setExperienceData] = useState([]); // Default to an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (experienceData.length > 0 || isLoading) return; // Prevent re-fetching if data is already loaded or is being loaded

    setIsLoading(true);
    try {
      console.log("Fetching experience data...");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/experience/get`
      );
      setExperienceData(response.data.data || []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching experience data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [experienceData, isLoading]);

  return (
    <ExperienceDataContext.Provider
      value={{ experienceData, fetchData, isLoading, error }}
    >
      {children}
    </ExperienceDataContext.Provider>
  );
};
