"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, DollarSign, BookmarkPlus, BookmarkCheck } from "lucide-react"
import Link from "next/link"
import type { Job } from "@/types/job"

interface JobListItemProps {
  job: Job
  isSaved: boolean
  onSave: () => void
}

export default function JobListItem({ job, isSaved, onSave }: JobListItemProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.company.name}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onSave} className="h-8">
                  {isSaved ? (
                    <BookmarkCheck className="h-4 w-4 mr-1 text-green-500" />
                  ) : (
                    <BookmarkPlus className="h-4 w-4 mr-1" />
                  )}
                  <span className="sr-only md:not-sr-only md:inline-block">{isSaved ? "Saved" : "Save"}</span>
                </Button>
                <Button asChild size="sm" className="bg-[#0077B5] hover:bg-[#005885] h-8">
                  <Link href={`/jobs/${job.id}`}>Apply</Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Posted {job.postedAt}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {job.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>

          <div className="hidden md:block ml-4">
            <img
              src={job.company.logo || "/placeholder.svg?height=40&width=40"}
              alt={job.company.name}
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
