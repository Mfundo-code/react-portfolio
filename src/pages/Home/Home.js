import React from "react";
import HeroSection from "./HomeComponents/HeroSection";
import FeaturesSection from "./HomeComponents/FeaturesSection";
import HowItWorksSection from "./HomeComponents/HowItWorksSection";
import ServicesSection from "./HomeComponents/ServicesSection";
import ServicesAreaSection from "./HomeComponents/ServicesAreaSection";
import CallToActionSection from "./HomeComponents/CallToActionSection";
import AdvertisingSection from "./HomeComponents/AdvertisingSection";
import PricingSection from "./HomeComponents/PricingSection";
import PortfolioSection from "./HomeComponents/PortfolioSection";
import TestimonialsSection from "./HomeComponents/TestimonialsSection";
import ClientsSection from "./HomeComponents/ClientsSection";
import StatsSection from "./HomeComponents/StatsSection";
import FAQSection from "./HomeComponents/FAQSection";
import NewsletterSection from "./HomeComponents/NewsletterSection";
import LatestBlogSection from "./HomeComponents/LatestBlogSection";
import ContactSection from "./HomeComponents/ContactSection";
import ProjectsSection from "./HomeComponents/ProjectsSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ServicesSection />
      <ServicesAreaSection />
      <ProjectsSection />
      <CallToActionSection />
      <AdvertisingSection />
      <PricingSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ClientsSection />
      <StatsSection />
      <FAQSection />
      <NewsletterSection />
      <LatestBlogSection />
      <ContactSection />
    </main>
  );
};

export default Home;
