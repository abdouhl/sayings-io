import Link from "next/link"
import { Quote } from "lucide-react"

interface FooterProps {
  lang: string
  isRtl?: boolean
  dictionary: {
    copyright: string
    about?: string
    contact?: string
    privacy?: string
    terms?: string
    [key: string]: string | undefined
  }
}

export function Footer({ lang, dictionary, isRtl = false }: FooterProps) {
  // Provide fallbacks for missing dictionary entries
  const dict = {
    copyright: dictionary?.copyright || "Sayings. All rights reserved.",
    about: dictionary?.about || "About",
    contact: dictionary?.contact || "Contact",
    privacy: dictionary?.privacy || "Privacy Policy",
    terms: dictionary?.terms || "Terms of Service",
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Quote className="h-5 w-5" />
            <span className="font-bold text-lg">Sayings</span>
          </div>

          <nav className={`flex flex-wrap gap-x-6 gap-y-2 justify-center ${isRtl ? "flex-row-reverse" : ""}`}>
            <Link href={`/${lang}/about`} className="text-sm hover:text-primary transition-colors">
              {dict.about}
            </Link>
            <Link href={`/${lang}/contact`} className="text-sm hover:text-primary transition-colors">
              {dict.contact}
            </Link>
            <Link href={`/${lang}/privacy`} className="text-sm hover:text-primary transition-colors">
              {dict.privacy}
            </Link>
            <Link href={`/${lang}/terms`} className="text-sm hover:text-primary transition-colors">
              {dict.terms}
            </Link>
          </nav>

          <div className="text-sm text-muted-foreground">
            © {currentYear} {dict.copyright.replace("Sayings", "")}
          </div>
        </div>
      </div>
    </footer>
  )
}

