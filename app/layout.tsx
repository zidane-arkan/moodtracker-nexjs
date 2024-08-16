import type { Metadata } from "next";
import { Fugaz_One, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "FB-Mood Track",
  description: "Track your daily modd every day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between">
      <h1 className={`${fugazOne.className} text-gradient`}>FB-MoodTracker</h1>
    </header>
  );

  const footer = <footer  className="p-4 sm:p-8 ">footer</footer>;

  return (
    <html lang="en">
      <body
        className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col ${inter.className}`}
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
