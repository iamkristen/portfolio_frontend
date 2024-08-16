import React from "react";
import { Link } from "react-router-dom";

const ProjectsCard = ({ title, category, image, projectId }) => {
  return (
    <Link to={`/projects/${projectId}`} className="block group">
      <div className="py-6 flex flex-col gap-2 items-center justify-center border-b-[1px] border-b-zinc-800 group">
        <div className="w-full h-full mb-2 overflow-hidden relative cursor-pointer">
          <img
            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
            src={image}
            alt={`Thumbnail for ${title}`}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-designColor border-[1px] border-designColor px-2">
            {category}
          </span>
          <h2 className="text-base text-center font-semibold text-[#ccc] group-hover:text-designColor transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProjectsCard;
