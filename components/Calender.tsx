import React from "react";
import { Fugaz_One } from "next/font/google";

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

export default function Calender() {
  const year = 2024;
  const month = "August";
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
  const firstDayOfMonth = monthNow.getDay(); // 4
  const daysInMonth = new Date(
    year,
    Object.keys(months).indexOf(month) + 1,
    0
  ).getDate(); // 31

  const daysToDisplay = firstDayOfMonth + daysInMonth; // 35
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0); // 5 + 1 = 6

  return (
    <div className="flex flex-col overflow-hidden gap-1">
      {[...Array(numRows)].map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7 gap-1">
          {dayList.map((dayOfWeek, dayOfWeekIndex) => {
            let dayIndex =
              rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
            let dayDisplay =
              dayIndex > daysInMonth
                ? false
                : rowIndex === 0 && dayOfWeekIndex < firstDayOfMonth
                ? false
                : true;

            let isToday = dayIndex === now.getDate();
            if (!dayDisplay) {
              return <div key={dayOfWeekIndex} className="bg-white" />;
            }
            let color;
            return (
              <div
                key={dayOfWeekIndex}
                className={`${
                  isToday ? "border-indigo-400" : "border-indigo-100"
                } ${
                  color ? "white" : "text-indigo-400"
                } text-xs sm:text-sm border border-solid p-2 flex items-center  gap-2 justify-between rounded-lg`}
              >
                <p>{dayIndex}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
