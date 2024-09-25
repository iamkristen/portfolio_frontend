import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const SkillsDataContext = createContext();

export const useSkillsData = () => useContext(SkillsDataContext);

export const SkillsDataProvider = ({ children }) => {
  const [skillsData, setSkillsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (skillsData.length > 0 || isLoading) return;

    setIsLoading(true);
    try {
      console.log("Fetching skills data...");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/skills/get`
      );
      setSkillsData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching skills data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [skillsData, isLoading]);

  return (
    <SkillsDataContext.Provider
      value={{ skillsData, fetchData, isLoading, error }}
    >
      {children}
    </SkillsDataContext.Provider>
  );
};
