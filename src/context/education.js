import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EducationDataContext = createContext();

export const useEducationData = () => useContext(EducationDataContext);

export const EducationDataProvider = ({ children }) => {
  const [educationData, setEducationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/education/get`
        );
        setEducationData(response.data.data);
      } catch (error) {
        console.error("Error fetching education data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  return (
    <EducationDataContext.Provider value={{ educationData, isLoading }}>
      {children}
    </EducationDataContext.Provider>
  );
};
