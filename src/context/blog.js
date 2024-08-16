import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BlogsDataContext = createContext();

export const useBlogsData = () => useContext(BlogsDataContext);

export const BlogsDataProvider = ({ children }) => {
  const [blogsData, setBlogsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/blogs/get`
        );
        setBlogsData(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogsData();
  }, []);

  return (
    <BlogsDataContext.Provider value={{ blogsData, isLoading }}>
      {children}
    </BlogsDataContext.Provider>
  );
};
