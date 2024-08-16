import React from "react";
import { Fugaz_One } from "next/font/google";

const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
export default function Hero() {
  return (
    <div className="py-10 sm:py-14 md:py-20">
      <h1
        className={`${fugazOne.className} text-5xl sm:text-6xl md:text-7xl text-center`}
      >
        <span className="text-gradient">Mood Tracker </span>
        helps you tracks your
        <span className="text-gradient"> daily </span>
        mood!
      </h1>
    </div>
  );
}
