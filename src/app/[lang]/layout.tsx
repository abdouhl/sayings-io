import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import { locales, rtlLocales } from "@/middleware"
import { ModalProvider } from "@/contexts/modal-context"
import { QuoteModal } from "@/components/quote-modal"
import { WebsiteStructuredData } from "@/components/structured-data"

// Fix the font configuration - use separate subsets instead of combining them
const inter = Inter({
  subsets: ["latin"],
  // Don't include Arabic in the font subset as it's causing the unicode escape error
  // We'll use system fonts for Arabic text
  display: "swap",
})

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const awaitedParams = await params; // Ensure params is awaited first
  const { lang = "en" } = awaitedParams ?? {}; 
  const dict = await getDictionary(lang);


  return {
    title: {
      default: dict.metadata.title,
      template: `%s | ${dict.metadata.title}`,
    },
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: "website",
      locale: lang,
      alternateLocale: locales.filter((locale) => locale !== lang),
    },
    //viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const awaitedParams = await params; // Ensure params is awaited first
  const { lang = "en" } = awaitedParams ?? {};
  
  const dict = await getDictionary(lang)
  const isRtl = rtlLocales.includes(lang)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"

  return (
    <html lang={lang} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} ${isRtl ? "rtl" : "ltr"}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ModalProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar lang={lang} dictionary={dict.navigation} isRtl={isRtl} />
              <main className="flex-1">{children}</main>
              <Footer lang={lang} dictionary={dict.footer} isRtl={isRtl} />
              <QuoteModal />
            </div>
          </ModalProvider>
          <WebsiteStructuredData baseUrl={baseUrl} />
        </ThemeProvider>
      </body>
    </html>
  )
}

