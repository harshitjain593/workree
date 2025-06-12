"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { fetchJobById } from "@/lib/api/jobs"
import type { Job } from "@/types/job"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Calendar,
  Users,
  Share2,
  Bookmark,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

export default function JobDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await fetchJobById(id as string)
        setJob(jobData)
      } catch (error) {
        console.error("Error fetching job details:", error)
        toast({
          title: "Error",
          description: "Failed to load job details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchJob()
    }
  }, [id, toast])

  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully!",
    })
  }

  const handleSave = () => {
    toast({
      title: "Job Saved",
      description: "This job has been saved to your profile.",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link Copied",
      description: "Job link copied to clipboard!",
    })
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/jobs")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Header */}
          <Card className="overflow-hidden">
            <div className="bg-primary/10 p-6">
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-white p-2 flex items-center justify-center">
                  <Image
                    src={job.company.logo || "/placeholder.svg?height=64&width=64"}
                    alt={job.company.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Building2 className="h-4 w-4 mr-1" />
                    <span>{job.company.name}</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{job.experienceLevel}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Posted {job.postedAt}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{job.applicants} applicants</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleApply} className="flex-1">
                  Apply Now
                </Button>
                <Button variant="outline" onClick={handleSave}>
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">{job.description}</p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.responsibilities?.map((item, index) => <li key={index}>{item}</li>) || (
                    <>
                      <li>Design and implement new features and functionality</li>
                      <li>Build reusable code and libraries for future use</li>
                      <li>Optimize application for maximum speed and scalability</li>
                      <li>Collaborate with other team members and stakeholders</li>
                    </>
                  )}
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.requirements?.map((item, index) => <li key={index}>{item}</li>) || (
                    <>
                      <li>
                        Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model
                      </li>
                      <li>Thorough understanding of React.js and its core principles</li>
                      <li>Experience with popular React.js workflows (such as Flux or Redux)</li>
                      <li>Familiarity with newer specifications of ECMAScript</li>
                    </>
                  )}
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Benefits</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.benefits?.map((item, index) => <li key={index}>{item}</li>) || (
                    <>
                      <li>Competitive salary</li>
                      <li>Health, dental, and vision insurance</li>
                      <li>401(k) plan with employer match</li>
                      <li>Flexible work schedule and remote work options</li>
                      <li>Professional development opportunities</li>
                    </>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Card */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">About the Company</h2>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-100 p-2 flex items-center justify-center">
                  <Image
                    src={job.company.logo || "/placeholder.svg?height=48&width=48"}
                    alt={job.company.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{job.company.name}</h3>
                  <p className="text-sm text-gray-500">{job.company.industry}</p>
                </div>
              </div>

              <p className="text-sm mb-4">
                {job.company.description || "A leading company in the industry focused on innovation and growth."}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{job.company.size || "51-200 employees"}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{job.company.location || job.location}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <Button variant="outline" className="w-full" asChild>
                <a href={`/company/${job.company.id}`} target="_blank" rel="noopener noreferrer">
                  View Company Profile
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-3 pb-4 last:pb-0 last:border-0 border-b">
                    <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100 p-1 flex items-center justify-center">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${i}`}
                        alt="Company logo"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">
                        <a href="#" className="hover:text-primary">
                          {job.title.split(" ").slice(0, -1).join(" ")}{" "}
                          {i === 1 ? "Developer" : i === 2 ? "Engineer" : "Specialist"}
                        </a>
                      </h3>
                      <p className="text-xs text-gray-500">Company {i}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
