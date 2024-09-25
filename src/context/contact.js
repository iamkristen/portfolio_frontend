import React, { createContext, useContext, useState, useCallback } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (
      isLoading ||
      (contactData.address && contactData.email && contactData.phone)
    ) {
      return; // Avoid fetching if data is already loaded or loading is in progress
    }

    setIsLoading(true);
    try {
      console.log("Fetching contact data...");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/contact-me/get`
      );
      if (response.data.success) {
        setContactData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [contactData, isLoading]);

  return (
    <ContactContext.Provider
      value={{ contactData, fetchData, isLoading, error }}
    >
      {children}
    </ContactContext.Provider>
  );
};
