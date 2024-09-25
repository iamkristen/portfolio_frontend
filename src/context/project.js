import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const ProjectsDataContext = createContext();

export const useProjectsData = () => useContext(ProjectsDataContext);

export const ProjectsDataProvider = ({ children }) => {
  const [projectsData, setProjectsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (projectsData || isLoading) return; // Prevent re-fetching if data is already loaded or loading is in progress

    setIsLoading(true);
    try {
      console.log("Fetching projects data...");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/projects/get`
      );
      setProjectsData(response.data.data);
    } catch (error) {
      console.error("Error fetching projects data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [projectsData, isLoading]);

  return (
    <ProjectsDataContext.Provider
      value={{ projectsData, fetchData, isLoading, error }}
    >
      {children}
    </ProjectsDataContext.Provider>
  );
};
