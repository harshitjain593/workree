"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Mail, Phone, Download, Star, Search } from "lucide-react"

// Mock job data
const mockJob = {
  id: "job1",
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  postedDate: "2023-05-15",
  applications: 24,
  status: "active",
}

// Mock applicants data
const mockApplicants = [
  {
    id: "app1",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=60&width=60",
    appliedDate: "2023-05-20",
    status: "pending",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    education: "BS Computer Science, Stanford University",
    summary: "Experienced frontend developer with expertise in React and modern web technologies.",
    rating: 4.8,
    portfolioUrl: "https://alice-portfolio.com",
    resumeUrl: "/resumes/alice-johnson.pdf",
  },
  {
    id: "app2",
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    location: "Remote",
    avatar: "/placeholder.svg?height=60&width=60",
    appliedDate: "2023-05-19",
    status: "shortlisted",
    experience: "7+ years",
    skills: ["React", "Vue.js", "JavaScript", "CSS"],
    education: "MS Computer Science, MIT",
    summary: "Full-stack developer with strong frontend skills and leadership experience.",
    rating: 4.9,
    portfolioUrl: "https://bob-portfolio.com",
    resumeUrl: "/resumes/bob-smith.pdf",
  },
  {
    id: "app3",
    name: "Carol Williams",
    email: "carol.williams@email.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=60&width=60",
    appliedDate: "2023-05-18",
    status: "interviewed",
    experience: "4+ years",
    skills: ["React", "Angular", "TypeScript", "Redux"],
    education: "BS Software Engineering, Carnegie Mellon",
    summary: "Creative frontend developer with a passion for user experience and modern design.",
    rating: 4.7,
    portfolioUrl: "https://carol-portfolio.com",
    resumeUrl: "/resumes/carol-williams.pdf",
  },
  {
    id: "app4",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=60&width=60",
    appliedDate: "2023-05-17",
    status: "rejected",
    experience: "3+ years",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    education: "BS Computer Science, UT Austin",
    summary: "Junior frontend developer eager to grow and learn new technologies.",
    rating: 4.5,
    portfolioUrl: "https://david-portfolio.com",
    resumeUrl: "/resumes/david-brown.pdf",
  },
]

export default function JobApplicantsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [job, setJob] = useState(mockJob)
  const [applicants, setApplicants] = useState(mockApplicants)
  const [filteredApplicants, setFilteredApplicants] = useState(mockApplicants)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "company_admin") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router, user])

  useEffect(() => {
    let filtered = applicants

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (applicant) =>
          applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((applicant) => applicant.status === statusFilter)
    }

    setFilteredApplicants(filtered)
  }, [applicants, searchTerm, statusFilter])

  const handleStatusChange = (applicantId: string, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((applicant) => (applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "shortlisted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "interviewed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "hired":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const statusCounts = {
    all: applicants.length,
    pending: applicants.filter((a) => a.status === "pending").length,
    shortlisted: applicants.filter((a) => a.status === "shortlisted").length,
    interviewed: applicants.filter((a) => a.status === "interviewed").length,
    hired: applicants.filter((a) => a.status === "hired").length,
    rejected: applicants.filter((a) => a.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={() => router.back()}>
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{job.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {job.company} • {job.location} • {job.applications} applications
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applicants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications ({statusCounts.all})</SelectItem>
                  <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted ({statusCounts.shortlisted})</SelectItem>
                  <SelectItem value="interviewed">Interviewed ({statusCounts.interviewed})</SelectItem>
                  <SelectItem value="hired">Hired ({statusCounts.hired})</SelectItem>
                  <SelectItem value="rejected">Rejected ({statusCounts.rejected})</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applicants List */}
        <div className="space-y-6">
          {filteredApplicants.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No applicants found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria or check back later for new applications.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredApplicants.map((applicant) => (
              <Card key={applicant.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Applicant Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                        <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{applicant.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {applicant.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Applied {new Date(applicant.appliedDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                {applicant.rating}
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(applicant.status)}>
                            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                          </Badge>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-3">{applicant.summary}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1">Experience</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{applicant.experience}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1">Education</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{applicant.education}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {applicant.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {applicant.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {applicant.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 lg:w-48">
                      <Select
                        value={applicant.status}
                        onValueChange={(value) => handleStatusChange(applicant.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="shortlisted">Shortlisted</SelectItem>
                          <SelectItem value="interviewed">Interviewed</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-1" />
                        Download Resume
                      </Button>

                      <Button variant="outline" size="sm" className="w-full">
                        View Portfolio
                      </Button>

                      <Button size="sm" className="w-full bg-[#0077B5] hover:bg-[#005885]">
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
