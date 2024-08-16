import React from "react";

export default function Main(props: any) {
  const { children } = props;
  return (
    <main className="flex-1 p-4 sm:p-8 ">
      {children}
    </main>
  );
}
