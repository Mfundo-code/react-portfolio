import React from "react";
import ServicesHero from "./ServicesComponents/ServicesHero";
import TechSkills from "./ServicesComponents/TechSkills";
import CallToActionSection from "./ServicesComponents/CallToActionSection";

const Services = () => {
  return (
    <main>
      <ServicesHero />
      <TechSkills />
      <CallToActionSection />
    </main>
  );
};

export default Services;
