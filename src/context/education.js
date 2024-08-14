import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a new context for education data
const EducationDataContext = createContext();

// Custom hook to consume the education data context
export const useEducationData = () => useContext(EducationDataContext);

// Provider component to manage the fetching and state of education data
export const EducationDataProvider = ({ children }) => {
  // State to store education data and loading state
  const [educationData, setEducationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch education data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "api/education/get"
        );
        setEducationData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchData();
  }, []);

  // Return the provider with the education data and loading state
  return (
    <EducationDataContext.Provider value={{ educationData, isLoading }}>
      {children}
    </EducationDataContext.Provider>
  );
};
