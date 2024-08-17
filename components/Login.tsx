"use client";

import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login }: any = useAuth();

  async function handleSubmit() {
    if (!email || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("Signing up a new user");
        await signup({ email, password });
      } else {
        console.log("Logging in a new user");
        await login({ email, password });
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h3 className={`${fugazOne.className} text-4xl sm:text-5xl`}>
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        value={email}
        className="w-full max-w-[400px] mx:auto px-3 py-2 sm:py-3 border hover:border-indigo-600 focus:border-indigo-600 border-solid border-indigo-400 rounded-full outline-none"
        type="email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        className="w-full max-w-[400px] mx:auto px-3 py-2 sm:py-3 border hover:border-indigo-600 focus:border-indigo-600 border-solid border-indigo-400 rounded-full outline-none"
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600"
        >
          {isRegister ? "Sign in" : "Sign Up"}
        </button>
      </p>
    </section>
  );
}
