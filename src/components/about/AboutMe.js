import React from "react";

const AboutMe = () => {
  return (
    <div className="flex flex-col md:flex-row pb-6">
      <div className="w-full md:w-1/2 text-zinc-400 px-6 border-r-[1px] border-r-zinc-800 flex items-center">
        <div className="py-6">
          <h2 className="font-semibold mb-1">Hello! I'm Ravi Kushwaha</h2>
          <p className="text-base leading-6 ">
          A self-proclaimed code wizard with a talent for transforming caffeine into code and 
          bugs into... well, more bugs. As a student in the epic adventure of computer science, 
          I'm on a quest for knowledge, fueled by the eternal hope that one day 
          I'll conquer the mythical land of bug-free code.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6">
        <ul className="flex flex-col gap-1">
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Age</span>
            24
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Residence</span>
            United Kingdom
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Freelance</span>
            Available
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Address</span>
            London, UK
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
