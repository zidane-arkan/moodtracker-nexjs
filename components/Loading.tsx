import React from "react";

export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      LOADING ...
      <i className="fa-solid text-slate-800 fa-spinner animate-spin text-4xl sm:text-5xl"></i>
    </section>
  );
}
