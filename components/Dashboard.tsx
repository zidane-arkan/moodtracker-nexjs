import React from "react";
import { Fugaz_One } from "next/font/google";

interface statuses {
  num_days: number;
  time_remaining: string;
  date: string;
}

interface moods {
  "&*@#$": string;
  Sad: string;
  Existing: string;
  Good: string;
  Elated: string;
}

const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
export default function Dashboard() {
  const statuses: statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods: moods = {
    "&*@#$": "😭",
    Sad: "🥲",
    Existing: "😶",
    Good: "😊",
    Elated: "😍",
  };

  return (
    <section className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 p-4 gap-4 bg-indigo-50 text-indigo-500 rounded-lg">
        {Object.keys(statuses).map((status, statusIndex) => (
          <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2">
            <p className="uppercase font-medium text-xs sm:text-sm truncate">
              {status.replaceAll("_", " ")}
            </p>
            <p
              className={`${fugazOne.className} text-base sm:text-lg truncate`}
            >
              {statuses[status as keyof statuses]}
            </p>
          </div>
        ))}
      </div>
      <h4
        className={`${fugazOne.className} text-5xl sm:text-6xl md:text-7xl text-center`}
      >
        How Do you <span className="text-gradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
        {Object.keys(moods).map((mood, moodIndex) => (
          <button
            key={moodIndex}
            className={`flex flex-col gap-2 sm:gap-4 items-center rounded-lg purple-shadow duration-200 bg-indigo-50 hover:bg-[lavendar] p-4 text-center ${
              moodIndex === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <p className={`text-4xl sm:text-5xl md:text-6xl`}>
              {moods[mood as keyof moods]}{" "}
            </p>
            <p className={`${fugazOne.className} capitalize text-indigo-500`}>
              {mood}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
