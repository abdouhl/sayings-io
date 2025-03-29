"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Twitter, Facebook, Linkedin, Check } from "lucide-react"

interface ShareButtonsProps {
  quoteText: string
  authorName: string
  quoteUrl: string
  dictionary: {
    copyToClipboard?: string
    copied?: string
    shareOnTwitter?: string
    shareOnFacebook?: string
    shareOnLinkedIn?: string
    share?: string
    [key: string]: string | undefined
  }
}

export function ShareButtons({ quoteText, authorName, quoteUrl, dictionary }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  // Provide fallbacks for missing dictionary entries
  const dict = {
    copyToClipboard: dictionary?.copyToClipboard || "Copy to clipboard",
    copied: dictionary?.copied || "Copied!",
    shareOnTwitter: dictionary?.shareOnTwitter || "Share on Twitter",
    shareOnFacebook: dictionary?.shareOnFacebook || "Share on Facebook",
    shareOnLinkedIn: dictionary?.shareOnLinkedIn || "Share on LinkedIn",
    share: dictionary?.share || "Share",
  }

  const copyToClipboard = () => {
    const textToCopy = `"${quoteText}" — ${authorName}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`"${quoteText}" — ${authorName}`)
    const url = encodeURIComponent(quoteUrl)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(quoteUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent(`"${quoteText}" — ${authorName}`)
    const url = encodeURIComponent(quoteUrl)
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, "_blank")
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">{dict.share}</h3>
      <div className="flex flex-wrap justify-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={copyToClipboard}
                aria-label={dict.copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? dict.copied : dict.copyToClipboard}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border-[#1DA1F2]/20"
                onClick={shareOnTwitter}
                aria-label={dict.shareOnTwitter}
              >
                <Twitter className="h-4 w-4 text-[#1DA1F2]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dict.shareOnTwitter}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-[#4267B2]/10 hover:bg-[#4267B2]/20 border-[#4267B2]/20"
                onClick={shareOnFacebook}
                aria-label={dict.shareOnFacebook}
              >
                <Facebook className="h-4 w-4 text-[#4267B2]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dict.shareOnFacebook}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border-[#0A66C2]/20"
                onClick={shareOnLinkedIn}
                aria-label={dict.shareOnLinkedIn}
              >
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dict.shareOnLinkedIn}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

