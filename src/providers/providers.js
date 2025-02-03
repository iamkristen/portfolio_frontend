// Providers.js
import React from "react";
import { AboutDataProvider } from "../context/about_data";
import { SocialLinksProvider } from "../context/socail_link";
import { EducationDataProvider } from "../context/education";
import { SkillsDataProvider } from "../context/skill";
import { ExperienceDataProvider } from "../context/experience";
import { ProjectsDataProvider } from "../context/project";
import { BlogsDataProvider } from "../context/blog";
import { ContactProvider } from "../context/contact";
import { CertificatesDataProvider } from "../context/certificate";

const Providers = ({ children }) => (
  <AboutDataProvider>
    <SocialLinksProvider>
      <EducationDataProvider>
        <SkillsDataProvider>
          <ExperienceDataProvider>
            <ProjectsDataProvider>
              <BlogsDataProvider>
                <ContactProvider>
                  <CertificatesDataProvider>
                    {children}
                  </CertificatesDataProvider>
                </ContactProvider>
              </BlogsDataProvider>
            </ProjectsDataProvider>
          </ExperienceDataProvider>
        </SkillsDataProvider>
      </EducationDataProvider>
    </SocialLinksProvider>
  </AboutDataProvider>
);

export default Providers;
