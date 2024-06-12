import React from "react";
import ResumeTitle from "./ResumeTitle";
import { MdWork } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import ResumeCard from "./ResumeCard";
import { useEducationData } from "./../../context/education";
import { useExperienceData } from "./../../context/experience";

const Education = () => {
  // Use the useEducationData and useExperienceData hooks to access education and experience data from the contexts
  const { educationData, isLoading: isEducationLoading } = useEducationData();
  const { experienceData, isLoading: isExperienceLoading } =
    useExperienceData();

  // If data is still loading, you can render a loading indicator or handle it accordingly
  if (isEducationLoading || isExperienceLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full grid grid-cols-9 px-6">
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Experience" icon={<MdWork />} />
        {/* Map over the experience data and render each item */}
        {experienceData.map((experience) => (
          <ResumeCard
            key={experience._id} // Ensure each item has a unique key
            badge={experience.timePeriod}
            title={experience.title}
            subTitle={experience.company}
            des={experience.description}
          />
        ))}
      </div>
      <div className="w-full h-full hidden lgl:flex justify-center items-center">
        <span className="w-[1px] h-full bg-zinc-800 inline-flex"></span>
      </div>
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Education" icon={<GiGraduateCap />} />
        {/* Map over the education data and render each item */}
        {educationData.map((education) => (
          <ResumeCard
            key={education._id} // Ensure each item has a unique key
            badge={education.timePeriod}
            title={education.title}
            subTitle={education.location}
            des={education.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Education;
