import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import Calender from "./Calender";

const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
export default function Hero() {
  return (
    <div className="py-4 md:py-12 flex flex-col gap-4 sm:gap-8">
      <h1
        className={`${fugazOne.className} text-5xl sm:text-6xl md:text-7xl text-center`}
      >
        <span className="text-gradient">Mood Tracker </span>
        helps you tracks your
        <span className="text-gradient"> daily </span>
        mood!
      </h1>
      <p className="w-full mx-auto max-w-[600px] text-lg sm:text-xl md:text-2xl text-center">
        Create Your Own Mood Record and see how you feel on{" "}
        <span className="font-medium">Every day For the Longest!</span>
      </p>
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Button text="Sign Up" />
        <Button text="Login" dark />
      </div>
      <Calender />
    </div>
  );
}
