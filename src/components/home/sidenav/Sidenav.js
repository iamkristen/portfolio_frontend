import React from "react";
import { Link } from "react-router-dom";
import SidenavTitle from "./SidenavTitle";
import { useBlogsData } from "../../../context/blog";
import { useProjectsData } from "../../../context/project";

const Sidenav = () => {
  const { blogsData } = useBlogsData();
  const { projectsData } = useProjectsData();

  return (
    <div className="px-7 py-4">
      {/* <SidenavTitle title="M" subTitle="enu" />
      <ul>
        {aboutData && <li className="sidenavLi">{aboutData.name}</li>}
        <li className="sidenavLi">
          <Link to="/portfolio">Portfolio Page</Link>
        </li>
      </ul> */}

      <SidenavTitle title="L" subTitle="atest Projects" />
      <ul>
        {projectsData &&
          projectsData.slice(0, 4).map((project, index) => (
            <li key={index} className="sidenavLi">
              <Link to={`/projects/${project._id}`}>{project.title}</Link>
            </li>
          ))}
      </ul>

      <SidenavTitle title="L" subTitle="atest Posts" />
      <ul>
        {blogsData &&
          blogsData.slice(0, 4).map((post, index) => (
            <li key={index} className="sidenavLi">
              <Link to={`/blogs/${post._id}`}>{post.title}</Link>
            </li>
          ))}
      </ul>

      <SidenavTitle title="R" subTitle="each Me" />
      <ul>
        <li className="sidenavLi">
          <a href="tel:+447810378238">+447810378238</a>
        </li>
        <li className="sidenavLi">
          <a href="mailto:kuushwaha33ravi@gmail.com">
            kuushwaha33ravi@gmail.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
