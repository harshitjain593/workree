import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TeamNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Team Not Found</h1>
        <p className="text-muted-foreground">The team you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/teams">Back to Teams</Link>
        </Button>
      </div>
    </div>
  )
}
