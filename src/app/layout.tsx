import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Link from "next/link";
import Providers from "./Providers";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
// import GoogleAdsense from "./components/GoogleAdsense";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];

  if (!value) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(`Missing environment variable: ${key}`);
    } else {
      console.warn(`⚠️ Warning: Missing environment variable: ${key}`);
    }
    return defaultValue || ""; // Provide a default fallback if necessary
  }
  return value;
};

const googleID = getEnvVar("GA_ID");
const googleAdId = getEnvVar("GOOGLE_AD_ID");

// app/layout.tsx
export const metadata: Metadata = {
  title: "ATS Resume Scanner | Optimize Resumes for Applicant Tracking Systems",
  description:
    "Get instant AI-powered analysis of your resume's ATS compatibility. Improve your job application success rate with our automated resume scanner.",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "ATS resume",
    "resume scanner",
    "applicant tracking system",
    "resume optimization",
  ],
  openGraph: {
    title: "ATS Resume Scanner - Optimize for Applicant Tracking Systems",
    description: "AI-powered resume analysis for ATS compatibility",
    url: "https://atsresumescan.com",
    siteName: "ATS Resume Scan",
    images: [
      {
        url: "https://atsresumescan.com/og-image.svg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS Resume Scanner - Optimize for Applicant Tracking Systems",
    description: "AI-powered resume analysis for ATS compatibility",
    images: ["https://atsresumescan.com/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable}`}>
        <nav>
          <span className="logo">
            <Link href={"/"}>ATS RESUME SCANNER</Link>
          </span>
          <div className="google-ad-box"></div>
          <div></div>
        </nav>
        <Providers>
          <div className="c-main">{children}</div>
        </Providers>
        <Toaster />
      </body>
      {googleID && <GoogleAnalytics gaId={googleID} />}
    </html>
  );
}
