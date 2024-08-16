import React, { useCallback } from "react";
import { AiTwotoneAppstore } from "react-icons/ai";
import { BiCodeAlt } from "react-icons/bi";
import ServicesCard from "./ServicesCard";

const MyServices = () => {
  const renderServiceCard = useCallback(
    (icons, title, subTitle) => (
      <ServicesCard icons={icons} title={title} subTitle={subTitle} />
    ),
    [] // Empty dependency array
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {renderServiceCard(
        <BiCodeAlt />,
        "Web Development",
        "Imagine your website is a pizza, and I'm the web developer chef adding all the best toppings to make it tasty and user-friendly."
      )}
      {renderServiceCard(
        <AiTwotoneAppstore />,
        "Mobile Application",
        "Ever wish your phone could do a happy dance? Well, that's what I'm here for! I'm like a wizard, but for making mobile apps that bring joy and convenience to your fingertips."
      )}
    </div>
  );
};

export default React.memo(MyServices);
