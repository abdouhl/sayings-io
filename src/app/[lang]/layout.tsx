import type React from "react";
import { getDictionary } from "@/dictionaries";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Sayings",
    default: "Sayings - Inspirational Quotes",
  },
  description:
    "Discover inspirational quotes from famous authors and thinkers.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params?.lang || "en";
  const dict = await getDictionary(lang);
  const isRtl = lang === "ar";

  return (
    <html
      lang={lang}
      dir={isRtl ? "rtl" : "ltr"}
      className={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar
            lang={lang}
            dictionary={dict.navigation}
            isRtl={isRtl}
            isHomePage={true}
          />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} dictionary={dict.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
