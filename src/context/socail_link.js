import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SocialLinksContext = createContext();

export const useSocialLinks = () => {
  return useContext(SocialLinksContext);
};

export const SocialLinksProvider = ({ children }) => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [isSocialLoading, setIsSocialLoading] = useState(true); // Renamed for consistency

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "api/social/get"
        );
        setSocialLinks(response.data.data);
      } catch (error) {
        console.error("Error fetching social links:", error);
      } finally {
        setIsSocialLoading(false); // Ensure loading state is set to false in both success and error cases
      }
    };

    fetchSocialLinks();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <SocialLinksContext.Provider value={{ socialLinks, isSocialLoading }}>
      {children}
    </SocialLinksContext.Provider>
  );
};
