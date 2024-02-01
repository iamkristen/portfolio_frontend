import React from "react";
import ResumeTitle from "./ResumeTitle";
import { MdWork } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import ResumeCard from "./ResumeCard";

const Education = () => {
  return (
    <div className="w-full grid grid-cols-9 px-6">
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Experience" icon={<MdWork />} />
        <ResumeCard
          badge="2023-Present"
          title="Volunteer Instructor"
          subTitle="redbridge Central Library • Vision Redbridge Culture and Leisure"
          des="I volunteer as an instructor, teaching the Python programming language alongside Raspberry Pi electronics. It's an exciting opportunity to introduce learners to both coding concepts and practical applications with these innovative tools. "
        />
        <ResumeCard
          badge="2022-2023"
          title="Freelance App Developer"
          subTitle="UNIVERSITATEA PETROL - GAZE DIN PLOIEŞTI"
          des="I served as a dedicated app developer for a prominent Romanian university, 
          specializing in iOS and Android platforms. During my tenure, 
          I focused on creating and maintaining mobile applications that catered to the university's diverse needs and audience."
        />
        <ResumeCard
          badge="2020-2022"
          title="Mobile App Developer"
          subTitle="HostBala Technologies Pvt. Ltd."
          des="As a Junior Flutter Developer, my primary role involved crafting the front-end of applications.
           I specialized in modifying existing apps, ensuring they met client requirements by 
           implementing necessary feature changes. This included enhancing published apps or customizing 
           features based on client needs, contributing to delivering tailored and user-centric applications."
        />
        
        <ResumeCard
          badge="2017 - 2018"
          title="Computer Operator"
          subTitle="Shree Surya Prabhat Saving and Credit Co-operative Ltd."
          des="As a Computer Operator, I oversee and maintain the functionality of computer systems. My role involves monitoring hardware performance, conducting regular system checks, managing backups, and configuring systems when required. Troubleshooting technical issues and ensuring optimal system performance are key aspects of my responsibilities, crucial for meeting the organization's operational requirements.  "
        />
      </div>
      <div className="w-full h-full hidden lgl:flex justify-center items-center">
        <span className="w-[1px] h-full bg-zinc-800 inline-flex"></span>
      </div>
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Education" icon={<GiGraduateCap />} />
        <ResumeCard
          badge="2007-2017"
          title="Shree Aadhunik rastriya higher secondory school"
          subTitle="Hetauda - Nepal"
          des="My academic journey began at Shree Aadhunik Rastriya Higher Secondary School, 
          where I completed my primary and secondary education from classes 1 to 10.
           This formative period laid the foundation for my academic pursuits and instilled in me a strong sense of curiosity and dedication."
        />
        <ResumeCard
          badge="2018 - 2021"
          title="Diploma in computer engineering"
          subTitle="Biratnagar - Nepal"
          des="The curriculum encompasses a wide array of subjects covering programming languages, 
          digital systems, computer architecture, and software development methodologies. Students delve 
          into hardware components, networking principles, 
          and embedded systems, gaining a holistic understanding of computer engineering principles.  "
        />
        <ResumeCard
          badge="2022 - Present"
          title="BSc (Hons.) Computer Science"
          subTitle="London - UK"
          des="The curriculum encompasses a wide spectrum of subjects, including programming languages,
           data structures, algorithms, software engineering, and computer architecture. 
           I explore the intricacies of databases, artificial intelligence, 
          machine learning, and cybersecurity, gaining expertise in emerging technologies."
        />
      </div>
    </div>
  );
};

export default Education;
