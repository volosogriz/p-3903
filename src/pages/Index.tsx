import React from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";

export default function Index() {
  return (
    <div className="bg-white min-h-screen">
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <ContactForm />
      </main>
    </div>
  );
}
