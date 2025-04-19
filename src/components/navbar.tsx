import Link from "next/link";
import { Quote, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";

interface NavbarProps {
  lang: string;
  isRtl?: boolean;
  dictionary: {
    home?: string;
    authors?: string;
    allAuthors?: string;
    backToHome?: string;
    [key: string]: string | undefined;
  };
}

export function Navbar({ lang, dictionary, isRtl = false }: NavbarProps) {
  // Provide fallbacks for missing dictionary entries
  const dict = {
    home: dictionary?.home || "Home",
    authors: dictionary?.authors || "Authors",
    allAuthors: dictionary?.allAuthors || "All Authors",
    backToHome: dictionary?.backToHome || "Back to Home",
    title: dictionary?.title || "Sayings",
  };

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <Quote className="h-5 w-5" />
            <span>{dict.title}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${lang}`}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {dict.home}
            </Link>
            <Link
              href={`/${lang}/authors`}
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <Users className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              {dict.authors}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu lang={lang} dictionary={dict} isRtl={isRtl} />
          </div>
        </div>
      </div>
    </header>
  );
}
