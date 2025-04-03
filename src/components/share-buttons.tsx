"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Twitter, Facebook, Linkedin, Check } from "lucide-react"

interface ShareButtonsProps {
  quoteText: string
  authorName: string
  quoteUrl: string
  lang: string
  dictionary: {
    copyToClipboard?: string
    copied?: string
    shareOnTwitter?: string
    shareOnFacebook?: string
    shareOnLinkedIn?: string
    shareOnPinterest?: string
    downloadImage?: string
    share?: string
    [key: string]: string | undefined
  }
}

export function ShareButtons({ quoteText, authorName, quoteUrl, lang, dictionary }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Provide fallbacks for missing dictionary entries
  const dict = {
    copyToClipboard: dictionary?.copyToClipboard || "Copy to clipboard",
    copied: dictionary?.copied || "Copied!",
    shareOnTwitter: dictionary?.shareOnTwitter || "Share on Twitter",
    shareOnFacebook: dictionary?.shareOnFacebook || "Share on Facebook",
    shareOnLinkedIn: dictionary?.shareOnLinkedIn || "Share on LinkedIn",
    shareOnPinterest: dictionary?.shareOnPinterest || "Save to Pinterest",
    downloadImage: dictionary?.downloadImage || "Download as image",
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

  const shareOnPinterest = () => {
    const description = encodeURIComponent(`"${quoteText}" — ${authorName}`)
    const url = encodeURIComponent(quoteUrl)
    // Use the OpenGraph image URL for Pinterest
    const ogImageUrl = encodeURIComponent(`${quoteUrl}/opengraph-image`)
    window.open(
      `https://pinterest.com/pin/create/button/?url=${url}&media=${ogImageUrl}&description=${description}`,
      "_blank",
    )
  }

  const downloadImage = async () => {
    try {
      setIsDownloading(true)

      // Extract the quote ID from the URL
      const quoteId = quoteUrl.split("/").pop() || "quote"

      // Use the Twitter image URL
      const imageUrl = `/${lang}/quotes/${quoteId}/twitter-image`

      // Fetch the image
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      }

      const blob = await response.blob()

      // Create a download link
      const downloadLink = document.createElement("a")
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.download = `quote-${quoteId}.png`

      // Trigger the download
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      // Clean up
      URL.revokeObjectURL(downloadLink.href)
    } catch (error) {
      console.error("Error downloading image:", error)
      alert("Failed to download image. Please try again.")
    } finally {
      setIsDownloading(false)
    }
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

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-[#E60023]/10 hover:bg-[#E60023]/20 border-[#E60023]/20"
                onClick={shareOnPinterest}
                aria-label={dict.shareOnPinterest}
              >
                <svg
                  className="h-4 w-4 text-[#E60023]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dict.shareOnPinterest}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20"
                onClick={downloadImage}
                disabled={isDownloading}
                aria-label={dict.downloadImage}
              >
                {isDownloading ? (
                  <svg className="h-4 w-4 text-purple-500 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 text-purple-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dict.downloadImage}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}