import React, { useState } from "react";

const ResumeCard = ({ badge, title, subTitle, des }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = des || ""; // Use an empty string if description is undefined

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription =
    description.length > 0 ? description.slice(0, 100) + "..." : description;

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <span className="text-gray-500">{badge}</span>
      </div>
      <div className="text-l font-semibold">{title}</div>
      <div className="text-md font-semibold text-gray-500">{subTitle}</div>
      <p className="text-gray-400 mt-2">
        {isExpanded ? description : truncatedDescription}
        {description.length > 0 && (
          <span onClick={toggleExpansion} className="text-white cursor-pointer">
            {isExpanded ? (
              <>
                <br />
                --- Hide Description ---
              </>
            ) : (
              "Show Description"
            )}
          </span>
        )}
      </p>
      <div className="w-full border-t border-silver mt-4"></div>
    </div>
  );
};

export default ResumeCard;
