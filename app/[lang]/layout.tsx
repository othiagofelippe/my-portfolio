import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Header, Footer, ScrollToTop } from "../components";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { ToastContainer } from "react-toastify";

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
  description: "Desenvolvedor Front-End com 3+ anos de experiência em React, Next.js e React Native.",
  icons: {
    icon: '/favicon.ico',
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
    <html lang={lang} className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased`}
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
      </body>
    </html>
  );
}