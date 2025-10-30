import React from "react";
import HeroSection from "./HomeComponents/HeroSection";
import CallToActionSection from "./HomeComponents/CallToActionSection";
import ProjectsSection from "./HomeComponents/ProjectsSection";
import AboutMe from "./HomeComponents/AboutMe"

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutMe />
      <ProjectsSection />
      <CallToActionSection />
    </main>
  );
};

export default Home;
