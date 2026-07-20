import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "AI Resume Checker — Land More Interviews",
  description:
    "Upload your resume and get an instant AI-powered analysis: ATS score, skill gap detection, and line-by-line improvement tips. Free, fast, no sign-up.",
  keywords: ["resume checker", "ATS score", "AI resume", "job application", "career"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
