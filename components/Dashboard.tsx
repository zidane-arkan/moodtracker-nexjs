"use client";

import React, { useEffect, useState } from "react";
import { Fugaz_One } from "next/font/google";
import Calender from "./Calender";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc, sum } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "./Login";
import Loading from "./Loading";

interface statuses {
  num_days: number;
  time_remaining: string;
  average_mood: string;
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
  const { loading, currentUser, userDataObj, setUserDataObj }: any = useAuth();
  const [data, setData] = useState<any>({});
  const now = new Date();

  function countValues() {
    let totalNumberOfDays = 0;
    let sum_moods = 0;

    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          totalNumberOfDays++;
          sum_moods += days_mood;
        }
      }
    }
    return {
      num_days: totalNumberOfDays,
      avgMood: (sum_moods / totalNumberOfDays).toFixed(2),
    };
  }

  const statuses: any = {
    // num_days: 14,
    // average_mood: new Date().toDateString(),
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood: any) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };
      if (!newData[year]) {
        newData[year] = {};
      }
      if (!newData[year][month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;

      // Update current state
      setData(newData);
      // Update The global state
      setUserDataObj(newData);
      // Update Firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (error: any) {
      console.log("Faild to send data", error.message);
    }
  }

  const moods: moods = {
    "&*@#$": "😭",
    Sad: "🥲",
    Existing: "😶",
    Good: "😊",
    Elated: "😍",
  };

  useEffect(() => {
    if (!currentUser && !userDataObj) {
      console.log("USER NOT FOUND");
      return;
    }
    // console.log(userDataObj);
    setData(userDataObj || {});
  }, [currentUser, userDataObj]);

  // Authenticated User
  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <section className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 p-4 gap-4 bg-indigo-50 text-indigo-500 rounded-lg">
        {Object.keys(statuses).map((status, statusIndex) => (
          <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2">
            <p className="capitalize font-medium text-xs sm:text-sm truncate">
              {status.replaceAll("_", " ")}
            </p>
            <p
              className={`${fugazOne.className} text-base sm:text-lg truncate`}
            >
              {statuses[status as keyof statuses]}
              {status == "num_days" ? " 🔥" : ""}
            </p>
          </div>
        ))}
      </div>
      <h4
        className={`${fugazOne.className} text-5xl sm:text-6xl md:text-7xl text-center`}
      >
        How Do you <span className="text-gradient">feel</span> today?
      </h4>
      <div className="flex item-stretch flex-wrap gap-4 items-center">
        {Object.keys(moods).map((mood, moodIndex) => (
          <button
            key={moodIndex}
            onClick={() => {
              const currMoodValue = moodIndex + 1;
              handleSetMood(currMoodValue);
            }}
            className={`p-4 px-5 flex flex-col flex-1 gap-2 sm:gap-4 items-center rounded-lg purple-shadow duration-200 bg-indigo-50 hover:bg-[lavendar] text-center ${
              moodIndex === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <p className={`text-4xl sm:text-5xl md:text-6xl`}>
              {moods[mood as keyof moods]}{" "}
            </p>
            <p
              className={`${fugazOne.className} capitalize text-xs sm:text-sm md:text-base text-indigo-500`}
            >
              {mood}
            </p>
          </button>
        ))}
      </div>
      <Calender
        completedData={data}
        handleSetMood={handleSetMood}
        demo={false}
      />
    </section>
  );
}
