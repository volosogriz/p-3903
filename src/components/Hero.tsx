import React from "react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Transform your digital experience
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Our platform helps businesses create stunning websites and
              applications with minimal effort and maximum impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/24721c969a8641f49dddc9964ffeebe0/7479ef71957b916b9e57ea01ae6361ee3040533d?placeholderIfAbsent=true"
                alt="Platform dashboard preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
