import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Dadson Logistics - Reliable Logistics Solutions",
  description: "Dadson Logistics provides efficient freight forwarding, warehousing, supply chain management, and express delivery services for businesses worldwide.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/favicon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon.png"],
  },
  manifest: "/manifest.json",
  themeColor: "#00B4E1",
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
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
