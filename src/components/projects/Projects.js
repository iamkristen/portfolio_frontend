import React, { useState, useEffect } from "react";
import { useProjectsData } from "../../context/project";
import Title from "../home/Title";
import ProjectsCard from "./ProjectsCard";
import Loader from "../loader/loader";

const Projects = () => {
  const { projectsData, isLoading } = useProjectsData();
  const [isMobile, setIsMobile] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(3); // Show 3 projects initially on mobile

  // Detect if the user is on a mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as per your design
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleShowMore = () => {
    setVisibleProjects((prevCount) => prevCount + 3); // Load 3 more projects on mobile
  };

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
        {projectsData
          .slice(0, isMobile ? visibleProjects : projectsData.length)
          .map((project) => (
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
      {isMobile && visibleProjects < projectsData.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
