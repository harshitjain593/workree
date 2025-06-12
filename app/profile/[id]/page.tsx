"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Phone,
  FileText,
  MapPin,
  Building,
  Clock,
  Mail,
  Edit,
  Download,
  Share2,
  Plus,
} from "lucide-react"

// Mock data for profile view
const mockProfiles = [
  {
    id: "profile1",
    userId: "user1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    headline: "Senior Frontend Developer with 5+ years of experience in React and Next.js",
    about:
      "I'm a passionate frontend developer with expertise in building responsive and user-friendly web applications. I specialize in React, Next.js, and TypeScript, with a strong focus on creating accessible and performant user interfaces.",
    skills: [
      { id: "javascript", name: "JavaScript" },
      { id: "react", name: "React" },
      { id: "next-js", name: "Next.js" },
      { id: "typescript", name: "TypeScript" },
      { id: "node-js", name: "Node.js" },
      { id: "tailwind", name: "Tailwind CSS" },
      { id: "redux", name: "Redux" },
      { id: "graphql", name: "GraphQL" },
    ],
    currentCompany: "Tech Solutions Inc.",
    noticePeriod: "30 Days",
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      timeSlots: ["Morning (9AM-12PM)", "Afternoon (12PM-3PM)"],
    },
    projects: [
      {
        id: "project1",
        title: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform with React, Next.js, and Node.js. Implemented features like product search, filtering, cart management, and payment processing.",
        technologies: ["React", "Next.js", "Node.js", "MongoDB"],
        url: "https://example.com/project1",
      },
      {
        id: "project2",
        title: "Task Management App",
        description:
          "Developed a task management application with real-time updates. Features include task creation, assignment, status tracking, and team collaboration.",
        technologies: ["React", "Firebase", "Tailwind CSS"],
        url: "https://example.com/project2",
      },
    ],
    experience: [
      {
        id: "exp1",
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "2021-03",
        endDate: null,
        description:
          "Leading frontend development for multiple client projects. Implementing best practices for code quality and performance optimization.",
      },
      {
        id: "exp2",
        title: "Frontend Developer",
        company: "Digital Innovations",
        location: "San Francisco, CA",
        startDate: "2018-06",
        endDate: "2021-02",
        description:
          "Developed and maintained web applications for clients in various industries. Collaborated with designers and backend developers to deliver high-quality products.",
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "2014-09",
        endDate: "2018-05",
      },
    ],
    certifications: [
      {
        id: "cert1",
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2022-01",
      },
      {
        id: "cert2",
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2021-06",
      },
    ],
    languages: [
      { language: "English", proficiency: "Native" },
      { language: "Spanish", proficiency: "Intermediate" },
    ],
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-04-20T14:45:00Z",
  },
  {
    id: "profile2",
    userId: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    headline: "Technical Recruiter at Innovate Labs | Connecting top talent with great opportunities",
    about:
      "Experienced technical recruiter with a passion for matching talented professionals with their dream roles. I specialize in recruiting for software development, data science, and product management positions.",
    skills: [
      { id: "technical-recruiting", name: "Technical Recruiting" },
      { id: "talent-acquisition", name: "Talent Acquisition" },
      { id: "interview-coordination", name: "Interview Coordination" },
      { id: "candidate-sourcing", name: "Candidate Sourcing" },
      { id: "hr-management", name: "HR Management" },
    ],
    currentCompany: "Innovate Labs",
    experience: [
      {
        id: "exp1",
        title: "Technical Recruiter",
        company: "Innovate Labs",
        location: "New York, NY",
        startDate: "2020-01",
        endDate: null,
        description:
          "Leading technical recruitment for engineering and product teams. Developed and implemented new recruitment strategies that increased qualified candidate pipeline by 40%.",
      },
      {
        id: "exp2",
        title: "HR Specialist",
        company: "Global Tech Solutions",
        location: "Boston, MA",
        startDate: "2017-03",
        endDate: "2019-12",
        description:
          "Managed full-cycle recruitment for technical roles. Coordinated interviews and provided support to hiring managers.",
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "Bachelor of Arts in Human Resources Management",
        institution: "New York University",
        location: "New York, NY",
        startDate: "2013-09",
        endDate: "2017-05",
      },
    ],
    certifications: [
      {
        id: "cert1",
        name: "Professional in Human Resources (PHR)",
        issuer: "HR Certification Institute",
        date: "2019-05",
      },
    ],
    languages: [
      { language: "English", proficiency: "Native" },
      { language: "French", proficiency: "Intermediate" },
    ],
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-04-15T11:30:00Z",
  },
]

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { profile } = useSelector((state: RootState) => state.profile)

  const [profileData, setProfileData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCurrentUser, setIsCurrentUser] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Check if viewing own profile
    const profileId = params.id as string
    if (profileId === "me" || (profile && profileId === profile.id)) {
      setIsCurrentUser(true)

      if (profile) {
        // Use Redux profile if available
        setProfileData(profile)
      } else {
        // Use mock data for current user
        const mockProfile = mockProfiles.find((p) => p.userId === user?.id) || mockProfiles[0]
        setProfileData(mockProfile)
      }
    } else {
      // Fetch profile data for the given ID
      // In a real app, we would make an API call
      setIsCurrentUser(false)
      const mockProfile = mockProfiles.find((p) => p.id === profileId) || mockProfiles[0]
      setProfileData(mockProfile)
    }

    setIsLoading(false)
  }, [isAuthenticated, params.id, profile, router, user])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077B5]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-0">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-[#0077B5] to-[#00a0dc] relative">
            {isCurrentUser && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="px-6 pb-6 relative">
            {/* Profile Picture */}
            <Avatar className="h-32 w-32 absolute -top-16 border-4 border-white">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt={profileData.name} />
              <AvatarFallback className="text-4xl">{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex justify-end mt-4 mb-6">
              {isCurrentUser ? (
                <Button asChild className="bg-[#0077B5] hover:bg-[#005885]">
                  <Link href="/profile">Edit Profile</Link>
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button className="bg-[#0077B5] hover:bg-[#005885]">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{profileData.headline}</p>

              <div className="flex flex-wrap gap-y-2 mt-3 text-sm text-gray-600">
                {profileData.location && (
                  <div className="flex items-center mr-6">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profileData.location}</span>
                  </div>
                )}
                {profileData.currentCompany && (
                  <div className="flex items-center mr-6">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{profileData.currentCompany}</span>
                  </div>
                )}
                {profileData.email && (
                  <div className="flex items-center mr-6">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{profileData.email}</span>
                  </div>
                )}
                {profileData.noticePeriod && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Notice: {profileData.noticePeriod}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">{profileData.about}</p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience</CardTitle>
              {isCurrentUser && (
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {profileData.experience?.length > 0 ? (
                <div className="space-y-6">
                  {profileData.experience.map((exp: any) => (
                    <div key={exp.id} className="flex">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                          <Building className="h-6 w-6 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-gray-600">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </p>
                        <p className="mt-2 text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No experience listed yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              {isCurrentUser && (
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {profileData.education?.length > 0 ? (
                <div className="space-y-6">
                  {profileData.education.map((edu: any) => (
                    <div key={edu.id} className="flex">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                          <FileText className="h-6 w-6 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{edu.institution}</h3>
                        <p className="text-gray-600">{edu.degree}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                        {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No education listed yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Projects */}
          {profileData.projects?.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Projects</CardTitle>
                {isCurrentUser && (
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profileData.projects.map((project: any) => (
                    <div key={project.id}>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-gray-700 mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0077B5] hover:underline mt-2 inline-block text-sm"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Skills</span>
                {isCurrentUser && (
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills?.map((skill: any) => (
                  <Badge key={skill.id} variant="outline" className="bg-gray-50">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          {profileData.availability && (
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Days Available</h4>
                    <div className="flex flex-wrap gap-2">
                      {profileData.availability.days.map((day: string) => (
                        <Badge key={day} variant="outline">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Time Slots</h4>
                    <div className="flex flex-wrap gap-2">
                      {profileData.availability.timeSlots.map((slot: string) => (
                        <Badge key={slot} variant="outline">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certifications */}
          {profileData.certifications?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.certifications.map((cert: any) => (
                    <div key={cert.id}>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-gray-600">
                        {cert.issuer} • {formatDate(cert.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Languages */}
          {profileData.languages?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profileData.languages.map((lang: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{lang.language}</span>
                      <span className="text-gray-500">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profile Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                {isCurrentUser && (
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
