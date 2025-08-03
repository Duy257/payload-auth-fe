"use client";
import Landing from "@/components/landing";

// Import demo helpers for testing (only in development)
if (process.env.NODE_ENV === "development") {
  import("@/utils/demo-helpers");
}

export default function App() {
  return <Landing />;
}
