import React from "react";
import { useProjectsData } from "../../context/project";
import Title from "../home/Title";
import ProjectsCard from "./ProjectsCard";
import Loader from "../loader/loader"; // Import Loader component

const Projects = () => {
  const { projectsData, isLoading } = useProjectsData();

  if (isLoading) {
    return <Loader />;
  }

  if (!projectsData || projectsData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No projects available at the moment.
      </div>
    );
  }

  return (
    <div>
      <Title title="Recent" subTitle="Projects" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lgl:gap-10">
        {projectsData.map((project) => (
          <div className="px-6" key={project._id}>
            <ProjectsCard
              title={project.title}
              category={project.projectType}
              image={project.banner}
              projectId={project._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
