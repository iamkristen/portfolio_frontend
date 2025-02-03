import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const BlogsDataContext = createContext();

export const useBlogsData = () => useContext(BlogsDataContext);

export const BlogsDataProvider = ({ children }) => {
  const [blogsData, setBlogsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (blogsData || isLoading) return;

    setIsLoading(true);
    try {
      console.log("Fetching blog data...");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/blogs/get`
      );
      setBlogsData(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [blogsData, isLoading]);

  return (
    <BlogsDataContext.Provider
      value={{ blogsData, fetchData, isLoading, error }}
    >
      {children}
    </BlogsDataContext.Provider>
  );
};
