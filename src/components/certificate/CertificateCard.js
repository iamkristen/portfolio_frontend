import React from "react";

const CertificateCard = ({ title, issuer, image, credential }) => {
  return (
    <a
      href={credential}
      target="_blank"
      rel="noopener noreferrer"
      className="block group relative"
    >
      <div className="py-6 flex flex-col gap-2 items-center justify-center border-b-[1px] border-b-zinc-800 group">
        <div className="w-full h-full mb-2 overflow-hidden relative cursor-pointer">
          <img
            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
            src={image}
            alt={`Certificate for ${title}`}
          />
          {/* Transparent Overlay with Text */}
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">View Credential</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-designColor border-[1px] border-designColor px-2">
            {issuer}
          </span>
          <h2 className="text-base text-center font-semibold text-[#ccc] group-hover:text-designColor transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </a>
  );
};

export default CertificateCard;
