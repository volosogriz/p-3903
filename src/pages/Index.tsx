import React, { useState } from "react";
import { Header } from "@/components/Header";
import ProtestHeader from "@/components/ProtestHeader";
import SoundKit from "@/components/SoundKit";
import Album from "@/components/Album";
import Members from "@/components/Members";
import { Slideshow } from "@/components/Slideshow";

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="bg-white min-h-screen">
      <Header isFirstSlide={currentSlide === 0} />
      <Slideshow 
        currentSlide={currentSlide} 
        onSlideChange={setCurrentSlide}
        isFirstSlide={currentSlide === 0}
      >
        <ProtestHeader />
        <SoundKit />
        <Album />
        <Members />
      </Slideshow>
    </div>
  );
}
