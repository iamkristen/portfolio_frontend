import React, { memo } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { BsCloudLightningFill } from "react-icons/bs";
import CV from "../../assets/Kristen-cv.pdf";
import { useAboutData } from "../../context/about_data";
import { useSocialLinks } from "../../context/socail_link";
import * as ReactIcons from "react-icons/fa"; // Import all icons from Font Awesome
import Loader from "../loader/loader";

const Left = () => {
  const { aboutData, isLoading } = useAboutData();
  const { socialLinks, isSocialLoading } = useSocialLinks();

  const [text] = useTypewriter({
    words: aboutData?.profession || [
      "Web Developer",
      "App Developer",
      "Freelancer",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  if (isLoading || isSocialLoading || !aboutData || !socialLinks) {
    return <Loader />;
  }

  return (
    <div className="w-full lgl:w-5/12 h-full bg-bodyColor rounded-2xl shadow-testShwdow z-10">
      <div className="w-full h-3/5">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={aboutData.avatar}
          loading="priority"
          alt="bannerImage"
        />
      </div>
      <div className="w-full h-2/5 flex flex-col justify-between border-t-0 rounded-bl-xl rounded-br-xl">
        <div className="flex flex-col items-center gap-2 py-10">
          <h1 className="text-textColor text-4xl font-semibold">
            {aboutData.name}
          </h1>
          <p className="text-base text-designColor tracking-wide">
            {text}
            <Cursor cursorBlinking={false} cursorStyle="|" />
          </p>
          <div className="flex justify-center gap-2 mt-2">
            {socialLinks.map((link) => {
              if (link.name.toLowerCase() === "mail") {
                return (
                  <span
                    key={link._id}
                    className="hover:text-designColor duration-300 cursor-pointer text-xl"
                  >
                    <a href={link.link}>
                      <ReactIcons.FaEnvelope />
                    </a>
                  </span>
                );
              } else {
                const IconComponent =
                  ReactIcons[link.icon.replace(/[<>/]/g, "")]; // Remove "<", ">", and "/" from the icon name
                return (
                  <span
                    key={link._id}
                    className="hover:text-designColor duration-300 cursor-pointer text-xl"
                  >
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent />
                    </a>
                  </span>
                );
              }
            })}
          </div>
        </div>
        <div className="flex h-14">
          <a
            href={CV}
            target="_blank"
            className="w-1/2 border-t-[1px] borderRight border-t-zinc-800 text-sm tracking-wide uppercase gap-2 hover:text-designColor duration-300"
            rel="noreferrer"
          >
            <button className="w-full h-full flex justify-center items-center gap-2">
              Download CV <BsCloudLightningFill />
            </button>
          </a>
          <a
            href={`mailto:kuushwaha33ravi@gmail.com`}
            className="w-1/2 border-t-[1px] border-t-zinc-800 text-sm tracking-wide uppercase flex justify-center items-center gap-2 hover:text-designColor duration-300"
          >
            <button className="w-full h-full flex justify-center items-center gap-2">
              Contact me <ReactIcons.FaEnvelope />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(Left);
