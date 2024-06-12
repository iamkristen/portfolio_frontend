import React from "react";
import { Link } from "react-router-dom";

const ProjectsCard = ({ title, category, image, projectId }) => {
  return (
    <Link to={`/projects/${projectId}`} className="project-card-link">
      <div className="py-6 flex flex-col gap-2 items-center justify-center border-b-[1px] border-b-zinc-800 group">
        <div className="w-full h-full mb-2 overflow-hidden relative cursor-pointer">
          <img
            className="w-full h-full object-cover scale-100 group-hover:scale-110 duration-300 cursor-pointer"
            src={image}
            alt={title}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-designColor border-[1px] border-designColor px-2">
            {category}
          </span>
          <h2 className="text-base text-center font-semibold font-titleFont text-[#ccc] group-hover:text-designColor duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProjectsCard;
