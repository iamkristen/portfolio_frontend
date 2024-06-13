import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a new context for blogs data
const BlogsDataContext = createContext();

// Custom hook to consume the blogs data context
export const useBlogsData = () => useContext(BlogsDataContext);

// Provider component to manage the fetching and state of blogs data
export const BlogsDataProvider = ({ children }) => {
  // State to store blogs data and loading state
  const [blogsData, setBlogsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch blogs data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs/get");
        setBlogsData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      }
    };

    fetchData();
  }, []);

  // Return the provider with the blogs data and loading state
  return (
    <BlogsDataContext.Provider value={{ blogsData, isLoading }}>
      {children}
    </BlogsDataContext.Provider>
  );
};
