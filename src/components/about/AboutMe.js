import React from "react";
import { useAboutData } from "../../context/about_data";
import Loader from "../loader/loader";

const AboutMe = () => {
  const { aboutData, isLoading } = useAboutData();

  if (isLoading) {
    return <Loader />;
  }

  if (!aboutData) {
    return <div className="text-center text-red-500">No data available.</div>;
  }

  const { name, description, age, residence, freelance, address } = aboutData;

  return (
    <div className="flex flex-col md:flex-row pb-6">
      <div className="w-full md:w-1/2 text-zinc-400 px-6 border-r-[1px] border-r-zinc-800 flex items-center">
        <div className="py-6">
          <h2 className="font-semibold mb-1">Hello! I'm {name}</h2>
          <p className="text-base leading-6">{description}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6">
        <ul className="flex flex-col gap-1">
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Age</span>
            {age}
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Residence</span>
            {residence}
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Freelance</span>
            {freelance}
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Address</span>
            {address}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(AboutMe);
