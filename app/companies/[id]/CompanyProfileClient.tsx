"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Globe, Calendar, Users, ExternalLink, BriefcaseBusiness, Mail, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import { fetchCompanyById } from "@/lib/api/companies"

export default async function CompanyProfileClient({ id }: { id: string }) {
  let company
  try {
    company = await fetchCompanyById(id)
  } catch (error) {
    notFound()
  }

  // Fetch jobs from this company (mock data)
  const companyJobs = [
    {
      id: "job1",
      title: "Senior Frontend Developer",
      location: company.location,
      type: "Full-time",
      postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      id: "job2",
      title: "UX Designer",
      location: company.location,
      type: "Full-time",
      postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    },
    {
      id: "job3",
      title: "DevOps Engineer",
      location: "Remote",
      type: "Contract",
      postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Company Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border-2 border-background bg-background flex-shrink-0">
              <Image src={company.logo || "/placeholder.svg"} alt={company.name} fill className="object-cover" />
            </div>

            <div className="space-y-2 flex-1">
              <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
              <p className="text-xl text-muted-foreground">{company.industry}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {company.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{company.location}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Founded {company.founded}</span>
                </div>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#0077B5] hover:underline"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="specialties">Specialties</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">About {company.name}</h2>
                <p className="text-muted-foreground whitespace-pre-line">{company.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Open Positions ({companyJobs.length})</h2>
              <div className="space-y-4">
                {companyJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="block border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">{job.title}</h3>
                    <div className="flex flex-wrap gap-y-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center mr-4">
                        <Building2 className="h-4 w-4 mr-1" />
                        <span>{company.name}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <BriefcaseBusiness className="h-4 w-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      Posted {new Date(job.postedAt).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => (window.location.href = `/jobs?company=${encodeURIComponent(company.name)}`)}
                >
                  View all jobs at {company.name}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="specialties" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {company.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-[#0077B5] hover:bg-[#005885]">
                <Mail className="mr-2 h-4 w-4" />
                Contact Company
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share Profile
              </Button>
              {company.website && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Companies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    href={`/companies/company${i + 1}`}
                    className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
                  >
                    <div className="relative h-10 w-10 rounded-md overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={`Similar Company ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">
                        {i === 0 ? "Digital Innovations" : i === 1 ? "Tech Solutions" : "Future Systems"}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {company.industry} • {i === 0 ? "New York" : i === 1 ? "San Francisco" : "Remote"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
