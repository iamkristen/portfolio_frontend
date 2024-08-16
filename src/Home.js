// Home.js
import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdWork, MdOutlineClose } from "react-icons/md";
import { SiGooglechat } from "react-icons/si";
import Left from "./components/home/Left";
import Sidenav from "./components/home/sidenav/Sidenav";
import IconButton from "./components/button/Iconbutton";
import usePersistedState from "./usePersistedState";
import Loader from "./components/loader/loader";

// Lazy loading components
const About = lazy(() => import("./components/about/About"));
const Resume = lazy(() => import("./components/resume/Resume"));
const Projects = lazy(() => import("./components/projects/Projects"));
const Blog = lazy(() => import("./components/blog/Blog"));
const Contact = lazy(() => import("./components/contact/Contact"));

const Home = () => {
  const [activeSection, setActiveSection] = usePersistedState(
    "activeSection",
    "about"
  );
  const [sidenav, setSidenav] = useState(false);
  const ref = useRef();

  // Handle click outside of the sidenav to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSidenav(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const sections = {
    about: <About />,
    resume: <Resume />,
    projects: <Projects />,
    blog: <Blog />,
    contact: <Contact />,
  };

  return (
    <div className="w-full lgl:w-[85%] h-full lgl:h-[85%] bg-transparent text-white z-50 flex items-start justify-between p-4 lgl:p-0">
      {/* ================= Left Icons Start here ====================== */}
      <div className="w-16 h-96 bg-transparent hidden lgl:flex flex-col gap-4">
        {/* ======= Home Icon start */}
        <div
          onClick={() => setSidenav(true)}
          className="w-full h-20 bg-bodyColor rounded-3xl flex justify-center items-center cursor-pointer group"
        >
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-2 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
            <span className="w-8 h-[2px] bg-textColor inline-block group-hover:bg-designColor duration-300"></span>
            <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-3.5 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
          </div>
        </div>
        {/* ======= Home Icon End */}

        {/* ============= Sidenav Start here ============= */}
        {sidenav && (
          <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50">
            <div className="w-96 h-full relative">
              <motion.div
                ref={ref}
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-bodyColor overflow-y-scroll scrollbar-thin scrollbar-thumb-[#646464]"
              >
                <Sidenav />
                <span
                  onClick={() => setSidenav(false)}
                  className="absolute top-0 -right-16 w-12 h-12 bg-bodyColor text-2xl text-textColor hover:text-designColor duration-300 cursor-pointer flex items-center justify-center z-50"
                >
                  <MdOutlineClose />
                </span>
              </motion.div>
            </div>
          </div>
        )}
        {/* ============= Sidenav End here =============== */}

        {/* ======= Other Icons Start */}
        <div className="w-full h-80 bg-bodyColor rounded-3xl flex flex-col items-center justify-between py-6">
          <IconButton
            Icon={FaUser}
            label="About"
            isActive={activeSection === "about"}
            onClick={() => handleSectionChange("about")}
          />
          <IconButton
            Icon={IoIosPaper}
            label="Resume"
            isActive={activeSection === "resume"}
            onClick={() => handleSectionChange("resume")}
          />
          <IconButton
            Icon={MdWork}
            label="Projects"
            isActive={activeSection === "projects"}
            onClick={() => handleSectionChange("projects")}
          />
          <IconButton
            Icon={SiGooglechat}
            label="Blog"
            isActive={activeSection === "blog"}
            onClick={() => handleSectionChange("blog")}
          />
          <IconButton
            Icon={FaEnvelope}
            label="Contact"
            isActive={activeSection === "contact"}
            onClick={() => handleSectionChange("contact")}
          />
        </div>
        {/* ======= Other Icons End */}
      </div>
      {/* ================= Left Icons End here ======================== */}

      {/* ======================== Home Content Start here ============================ */}
      <div className="w-full lgl:w-[94%] h-full flex flex-col gap-6 lgl:gap-0 lgl:flex-row items-center">
        <Left />
        <div className="w-full lgl:w-8/12 h-[95%] bg-bodyColor rounded-2xl flex justify-center items-center">
          <div className="w-full h-full lgl:hidden bg-transparent rounded-2xl flex flex-col gap-6">
            <Suspense fallback={<Loader></Loader>}>
              <About />
              <Resume />
              <Projects />
              <Blog />
              <Contact />
            </Suspense>
          </div>
          <div className="w-full h-[96%] hidden lgl:flex justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-[#646464]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<Loader />}>
                {sections[activeSection]}
              </Suspense>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ======================== Home Content End here ============================== */}
    </div>
  );
};

export default Home;
