import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create a new context
const ContactContext = createContext();

// Custom hook to use the contact data
export const useContactData = () => useContext(ContactContext);

// Context Provider component
export const ContactProvider = ({ children }) => {
  const [contactData, setContactData] = useState({
    address: "",
    email: "",
    phone: "",
    freelance: "",
    openTo: "",
  });

  // Fetch contact data from the API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "api/contact-me/get"
        );
        if (response.data.success) {
          setContactData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <ContactContext.Provider value={contactData}>
      {children}
    </ContactContext.Provider>
  );
};
