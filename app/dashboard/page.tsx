import Main from "@/components/Main";
import Dashboard from "@/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FB-Mood Track ⋅ Dashboard",
};

export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
