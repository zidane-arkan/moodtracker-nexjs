import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";

const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h3 className={`${fugazOne.className} text-4xl sm:text-5xl`}>
        Login / Register
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        className="w-full max-w-[400px] mx:auto px-3 py-2 sm:py-3 border hover:border-indigo-600 focus:border-indigo-600 border-solid border-indigo-400 rounded-full outline-none"
        type="email"
        placeholder="Email..."
      />
      <input
        className="w-full max-w-[400px] mx:auto px-3 py-2 sm:py-3 border hover:border-indigo-600 focus:border-indigo-600 border-solid border-indigo-400 rounded-full outline-none"
        type="password"
        placeholder="Password..."
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button text="Submit" full />
      </div>
    </section>
  );
}
