import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProjectsDataContext = createContext();

export const useProjectsData = () => useContext(ProjectsDataContext);

export const ProjectsDataProvider = ({ children }) => {
  const [projectsData, setProjectsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/projects/get`
        );
        setProjectsData(response.data.data);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  return (
    <ProjectsDataContext.Provider value={{ projectsData, isLoading }}>
      {children}
    </ProjectsDataContext.Provider>
  );
};
