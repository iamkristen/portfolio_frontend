import React from "react";
import ResumeTitle from "./ResumeTitle";
import { SiArtstation } from "react-icons/si";
import { FaFlag } from "react-icons/fa";
import { BiCodeAlt } from "react-icons/bi";
import { IoIosPaper } from "react-icons/io";
import { useSkillsData } from "./../../context/skill";
import Loader from "../loader/loader";

const Skills = () => {
  const { skillsData, isLoading } = useSkillsData();

  if (isLoading) {
    return <Loader />;
  }

  const groupedSkills = skillsData.reduce((acc, skill) => {
    acc[skill.type] = acc[skill.type] || [];
    acc[skill.type].push(skill);
    return acc;
  }, {});

  const typeIcons = {
    Framework: <SiArtstation />,
    Languages: <FaFlag />,
    Coding: <BiCodeAlt />,
    Knowledge: <IoIosPaper />,
  };

  const renderSkills = (type, skills) => (
    <div key={type} className="mb-4">
      <ResumeTitle title={type} icon={typeIcons[type]} />
      <div className="py-2">
        {skills.map((skill, index) => (
          <div key={skill._id} className={`py-2 ${index !== 0 ? "mt-2" : ""}`}>
            <p className="text-base text-textColor mb-1">{skill.title}</p>
            <span className="w-full bg-gray-600 h-1 inline-flex relative">
              <span
                style={{
                  width:
                    {
                      Beginner: "50%",
                      Intermediate: "70%",
                      Advanced: "85%",
                      Expert: "100%",
                    }[skill.level] || "0%",
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
    <div className="w-full px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          {groupedSkills.Framework &&
            renderSkills("Framework", groupedSkills.Framework)}
          <div className="w-full border-t-2 border-gray-300 my-8"></div>
          {groupedSkills.Knowledge &&
            renderSkills("Knowledge", groupedSkills.Knowledge)}
        </div>
        {/* <div className="hidden md:block col-span-1">
          <div className="h-full border-l-2 border-gray-300"></div>
        </div> */}
        <div className="col-span-1">
          {groupedSkills.Coding && renderSkills("Coding", groupedSkills.Coding)}
          <div className="w-full border-t-2 border-gray-300 my-8"></div>
          {groupedSkills.Languages &&
            renderSkills("Languages", groupedSkills.Languages)}
        </div>
      </div>
    </div>
  );
};

export default Skills;
