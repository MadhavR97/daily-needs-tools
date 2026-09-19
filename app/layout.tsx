import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "DailyNeedsTools — Free Everyday Tools", template: "%s | DailyNeedsTools" },
  description: "Free fast private tools: calculators, word counter, QR generator, image compressor, converters. No signup.",
  metadataBase: new URL("https://dailyneedstools.vercel.app"),
  openGraph: { title: "DailyNeedsTools", description: "Free everyday tools, fast and private.", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
