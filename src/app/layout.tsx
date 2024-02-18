import type { Metadata } from "next";
import "./globals.css";
import { serif } from "@/fonts/fonts";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "overreacted - A blog by Dan Abramov",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={serif.className}>
      <body className="mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
