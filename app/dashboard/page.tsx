import Main from "@/components/Main";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FB-Mood Track ⋅ Dashboard",
};

export default function DashboardPage() {
  const isAuthenticated = true;

  let children = <Login />;

  if (isAuthenticated) {
    children = <Dashboard />;
  }

  return <Main>{children}</Main>;
}
