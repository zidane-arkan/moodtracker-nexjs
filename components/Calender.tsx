"use client";

import React, { useState, useEffect } from "react";
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
const months_arr = Object.keys(months);

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

type CalendarProps = {
  demo: boolean;
  completedData: any;
  handleSetMood: any;
};

export default function Calendar({
  demo,
  completedData,
  handleSetMood,
}: CalendarProps) {
  const now = new Date();
  const currMonth = now.getMonth();

  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currMonth]
  );

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = Object.keys(months).indexOf(selectedMonth);
  const data = completedData?.[selectedYear]?.[numericMonth] || {};
  console.log(completedData);

  function handleCounterMonth(val: any) {
    if (numericMonth + val < 0) {
      // Set month value = 11 and decrease the year
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(months_arr[months_arr.length - 1]);
    } else if (numericMonth + val > 11) {
      // Set month value = 0 and increase the year
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(months_arr[0]);
    } else {
      setSelectedMonth(months_arr[numericMonth + val]);
    }
  }

  // const year = 2024;
  // const month = "July";
  // const today = new Date();

  const firstDayOfMonth = getFirstDayOfMonth(selectedYear, selectedMonth);
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const numRows = calculateNumRows(firstDayOfMonth, daysInMonth);

  return (
    <div className="flex flex-col overflow-hidden gap-1 sm:gap-4 py-4 sm:py-6 md:py-10">
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => handleCounterMonth(-1)}
          className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 opacity-60"
        >
          {"<"}
        </button>
        <p className={`${fugaz.className} text-center capitalize`}>
          {selectedMonth} {selectedYear}
        </p>
        <button
          className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 opacity-60"
          onClick={() => handleCounterMonth(+1)}
        >
          {">"}
        </button>
      </div>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <CalendarRow
          key={rowIndex}
          data={data}
          rowIndex={rowIndex}
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          today={now}
          demo={demo}
        />
      ))}
    </div>
  );
}

function getFirstDayOfMonth(year: number, month: string) {
  return new Date(year, Object.keys(months).indexOf(month), 1).getDay();
}

function getDaysInMonth(year: number, month: string) {
  return new Date(year, Object.keys(months).indexOf(month) + 1, 0).getDate();
}

function calculateNumRows(firstDayOfMonth: number, daysInMonth: number) {
  const totalDays = firstDayOfMonth + daysInMonth;
  return Math.ceil(totalDays / 7);
}

type CalendarRowProps = {
  rowIndex: number;
  data: any;
  firstDayOfMonth: number;
  daysInMonth: number;
  today: Date;
  demo: boolean;
};

function CalendarRow({
  rowIndex,
  data,
  firstDayOfMonth,
  daysInMonth,
  today,
  demo,
}: CalendarRowProps) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {dayList.map((_, dayOfWeekIndex) => {
        const dayIndex = calculateDayIndex(
          rowIndex,
          dayOfWeekIndex,
          firstDayOfMonth
        );
        const isToday = isTodayDate(dayIndex, today);
        const dayDisplay = isValidDay(dayIndex, daysInMonth);

        return (
          <CalendarCell
            key={dayOfWeekIndex}
            data={data}
            dayIndex={dayIndex}
            dayDisplay={dayDisplay}
            isToday={isToday}
            demo={demo}
          />
        );
      })}
    </div>
  );
}

function calculateDayIndex(
  rowIndex: number,
  dayOfWeekIndex: number,
  firstDayOfMonth: number
) {
  return rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
}

function isValidDay(dayIndex: number, daysInMonth: number) {
  return dayIndex > 0 && dayIndex <= daysInMonth;
}

function isTodayDate(dayIndex: number, today: Date) {
  return dayIndex === today.getDate();
}

type CalendarCellProps = {
  dayIndex: number;
  data: any;
  dayDisplay: boolean;
  isToday: boolean;
  demo: boolean;
};

function CalendarCell({
  dayIndex,
  data,
  dayDisplay,
  isToday,
  demo,
}: CalendarCellProps) {
  if (!dayDisplay) return <div className="bg-white" />;

  const backgroundColor = getBackgroundColor(dayIndex, demo, data);
  const textColor =
    backgroundColor === "white" ? "text-indigo-400" : "text-white";

  return (
    <div
      style={{ background: backgroundColor }}
      className={`${
        isToday ? "border-indigo-400" : "border-indigo-100"
      } ${backgroundColor} text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg`}
    >
      <p className={textColor}>{dayIndex}</p>
    </div>
  );
}

function getBackgroundColor(
  dayIndex: number,
  demo: boolean,
  completedData: any
) {
  if (demo) {
    return gradients.indigo[baseRating[dayIndex as keyof typeof baseRating]];
  } else if (dayIndex in completedData) {
    return gradients.indigo[
      completedData[dayIndex as keyof typeof completedData]
    ];
  } else {
    return "white";
  }
}
