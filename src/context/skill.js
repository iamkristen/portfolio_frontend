import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SkillsDataContext = createContext();

export const useSkillsData = () => useContext(SkillsDataContext);

export const SkillsDataProvider = ({ children }) => {
  const [skillsData, setSkillsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/skills/get`
        );
        setSkillsData(response.data.data);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  return (
    <SkillsDataContext.Provider value={{ skillsData, isLoading }}>
      {children}
    </SkillsDataContext.Provider>
  );
};
