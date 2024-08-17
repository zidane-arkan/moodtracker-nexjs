import React from "react";
import { Fugaz_One } from "next/font/google";
import { gradients, baseRating, demoData } from "@/utils/index.js";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Calender(props: any) {
  const { demo } = props;
  const year = 2024;
  const month = "July";
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
  const firstDayOfMonth = monthNow.getDay(); // 4
  const daysInMonth = new Date(
    year,
    Object.keys(months).indexOf(month) + 1,
    0
  ).getDate(); // 31

  const daysToDisplay = firstDayOfMonth + daysInMonth; // 35
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0); // 5 + 0 = 5

  return (
    <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7 gap-1">
          {dayList.map((dayOfWeek, dayOfWeekIndex) => {
            const dayIndex =
              rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
            const dayDisplay = dayIndex > 0 && dayIndex <= daysInMonth;
            const isToday = dayIndex === now.getDate();

            if (!dayDisplay) {
              return <div key={dayOfWeekIndex} className="bg-white" />;
            }

            const backgroundColor = demo
              ? gradients.indigo[
                  baseRating[dayIndex as keyof typeof baseRating]
                ]
              : dayIndex in demoData
              ? gradients.indigo[demoData[dayIndex as keyof typeof demoData]]
              : "white";

            const textColor =
              backgroundColor === "white" ? "text-indigo-400" : "text-white";

            return (
              <div
                style={{ background: backgroundColor }}
                key={dayOfWeekIndex}
                className={`${
                  isToday ? "border-indigo-400" : "border-indigo-100"
                } ${backgroundColor} text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg`}
              >
                <p className={textColor}>{dayIndex}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
