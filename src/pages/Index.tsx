
import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";

export default function Index() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <ContactForm />
      </main>
    </div>
  );
}
