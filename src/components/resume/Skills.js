import React from "react";
import ResumeTitle from "./ResumeTitle";
import { SiArtstation } from "react-icons/si";
import { FaFlag } from "react-icons/fa";
import { BiCodeAlt } from "react-icons/bi";
import { IoIosPaper } from "react-icons/io";
import { useSkillsData } from "./../../context/skill"; // Import the skills context

const Skills = () => {
  // Use the useSkillsData hook to access skills data from the context
  const { skillsData, isLoading } = useSkillsData();

  // If data is still loading, you can render a loading indicator or handle it accordingly
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Group skills by type
  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill);
    return acc;
  }, {});

  // Define icons for each skill type
  const typeIcons = {
    Framework: <SiArtstation />,
    Languages: <FaFlag />,
    Coding: <BiCodeAlt />,
    Knowledge: <IoIosPaper />,
  };

  // Helper function to render skills for a given type
  const renderSkills = (type, skills) => (
    <div key={type} className="mb-8">
      <ResumeTitle title={type} icon={typeIcons[type]} />
      <div className="py-4">
        {skills.map((skill, index) => (
          <div
            key={skill._id}
            className={`py-3 border-b-[1px] border-zinc-800 ${
              index !== 0 ? "mt-4" : ""
            }`}
          >
            <p className="text-base text-textColor -mb-1.5">{skill.title}</p>
            <span className="w-full bg-zinc-600 h-1 inline-flex relative">
              <span
                style={{
                  width: `${
                    skill.level === "Beginner"
                      ? "50%"
                      : skill.level === "Intermediate"
                      ? "70%"
                      : skill.level === "Advanced"
                      ? "85%"
                      : "100%"
                  }`,
                }}
                className="h-full absolute top-0 left-0 bg-designColor"
              ></span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full grid grid-cols-9 gap-10 lgl:gap-0 px-6">
      {/* First column: Framework and Knowledge */}
      <div className="col-span-9 md:col-span-4 pr-8">
        {/* Added padding-right */}
        {groupedSkills.Framework &&
          renderSkills("Framework", groupedSkills.Framework)}
        <div className="my-4 w-full border-t-2 border-zinc-700"></div>
        {/* Horizontal separation line */}
        {groupedSkills.Knowledge &&
          renderSkills("Knowledge", groupedSkills.Knowledge)}
      </div>

      {/* Separation line */}
      <div className="hidden md:block col-span-1">
        <div className="w-full h-full border-l-2 border-zinc-800"></div>
      </div>

      {/* Second column: Languages and Coding */}
      <div className="col-span-9 md:col-span-4 pl-0">
        {/* Added padding-left */}
        {groupedSkills.Languages &&
          renderSkills("Languages", groupedSkills.Languages)}
        <div className="my-4 w-full border-t-2 border-zinc-700"></div>
        {/* Horizontal separation line */}
        {groupedSkills.Coding && renderSkills("Coding", groupedSkills.Coding)}
      </div>
    </div>
  );
};

export default Skills;
