import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a new context for projects data
const ProjectsDataContext = createContext();

// Custom hook to consume the projects data context
export const useProjectsData = () => useContext(ProjectsDataContext);

// Provider component to manage the fetching and state of projects data
export const ProjectsDataProvider = ({ children }) => {
  // State to store projects data and loading state
  const [projectsData, setProjectsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch projects data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/projects/get"
        );
        setProjectsData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };

    fetchData();
  }, []);

  // Return the provider with the projects data and loading state
  return (
    <ProjectsDataContext.Provider value={{ projectsData, isLoading }}>
      {children}
    </ProjectsDataContext.Provider>
  );
};
