import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dadson Logistics - Reliable Logistics Solutions",
  description: "Dadson Logistics provides efficient freight forwarding, warehousing, supply chain management, and express delivery services for businesses worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-satoshi antialiased min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-grow pt-[92px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
