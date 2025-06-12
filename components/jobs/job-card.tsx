"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, DollarSign, BookmarkPlus, BookmarkCheck } from "lucide-react"
import Link from "next/link"
import type { Job } from "@/types/job"

interface JobCardProps {
  job: Job
  isSaved: boolean
  onSave: () => void
}

export default function JobCard({ job, isSaved, onSave }: JobCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
            <p className="text-gray-600">{job.company.name}</p>
          </div>
          <img
            src={job.company.logo || "/placeholder.svg?height=40&width=40"}
            alt={job.company.name}
            className="w-12 h-12 object-contain"
          />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Posted {job.postedAt}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && <Badge variant="outline">+{job.skills.length - 3} more</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onSave}>
          {isSaved ? (
            <BookmarkCheck className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <BookmarkPlus className="h-4 w-4 mr-2" />
          )}
          {isSaved ? "Saved" : "Save"}
        </Button>
        <Button asChild size="sm" className="bg-[#0077B5] hover:bg-[#005885]">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
