import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a new context for experience data
const ExperienceDataContext = createContext();

// Custom hook to consume the experience data context
export const useExperienceData = () => useContext(ExperienceDataContext);

// Provider component to manage the fetching and state of experience data
export const ExperienceDataProvider = ({ children }) => {
  // State to store experience data and loading state
  const [experienceData, setExperienceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch experience data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/experience/get"
        );
        setExperienceData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching experience data:", error);
      }
    };

    fetchData();
  }, []);

  // Return the provider with the experience data and loading state
  return (
    <ExperienceDataContext.Provider value={{ experienceData, isLoading }}>
      {children}
    </ExperienceDataContext.Provider>
  );
};
