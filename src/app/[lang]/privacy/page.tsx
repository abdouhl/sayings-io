import { getDictionary } from "@/dictionaries"
import type { Metadata, ResolvingMetadata } from 'next'
 
type PrivacyPageProps = {
  params: Promise<{ lang: string}>
}
 

export async function generateMetadata(
  { params }: PrivacyPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  return {
    title: dict.privacy.title,
    description: dict.privacy.description,
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">{dict.privacy.title}</h1>
        <p className="text-center text-muted-foreground mb-8">{dict.privacy.description}</p>

        <div className="text-sm text-muted-foreground text-center mb-12">
          {dict.privacy.lastUpdated}: {new Date().toLocaleDateString()}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">{dict.privacy.introduction}</h2>
            <p className="text-muted-foreground">{dict.privacy.introductionText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.privacy.informationWeCollect}</h2>
            <p className="text-muted-foreground">{dict.privacy.informationWeCollectText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.privacy.howWeUseInformation}</h2>
            <p className="text-muted-foreground">{dict.privacy.howWeUseInformationText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.privacy.cookies}</h2>
            <p className="text-muted-foreground">{dict.privacy.cookiesText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.privacy.dataProtection}</h2>
            <p className="text-muted-foreground">{dict.privacy.dataProtectionText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.privacy.thirdPartyLinks}</h2>
            <p className="text-muted-foreground">{dict.privacy.thirdPartyLinksText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.privacy.changesPolicy}</h2>
            <p className="text-muted-foreground">{dict.privacy.changesPolicyText}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

