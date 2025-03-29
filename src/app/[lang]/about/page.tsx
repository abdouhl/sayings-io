import { getDictionary } from "@/dictionaries"
import { Quote, CheckCircle } from "lucide-react"
import type { Metadata, ResolvingMetadata } from 'next'
 
type AboutPageProps = {
  params: Promise<{ lang: string }>
}
 
export async function generateMetadata(
  { params }: AboutPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  return {
    title: dict.about.title,
    description: dict.about.description,
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)
  const isRtl = lang === "ar"

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-4 rounded-full">
            <Quote className="h-8 w-8 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">{dict.about.title}</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{dict.about.description}</p>

        <div className="space-y-16">
          {/* Mission Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{dict.about.mission}</h2>
            <p className="text-muted-foreground">{dict.about.missionText}</p>
          </section>

          {/* Story Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{dict.about.story}</h2>
            <p className="text-muted-foreground">{dict.about.storyText}</p>
          </section>

          {/* Values Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">{dict.about.values}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-card border rounded-lg p-6">
                <div className={`flex items-center gap-2 mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">{dict.about.value1Title}</h3>
                </div>
                <p className="text-muted-foreground">{dict.about.value1Text}</p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className={`flex items-center gap-2 mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">{dict.about.value2Title}</h3>
                </div>
                <p className="text-muted-foreground">{dict.about.value2Text}</p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className={`flex items-center gap-2 mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">{dict.about.value3Title}</h3>
                </div>
                <p className="text-muted-foreground">{dict.about.value3Text}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

