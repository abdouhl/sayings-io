"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { locales } from "@/middleware"

interface LanguageSwitcherProps {
  currentLang: string
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const switchLanguage = (locale: string) => {
    if (locale === currentLang) return

    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${currentLang}`, "")

    // Navigate to the same page but with the new locale
    router.push(`/${locale}${pathWithoutLocale}`)
    setOpen(false)
  }

  const languageNames: Record<string, string> = {
    en: "English",
    es: "Español",
    ar: "العربية",
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={locale === currentLang ? "bg-accent font-medium" : ""}
          >
            {languageNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

