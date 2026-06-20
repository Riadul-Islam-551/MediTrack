import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "MediTrack - AI Health Platform",
  description: "Advanced Frontend Medical Ingestion Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header>
          <AppHeader></AppHeader>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
