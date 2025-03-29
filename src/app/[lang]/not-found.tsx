import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/dictionaries"

interface NotFoundProps {
  params: { lang: string }
}

export default async function NotFound({ params }: NotFoundProps) {
  const awaitedParams = await params; // Ensure params is awaited first
  const { lang = "en" } = awaitedParams ?? {};
  const dict = await getDictionary(lang)

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">{dict.notFound?.title || "Page Not Found"}</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {dict.notFound?.message || "The page you are looking for doesn't exist or has been moved."}
      </p>
      <Link href={`/${lang}`}>
        <Button>{dict.navigation?.backToHome || "Go back home"}</Button>
      </Link>
    </div>
  )
}

