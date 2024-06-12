import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoundOne from "./components/roundDesigns/RoundOne";
import RoundTwo from "./components/roundDesigns/RoundTwo";
import RoundThree from "./components/roundDesigns/RoundThree";
import RoundFour from "./components/roundDesigns/RoundFour";
import RoundFive from "./components/roundDesigns/RoundFive";
import Home from "./Home";
import ProjectDetail from "./components/projects/ProjectDetail";
import { AboutDataProvider } from "./context/about_data";
import { SocialLinksProvider } from "./context/socail_link";
import { EducationDataProvider } from "./context/education";
import { SkillsDataProvider } from "./context/skill";
import { ExperienceDataProvider } from "./context/experience";
import { ProjectsDataProvider } from "./context/project";

function App() {
  return (
    <Router>
      <AboutDataProvider>
        <SocialLinksProvider>
          <EducationDataProvider>
            <SkillsDataProvider>
              <ExperienceDataProvider>
                <ProjectsDataProvider>
                  <div className="w-full lgl:h-screen font-bodyfont overflow-hidden text-textColor bg-black relative">
                    <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                          path="/projects/:projectId"
                          element={<ProjectDetail />}
                        />
                      </Routes>
                    </div>
                    <div className="w-full h-full absolute top-0 left-0 z-10">
                      <RoundOne />
                      <RoundTwo />
                      <RoundThree />
                      <RoundFour />
                      <RoundFive />
                    </div>
                  </div>
                </ProjectsDataProvider>
              </ExperienceDataProvider>
            </SkillsDataProvider>
          </EducationDataProvider>
        </SocialLinksProvider>
      </AboutDataProvider>
    </Router>
  );
}

export default App;
