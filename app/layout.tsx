import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer/Footer";
import MainContainer from "@/components/MainContainer";
import QueryProvider from "@/providers/QueryClientProvider";
import UserProvider from "@/providers/UserProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import CartSync from "@/providers/CartSync";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "JTCltLgtjswXpFvkXOA2kWaqr0nab7n-buAd1RRX42Ks",
  },
  title: "Tsona – Durable Cement Dumbbells & Workout Equipment",
  description:
    "High-quality cement dumbbells and durable workout equipment at affordable prices. Built to last, budget-friendly, and backed by guarantee for home and professional fitness training.",
  keywords: [
    "dumbells",
    "workout",
    "cement dumbbells",
    "workout equipment",
    "fitness equipment",
    "cheap dumbbells",
    "durable gym equipment",
    "home gym",
    "strength training",
  ],

  openGraph: {
    title: "Tsona – Durable Cement Dumbbells",
    description:
      "Affordable, durable cement dumbbells and workout equipment designed for long-lasting performance. Guaranteed quality for every workout.",
    url: "https://yourdomain.com",
    siteName: "Tsona",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tsona Cement Dumbbells",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <QueryProvider>
          <UserProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <CartSync />
              <Header />
              <MainContainer>{children}</MainContainer>
              <Footer />
              <ToastContainer />
            </body>
          </UserProvider>
        </QueryProvider>
      </ReduxProvider>
    </html>
  );
}
