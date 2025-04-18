import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import "./fonts.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dadson Logistics',
  description: 'Freight done right - No bots, no guesswork.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ClientLayout>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  )
}
