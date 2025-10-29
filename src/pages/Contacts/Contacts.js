import React from "react";
import ContactHero from "./ContactsComponents/ContactHero";
import ContactForm from "./ContactsComponents/ContactForm";
import ContactDetails from "./ContactsComponents/ContactDetails";
import MapSection from "./ContactsComponents/MapSection";
import OfficeLocations from "./ContactsComponents/OfficeLocations";
import SocialLinks from "./ContactsComponents/SocialLinks";
import ContactCTA from "./ContactsComponents/ContactCTA";

const Contacts = () => {
  return (
    <main>
      <div>hey i'm Contacts page</div>
      <ContactHero />
      <ContactForm />
      <ContactDetails />
      <MapSection />
      <OfficeLocations />
      <SocialLinks />
      <ContactCTA />
    </main>
  );
};

export default Contacts;
