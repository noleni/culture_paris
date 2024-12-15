import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProviderWrapper } from "./SessionProviderWrapper";
import "./styles/globals.scss";

import Header from "./components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Paris Culture",
  description: "Le réseau social de la culture à Paris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${
          true ? "theme--dark" : "theme--light"
        }`}
      >
        <SessionProviderWrapper>
          <Header />
          <main>{children}</main>
          <footer>
            <p>Footer</p>
          </footer>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
