import { Suspense } from "react"
import { getTeams } from "@/lib/api/teams"
import TeamsList from "@/components/teams/teams-list"
import TeamsFilters from "@/components/teams/teams-filters"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Teams | Job Portal",
  description: "Find the perfect team for your project or join an existing team",
}

export default async function TeamsPage() {
  const teams = await getTeams()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Find the perfect team for your project or join an existing team</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <TeamsFilters />
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<TeamsSkeleton />}>
              <TeamsList teams={teams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function TeamsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card shadow-sm">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-6 w-16 rounded-full" />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
