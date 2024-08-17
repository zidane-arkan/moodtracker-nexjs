import type { Metadata } from "next";
import { Fugaz_One, Open_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
const openSans = Open_Sans({ subsets: ["latin"] });
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
      <Link href="/">
        <h1 className={`${fugazOne.className} text-gradient`}>
          FB-MoodTracker
        </h1>
      </Link>
      <div className="flex items-center justify-between">
        PLACEHOLDER || STATS
      </div>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`${fugazOne.className} text-indigo-500`}>
        Created With 🔥{" "}
      </p>{" "}
    </footer>
  );

  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${openSans.className}`}
        >
          {header}
          {children}
          {footer}
        </body>
      </html>
    </AuthProvider>
  );
}
