import React from "react";

const ResumeCard = ({ badge, title, subTitle, des }) => {
  const defaultBadge = "2013-Present";

  return (
    <div className="w-full py-6 flex flex-col gap-2.5 border-b-[1px] border-b-zinc-800">
      <h6
        className={`w-24 text-center text-sm py-[1px] border-[1px] rounded-sm ${
          badge
            ? "text-[#999] border-zinc-600"
            : "text-designColor border-designColor"
        }`}
      >
        {badge || defaultBadge}
      </h6>
      <h2 className="text-lg font-titleFont text-gray-200 font-medium">
        {title}
      </h2>
      <p className="text-sm text-[#999] -mt-2">{subTitle}</p>
      <p className="text-base text-[#999] font-medium pr-10">{des}</p>
    </div>
  );
};

export default ResumeCard;
