import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import { Sidebar } from "../components/ui/sidebar";

const inter = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "HeartLink",
  description: "A Dating App",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {/* Sidebar is hidden on small screens */}
          <Sidebar />
        

        <main>{children}</main>

        {/* Toaster Notifications */}
        <Toaster />
      </body>
    </html>
  );
}
