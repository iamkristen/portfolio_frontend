import React from "react";
import { useParams } from "react-router-dom";
import { useProjectsData } from "../../context/project";
import Loader from "../loader/loader";
import Title from "../home/Title";
import "../../custom_CSS/rich-text-editor.css";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const { projectsData, isLoading } = useProjectsData();

  if (isLoading) {
    return <Loader />;
  }

  const selectedProject = projectsData.find(
    (project) => project._id === projectId
  );

  if (!selectedProject) {
    return <div className="text-center text-red-500">Project not found.</div>;
  }

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-bodyColor rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="p-2">
          <img
            src={selectedProject.banner}
            alt={`Banner for ${selectedProject.title}`}
            className="w-full h-64 object-cover object-center rounded-t-lg"
            style={{ aspectRatio: "3 / 2" }}
          />
        </div>
        <div className="p-6">
          <Title title={selectedProject.title} />
          <div
            className="rich-text-content"
            dangerouslySetInnerHTML={{ __html: selectedProject.description }}
          />
          {selectedProject.link && (
            <div className="mt-6">
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
              >
                View Project
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
