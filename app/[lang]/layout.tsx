import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header, Footer } from "../components/ui";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thiago Felippe - Desenvolvedor Front-End",
  description: "Desenvolvedor Front-End com 3+ anos de experiência em React, Next.js e React Native.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}