"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Team } from "@/types/team"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { List, LayoutGrid } from "lucide-react"

interface TeamsListProps {
  teams: Team[]
}

export default function TeamsList({ teams }: TeamsListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{teams.length}</span> teams
        </p>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-secondary" : ""}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-secondary" : ""}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {teams.map((team) => (
            <TeamListItem key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  )
}

function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full bg-gradient-to-r from-primary/20 to-primary/10">
          <div className="absolute bottom-0 left-0 right-0 flex items-center p-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-background bg-background">
              <Image src={team.logo || "/placeholder.svg"} alt={team.name} fill className="object-cover" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg">{team.name}</h3>
              <p className="text-sm text-muted-foreground">{team.members.length} members</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{team.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {team.skills.slice(0, 5).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {team.skills.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{team.skills.length - 5} more
            </Badge>
          )}
        </div>
        <div className="flex items-center">
          {team.availability ? (
            <Badge
              variant={
                team.availability.status === "Available Immediately"
                  ? "success"
                  : team.availability.status === "Not Available"
                    ? "destructive"
                    : "outline"
              }
              className="text-xs"
            >
              {team.availability.status}
              {team.availability.availableFrom &&
                team.availability.status === "Available from Future Date" &&
                ` (${new Date(team.availability.availableFrom).toLocaleDateString()})`}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              Availability Unknown
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/teams/${team.id}`}>View Team Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function TeamListItem({ team }: { team: Team }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border bg-card shadow-sm">
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-background bg-background flex-shrink-0">
        <Image src={team.logo || "/placeholder.svg"} alt={team.name} fill className="object-cover" />
      </div>

      <div className="flex-1 space-y-2">
        <div>
          <h3 className="font-semibold text-lg">{team.name}</h3>
          <p className="text-sm text-muted-foreground">{team.members.length} members</p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{team.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {team.skills.slice(0, 5).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {team.skills.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{team.skills.length - 5} more
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 md:items-end">
        {team.availability ? (
          <Badge
            variant={
              team.availability.status === "Available Immediately"
                ? "success"
                : team.availability.status === "Not Available"
                  ? "destructive"
                  : "outline"
            }
            className="text-xs"
          >
            {team.availability.status}
            {team.availability.availableFrom &&
              team.availability.status === "Available from Future Date" &&
              ` (${new Date(team.availability.availableFrom).toLocaleDateString()})`}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs">
            Availability Unknown
          </Badge>
        )}

        <Button asChild>
          <Link href={`/teams/${team.id}`}>View Team Profile</Link>
        </Button>
      </div>
    </div>
  )
}
