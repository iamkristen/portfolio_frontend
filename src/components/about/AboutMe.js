import React from "react";
import { useAboutData } from "../../context/about_data";
import Loader from "../loader/loader";

const AboutMe = () => {
  const { aboutData, isLoading } = useAboutData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row pb-6">
      <div className="w-full md:w-1/2 text-zinc-400 px-6 border-r-[1px] border-r-zinc-800 flex items-center">
        <div className="py-6">
          <h2 className="font-semibold mb-1">Hello! I'm {aboutData.name}</h2>
          <p className="text-base leading-6 ">{aboutData.description}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6">
        <ul className="flex flex-col gap-1">
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Age</span>
            {aboutData.age}
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Residence</span>
            {aboutData.residence}
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Freelance</span>
            {aboutData.freelance}
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Address</span>
            {aboutData.address}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
