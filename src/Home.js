import React, {
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
  useTransition,
} from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope,FaCertificate } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
// import { MdWork, MdOutlineClose } from "react-icons/md";
import { SiGooglechat } from "react-icons/si";
import Left from "./components/home/Left";
// import Sidenav from "./components/home/sidenav/Sidenav";
import IconButton from "./components/button/Iconbutton";
import usePersistedState from "./usePersistedState";
import Loader from "./components/loader/loader";

// Hooks to access the contexts
import { useAboutData } from "./context/about_data";
import { useProjectsData } from "./context/project";
import { useCertificatesData } from "./context/certificate";
import { useBlogsData } from "./context/blog";
import { useContactData } from "./context/contact";
import { useEducationData } from "./context/education";
import { useExperienceData } from "./context/experience";
import { useSkillsData } from "./context/skill";

// Lazy loading components
const About = lazy(() => import("./components/about/About"));
const Resume = lazy(() => import("./components/resume/Resume"));
const Projects = lazy(() => import("./components/projects/Projects"));
const Certificate = lazy(() => import("./components/certificate/Certificate"));
const Blog = lazy(() => import("./components/blog/Blog"));
const Contact = lazy(() => import("./components/contact/Contact"));

const Home = () => {
  const [activeSection, setActiveSection] = usePersistedState(
    "activeSection",
    "about"
  );
  // const [sidenav, setSidenav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPending, startTransition] = useTransition();
  // const sidenavRef = useRef();

  const aboutRef = useRef();
  const resumeRef = useRef();
  const projectsRef = useRef();
  const certificateRef = useRef();
  const blogRef = useRef();
  const contactRef = useRef();

  // Context hooks to fetch data when needed
  const { fetchData: fetchAboutData } = useAboutData();
  const { fetchData: fetchProjectsData } = useProjectsData();
  const { fetchData: fetchCertificates } = useCertificatesData();
  const { fetchData: fetchBlogsData } = useBlogsData();
  const { fetchData: fetchContactData } = useContactData();
  const { fetchData: fetchEducationData } = useEducationData();
  const { fetchData: fetchExperienceData } = useExperienceData();
  const { fetchData: fetchSkillsData } = useSkillsData();

  // // Handle click outside of the sidenav to close it
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (sidenavRef.current && !sidenavRef.current.contains(e.target)) {
  //       setSidenav(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);


  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    fetchAboutData();

    if (!isMobile) {
      switch (activeSection) {
        case "resume":
          fetchEducationData();
          fetchExperienceData();
          fetchSkillsData();
          break;
        case "projects":
          fetchProjectsData();
          break;
        case "certificate":
          fetchCertificates();
          break;
        case "blog":
          fetchBlogsData();
          break;
        case "contact":
          fetchContactData();
          break;
        default:
          break;
      }
    }
  }, [
    activeSection,
    isMobile,
    fetchAboutData,
    fetchProjectsData,
    fetchCertificates,
    fetchBlogsData,
    fetchContactData,
    fetchEducationData,
    fetchExperienceData,
    fetchSkillsData,
  ]);

  // Set up IntersectionObserver to load sections on scroll for mobile
  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const section = entry.target.getAttribute("data-section");
              if (section === "about") fetchAboutData();

              if (section === "resume") {
                fetchEducationData();
                fetchExperienceData();
                fetchSkillsData();
              }
              if (section === "projects") fetchProjectsData();
              if (section === "certificate") fetchCertificates();
              if (section === "blog") fetchBlogsData();
              if (section === "contact") fetchContactData();
            }
          });
        },
        { threshold: 0.1 }
      );

      if (aboutRef.current) observer.observe(aboutRef.current);
      if (projectsRef.current) observer.observe(projectsRef.current);
      if (certificateRef.current) observer.observe(certificateRef.current);
      if (resumeRef.current) observer.observe(resumeRef.current);
      if (blogRef.current) observer.observe(blogRef.current);
      if (contactRef.current) observer.observe(contactRef.current);

      return () => observer.disconnect();
    }
  }, [
    isMobile,
    fetchAboutData,
    fetchProjectsData,
    fetchCertificates,
    fetchBlogsData,
    fetchContactData,
    fetchEducationData,
    fetchExperienceData,
    fetchSkillsData,
  ]);

  const handleSectionChange = (section) => {
    startTransition(() => {
      setActiveSection(section);
      if (!isMobile) {
        switch (section) {
          case "about":
            fetchAboutData();
            break;
          case "resume":
            fetchEducationData();
            fetchExperienceData();
            fetchSkillsData();
            break;
          case "projects":
            fetchProjectsData();
            break;
          case "certificate":
            fetchCertificates();
            break;
          case "blog":
            fetchBlogsData();
            break;
          case "contact":
            fetchContactData();
            break;
          default:
            break;
        }
      }
    });
    // setSidenav(false);
  };

  const sections = {
    about: <About />,
    resume: <Resume />,
    projects: <Projects />,
    certificate: <Certificate />,
    blog: <Blog />,
    contact: <Contact />,
  };

  return (
    <div className="w-full lgl:w-[85%] h-full lgl:h-[85%] bg-transparent text-white z-50 flex items-start justify-between p-4 lgl:p-0">
      {/* ================= Left Icons Start here ====================== */}
      <div className="w-16 h-96 bg-transparent hidden lgl:flex  flex-col gap-4">
        {/* ======= Home Icon start */}
        <div
          // onClick={() => setSidenav(false)}
          className="w-full h-20 bg-bodyColor rounded-3xl flex justify-center items-center cursor-pointer group"
        >
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-2 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
            <span className="w-8 h-[2px] bg-textColor inline-block group-hover:bg-designColor duration-300"></span>
            <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-3.5 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
          </div>
        </div>
        {/* ======= Home Icon End */}

        
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
          {/* <IconButton
            Icon={MdWork}
            label="Projects"
            isActive={activeSection === "projects"}
            onClick={() => handleSectionChange("projects")}
          /> */}
          <IconButton
            Icon={FaCertificate}
            label="Certificate"
            isActive={activeSection === "certificate"}
            onClick={() => handleSectionChange("certificate")}
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
          {/* Mobile view with all sections stacked */}
          <div className="w-full h-full lgl:hidden bg-transparent rounded-2xl flex flex-col gap-6">
            <Suspense fallback={<Loader></Loader>}>
              <div ref={aboutRef} data-section="about">
                {sections["about"]}
              </div>

              <div ref={resumeRef} data-section="resume">
                {sections["resume"]}
              </div>
              <div ref={projectsRef} data-section="projects">
                {sections["projects"]}
              </div>
              <div ref={certificateRef} data-section="certificate">
                {sections["certificate"]}
              </div>
              <div ref={blogRef} data-section="blog">
                {sections["blog"]}
              </div>
              <div ref={contactRef} data-section="contact">
                {sections["contact"]}
              </div>
            </Suspense>
          </div>
          {/* Desktop view with active section */}
          <div className="w-full h-[96%] hidden lgl:flex justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-[#646464]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<Loader />}>
                {isPending ? <Loader /> : sections[activeSection]}
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
