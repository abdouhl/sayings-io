import { getDictionary } from "@/dictionaries"
import { ContactForm } from "@/components/contact-form"
import { Mail, Twitter, Facebook, Linkedin } from "lucide-react"
import type { Metadata, ResolvingMetadata } from 'next'
 
type ContactPageProps = {
  params: Promise<{ lang: string}>
}
 

export async function generateMetadata(
  { params }: ContactPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  return {
    title: dict.contact.title,
    description: dict.contact.description,
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)
  const isRtl = lang === "ar"

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">{dict.contact.title}</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{dict.contact.description}</p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">{dict.contact.getInTouch}</h2>
            <p className="text-muted-foreground mb-6">{dict.contact.getInTouchText}</p>

            <ContactForm dictionary={dict.contact} lang={lang} />
          </div>

          <div>
            <div className="bg-card border rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">{dict.contact.contactInfo}</h2>

              <div className={`flex items-center gap-3 mb-4 ${isRtl ? "flex-row-reverse text-right" : ""}`}>
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="font-medium">{dict.contact.email}</div>
                  <a href="mailto:hello@sayings.com" className="text-muted-foreground hover:text-primary">
                    {dict.contact.emailAddress}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{dict.contact.followUs}</h2>
              <p className="text-muted-foreground mb-4">{dict.contact.socialText}</p>

              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 p-3 rounded-full"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4267B2]/10 hover:bg-[#4267B2]/20 p-3 rounded-full"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-[#4267B2]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 p-3 rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

