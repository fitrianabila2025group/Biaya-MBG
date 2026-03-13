import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MBG Cost Tracker — Indonesia Free Nutritious Meals Spending Estimate",
  description:
    "A transparent public estimation dashboard tracking Indonesia's Makan Bergizi Gratis (MBG) program spending using official budget allocations, realized spending data, and derived calculations. Not a live treasury feed.",
  keywords: [
    "MBG",
    "Makan Bergizi Gratis",
    "Indonesia",
    "free meals",
    "budget tracker",
    "public spending",
    "BGN",
    "Badan Gizi Nasional",
    "transparency",
  ],
  openGraph: {
    title: "MBG Cost Tracker — Indonesia Free Nutritious Meals Spending Estimate",
    description:
      "Transparent public dashboard estimating the scale of Indonesia's MBG program using official data and derived formulas.",
    type: "website",
    locale: "en_US",
    siteName: "MBG Cost Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBG Cost Tracker",
    description:
      "Transparent public estimation dashboard for Indonesia's Free Nutritious Meals (MBG) program spending.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
