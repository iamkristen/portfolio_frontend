import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ContactContext = createContext();

export const useContactData = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contactData, setContactData] = useState({
    address: "",
    email: "",
    phone: "",
    freelance: "",
    openTo: "",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/contact-me/get`
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
