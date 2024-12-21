import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SessionProviderWrapper } from "./SessionProviderWrapper";
import "./styles/globals.scss";

import Header from "./components/Header";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
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
    <html lang="en" className="light">
      <body
        className={`${roboto.className} ${
          false ? "theme--dark" : "theme--light"
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
