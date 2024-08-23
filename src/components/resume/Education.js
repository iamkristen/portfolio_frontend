import React from "react";
import ResumeTitle from "./ResumeTitle";
import { MdWork } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import ResumeCard from "./ResumeCard";
import { useEducationData } from "./../../context/education";
import { useExperienceData } from "./../../context/experience";
import Loader from "../loader/loader"; // Import Loader component

const Education = () => {
  const { educationData, isLoading: isEducationLoading } = useEducationData();
  const { experienceData, isLoading: isExperienceLoading } =
    useExperienceData();

  // Show loader if any data is still loading
  if (isEducationLoading || isExperienceLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full grid grid-cols-9 px-6 gap-8">
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Experience" icon={<MdWork />} />
        {experienceData.map((experience) => (
          <ResumeCard
            key={experience._id}
            badge={experience.timePeriod}
            title={experience.title}
            subTitle={experience.company}
            des={experience.description} // `des` might be undefined initially
          />
        ))}
      </div>
      <div className="hidden lgl:flex justify-center items-center">
        <span className="w-[1px] h-full bg-zinc-800"></span>
      </div>
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Education" icon={<GiGraduateCap />} />
        {educationData.map((education) => (
          <ResumeCard
            key={education._id}
            badge={education.timePeriod}
            title={education.title}
            subTitle={education.location}
            des={education.description} // Handle undefined description
          />
        ))}
      </div>
    </div>
  );
};

export default Education;
