import React from "react";
import ServicesHero from "./ServicesComponents/ServicesHero";
import ServicesAreaSection from "./ServicesComponents/ServicesAreaSection";
import ServiceCard from "./ServicesComponents/ServiceCard";
import PricingSection from "./ServicesComponents/PricingSection";
import FAQSection from "./ServicesComponents/FAQSection";
import ComparisonTable from "./ServicesComponents/ComparisonTable";
import ServicesCTA from "./ServicesComponents/ServicesCTA";

const Services = () => {
  return (
    <main>
      <div>hey i'm Services page</div>
      <ServicesHero />
      <ServicesAreaSection />
      <ServiceCard />
      <PricingSection />
      <FAQSection />
      <ComparisonTable />
      <ServicesCTA />
    </main>
  );
};

export default Services;
