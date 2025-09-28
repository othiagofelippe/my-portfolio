import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer, Header, ScrollToTop } from "../../components";
import "../globals.css";
import { ThemeProvider } from "../providers/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Thiago Felippe - Desenvolvedor Front-End",
  description:
    "Desenvolvedor Front-End com 3+ anos de experiência em React, Next.js e React Native.",
  icons: {
    icon: "/logo-light.svg",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <head />
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header lang={lang as Locale} dict={dict} />
          {children}
          <Footer dict={dict} />
          <ScrollToTop />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="auto"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
