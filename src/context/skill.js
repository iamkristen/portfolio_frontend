import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a new context for skills data
const SkillsDataContext = createContext();

// Custom hook to consume the skills data context
export const useSkillsData = () => useContext(SkillsDataContext);

// Provider component to manage the fetching and state of skills data
export const SkillsDataProvider = ({ children }) => {
  // State to store skills data and loading state
  const [skillsData, setSkillsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch skills data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "api/skills/get"
        );
        setSkillsData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };

    fetchData();
  }, []);

  // Return the provider with the skills data and loading state
  return (
    <SkillsDataContext.Provider value={{ skillsData, isLoading }}>
      {children}
    </SkillsDataContext.Provider>
  );
};
