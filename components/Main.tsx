import React from "react";

export default function Main(props: any) {
  const { children } = props;
  return (
    <main>
      {children}
    </main>
  );
}
