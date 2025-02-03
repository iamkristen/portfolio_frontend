import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const CertificateContext = createContext();

export const useCertificatesData = () => useContext(CertificateContext);

export const CertificatesDataProvider = ({ children }) => {
  const [certificatesData, setCertificatesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 
    const fetchData = useCallback(async () => {
        if (certificatesData || isLoading) return;
    setIsLoading(true);
      try {
        console.log("Fetching certificate data...");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/certificate/get`);
      setCertificatesData(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [certificatesData, isLoading]);

//   // Fetch a single certificate by ID
//   const fetchCertificateById = useCallback(async (id) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}api/certificate/get/${id}`);
//       return response.data.data;
//     } catch (err) {
//       setError(err);
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

  return (
    <CertificateContext.Provider
      value={{ certificatesData, fetchData, isLoading, error }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
