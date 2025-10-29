import React from "react";
import AboutHero from "./AboutComponents/AboutHero";
import MissionSection from "./AboutComponents/MissionSection";
import HistorySection from "./AboutComponents/HistorySection";
import TeamSection from "./AboutComponents/TeamSection";
import ValuesSection from "./AboutComponents/ValuesSection";
import StatsSection from "./AboutComponents/StatsSection";
import TimelineSection from "./AboutComponents/TimelineSection";
import AboutCTA from "./AboutComponents/AboutCTA";

const About = () => {
  return (
    <main>
      <div>hey i'm About page</div>
      <AboutHero />
      <MissionSection />
      <HistorySection />
      <TeamSection />
      <ValuesSection />
      <StatsSection />
      <TimelineSection />
      <AboutCTA />
    </main>
  );
};

export default About;
