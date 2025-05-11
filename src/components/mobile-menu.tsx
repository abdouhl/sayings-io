"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Home, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  lang: string;
  isRtl?: boolean;
  dictionary: {
    home: string;
    authors: string;
    allAuthors: string;
    backToHome: string;
    tags?: {
      allTags: string;
    };
  };
}

export function MobileMenu({
  lang,
  dictionary,
  isRtl = false,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isRtl ? "left" : "right"}
        className="w-[250px] sm:w-[300px]"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className={isRtl ? "text-right" : "text-left"}>
            Sayings
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          <Link
            href={`/${lang}`}
            className={`flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors ${isRtl ? "flex-row-reverse text-right" : ""}`}
            onClick={closeMenu}
          >
            <Home className="h-4 w-4" />
            <span>{dictionary.home}</span>
          </Link>
          <Link
            href={`/${lang}/authors`}
            className={`flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors ${isRtl ? "flex-row-reverse text-right" : ""}`}
            onClick={closeMenu}
          >
            <Users className="h-4 w-4" />
            <span>{dictionary.authors}</span>
          </Link>
          <Link
            href={`/${lang}/tags`}
            className={`flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors ${isRtl ? "flex-row-reverse text-right" : ""}`}
            onClick={closeMenu}
          >
            <Tag className="h-4 w-4" />
            <span>{dictionary.tags?.allTags || "Topics"}</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
