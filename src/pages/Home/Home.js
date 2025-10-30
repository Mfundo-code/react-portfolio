import React from "react";
import HeroSection from "./HomeComponents/HeroSection";
import CallToActionSection from "./HomeComponents/CallToActionSection";
import TestimonialsSection from "./HomeComponents/TestimonialsSection";
import ProjectsSection from "./HomeComponents/ProjectsSection";
import AboutMe from "./HomeComponents/AboutMe"

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutMe />
      <ProjectsSection />
      <CallToActionSection />
      <TestimonialsSection />
    </main>
  );
};

export default Home;
