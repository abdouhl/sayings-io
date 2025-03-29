import { getDictionary } from "@/dictionaries"
import type { Metadata, ResolvingMetadata } from 'next'
 
type TermsPageProps = {
  params: Promise<{ lang: string}>
}
 

export async function generateMetadata(
  { params }: TermsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  return {
    title: dict.terms.title,
    description: dict.terms.description,
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">{dict.terms.title}</h1>
        <p className="text-center text-muted-foreground mb-8">{dict.terms.description}</p>

        <div className="text-sm text-muted-foreground text-center mb-12">
          {dict.terms.lastUpdated}: {new Date().toLocaleDateString()}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">{dict.terms.acceptance}</h2>
            <p className="text-muted-foreground">{dict.terms.acceptanceText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.terms.intellectualProperty}</h2>
            <p className="text-muted-foreground">{dict.terms.intellectualPropertyText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.terms.userContent}</h2>
            <p className="text-muted-foreground">{dict.terms.userContentText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.terms.prohibitedUses}</h2>
            <p className="text-muted-foreground">{dict.terms.prohibitedUsesText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.terms.disclaimer}</h2>
            <p className="text-muted-foreground">{dict.terms.disclaimerText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.terms.limitation}</h2>
            <p className="text-muted-foreground">{dict.terms.limitationText}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{dict.terms.changes}</h2>
            <p className="text-muted-foreground">{dict.terms.changesText}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

