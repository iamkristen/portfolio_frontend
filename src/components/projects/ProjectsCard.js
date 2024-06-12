// ProjectsCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProjectsCard = ({ title, category, image, projectId }) => {
  return (
    console.log(projectId),
    (
      <Link to={`/projects/${projectId}`} className="project-card-link">
        <div className="project-card">
          <h3>{title}</h3>
          <p>{category}</p>
          <img src={image} alt={title} />
        </div>
      </Link>
    )
  );
};

export default ProjectsCard;
