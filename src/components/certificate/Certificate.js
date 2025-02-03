import React, { useEffect, useState } from "react";
import { useCertificatesData } from "../../context/certificate";
import Title from "../home/Title";
import CertificateCard from "./CertificateCard";
import Loader from "../loader/loader";

const Certificates = () => {
  const { certificatesData, fetchData, isLoading } = useCertificatesData();
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCertificates, setVisibleCertificates] = useState(3);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <Loader />;
  }

  if (!certificatesData || certificatesData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No certificates available at the moment.
      </div>
    );
  }

  return (
    <div>
      <Title title="My" subTitle="Certificates" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lgl:gap-10">
        {certificatesData
          .slice(0, isMobile ? visibleCertificates : certificatesData.length)
          .map((certificate) => (
            <div className="px-6" key={certificate._id}>
              <CertificateCard
                title={certificate.name}
                issuer={certificate.issuer}
                image={certificate.image}
                credential={certificate.credential}
              />
            </div>
          ))}
      </div>
      {isMobile && visibleCertificates < certificatesData.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCertificates((prev) => prev + 3)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificates;
