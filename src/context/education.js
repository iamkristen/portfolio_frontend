import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const EducationDataContext = createContext();

export const useEducationData = () => useContext(EducationDataContext);

export const EducationDataProvider = ({ children }) => {
  const [educationData, setEducationData] = useState([]); // Default to an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (educationData.length > 0 || isLoading) return; // Prevent re-fetching if data is already loaded or is being loaded

    setIsLoading(true);
    try {
      console.log("Fetching education data...");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/education/get`
      );
      setEducationData(response.data.data || []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching education data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [educationData, isLoading]);

  return (
    <EducationDataContext.Provider
      value={{ educationData, fetchData, isLoading, error }}
    >
      {children}
    </EducationDataContext.Provider>
  );
};
