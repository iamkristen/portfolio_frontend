import React from "react";
// import { FaAppStoreIos } from "react-icons/fa";
import { AiTwotoneAppstore } from "react-icons/ai";
// import { SiAntdesign } from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";
import ServicesCard from "./ServicesCard";

const MyServices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <ServicesCard
        icons={<BiCodeAlt />}
        title="Web Development"
        subTitle="Imagine your website is a pizza, and I'm the web developer chef adding all the best toppings to make it tasty and user-friendly."
      />
      <ServicesCard
        icons={<AiTwotoneAppstore />}
        title="Mobile Application"
        subTitle="Ever wish your phone could do a happy dance? Well, that's what I'm here for! I'm like a wizard, 
        but for making mobile apps that bring joy and convenience to your fingertips."
      />
    </div>
  );
};

export default MyServices;
