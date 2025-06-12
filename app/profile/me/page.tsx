"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Briefcase,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Languages,
  Clock,
  Edit,
  Download,
  Share2,
  FileText,
  Globe,
  Mail,
  Phone,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { profile } = useSelector((state: RootState) => state.profile)

  const [profileStrength, setProfileStrength] = useState(0)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (!profile) {
      router.push("/profile")
    }
  }, [isAuthenticated, profile, router])

  useEffect(() => {
    if (profile) {
      // Calculate profile strength based on completeness
      let strength = 0

      // Basic info - 20%
      if (profile.name) strength += 5
      if (profile.email) strength += 5
      if (profile.phone) strength += 5
      if (profile.location) strength += 5

      // Skills - 20%
      if (profile.skills?.length > 0) {
        strength += Math.min(20, profile.skills.length * 2)
      }

      // Experience - 20%
      if (profile.experience?.length > 0) {
        strength += Math.min(20, profile.experience.length * 10)
      }

      // Education - 15%
      if (profile.education?.length > 0) {
        strength += Math.min(15, profile.education.length * 7.5)
      }

      // Projects - 15%
      if (profile.projects?.length > 0) {
        strength += Math.min(15, profile.projects.length * 5)
      }

      // Additional info - 10%
      if (profile.certifications?.length > 0) strength += 5
      if (profile.languages?.length > 0) strength += 5

      setProfileStrength(strength)
    }
  }, [profile])

  if (!profile) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[#0077B5] to-[#0a66c2]"></div>
            <CardContent className="pt-0 relative">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <Avatar className="h-32 w-32 border-4 border-white">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt={profile.name} />
                  <AvatarFallback className="text-4xl">{profile.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              <div className="mt-20 text-center">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-gray-600 mt-1">{profile.headline || "Professional Title"}</p>
                <div className="flex items-center justify-center mt-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{profile.location || "Location"}</span>
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                  <Button asChild>
                    <Link href="/profile">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profile.phone}</span>
                    </div>
                    {profile.website && (
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={profile.website} className="text-[#0077B5] hover:underline">
                          {profile.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Profile Strength</h3>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>
                        {profileStrength < 40 ? "Beginner" : profileStrength < 70 ? "Intermediate" : "All-Star"}
                      </span>
                      <span>{profileStrength}%</span>
                    </div>
                    <Progress value={profileStrength} className="h-2" />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Current Status</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profile.currentCompany ? `Working at ${profile.currentCompany}` : "Not specified"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Notice Period: {profile.noticePeriod || "Not specified"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.length > 0 ? (
                  profile.skills.map((skill: any) => (
                    <Badge key={skill.id} variant="secondary" className="px-3 py-1">
                      {skill.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No skills added yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Languages</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.languages?.length > 0 ? (
                <div className="space-y-3">
                  {profile.languages.map((language: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Languages className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{language.language}</span>
                      </div>
                      <Badge variant="outline">{language.proficiency}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No languages added yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Days Available</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.availability?.days?.length > 0 ? (
                      profile.availability.days.map((day: string) => (
                        <Badge key={day} variant="outline">
                          {day}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No availability set</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700">Time Slots</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.availability?.timeSlots?.length > 0 ? (
                      profile.availability.timeSlots.map((slot: string) => (
                        <Badge key={slot} variant="outline">
                          {slot}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No time slots set</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.about ? (
                <p className="text-gray-700">{profile.about}</p>
              ) : (
                <p className="text-gray-500">No information provided</p>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.experience?.length > 0 ? (
                    <div className="space-y-6">
                      {profile.experience.map((exp: any, index: number) => (
                        <div
                          key={index}
                          className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0"
                        >
                          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[#0077B5] border-2 border-white"></div>
                          <div>
                            <h3 className="font-bold text-gray-900">{exp.title}</h3>
                            <div className="flex items-center text-gray-600 mt-1">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{exp.company}</span>
                              {exp.location && (
                                <>
                                  <span className="mx-2">•</span>
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{exp.location}</span>
                                </>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 inline mr-1" />
                              {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}{" "}
                              -{" "}
                              {exp.endDate
                                ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                                : "Present"}
                            </div>
                            {exp.description && <p className="mt-3 text-gray-700">{exp.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No work experience added yet</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link href="/profile">Add Experience</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.education?.length > 0 ? (
                    <div className="space-y-6">
                      {profile.education.map((edu: any, index: number) => (
                        <div
                          key={index}
                          className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0"
                        >
                          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[#0077B5] border-2 border-white"></div>
                          <div>
                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                            <div className="flex items-center text-gray-600 mt-1">
                              <GraduationCap className="h-4 w-4 mr-1" />
                              <span>{edu.institution}</span>
                              {edu.location && (
                                <>
                                  <span className="mx-2">•</span>
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{edu.location}</span>
                                </>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 inline mr-1" />
                              {new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}{" "}
                              -{" "}
                              {edu.endDate
                                ? new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                                : "Present"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No education added yet</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link href="/profile">Add Education</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.projects?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.projects.map((project: any, index: number) => (
                        <Card key={index} className="overflow-hidden">
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {project.technologies.map((tech: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#0077B5] hover:underline inline-flex items-center"
                              >
                                <Globe className="h-3 w-3 mr-1" />
                                View Project
                              </a>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No projects added yet</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link href="/profile">Add Projects</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.certifications?.length > 0 ? (
                    <div className="space-y-4">
                      {profile.certifications.map((cert: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <Award className="h-5 w-5 text-[#0077B5]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{cert.name}</h3>
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Issued{" "}
                              {new Date(cert.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No certifications added yet</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link href="/profile">Add Certifications</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Job Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Job Types</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Full-time</Badge>
                      <Badge variant="outline">Remote</Badge>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Salary Expectation</h3>
                    <p className="text-gray-700">$80,000 - $120,000 per year</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Preferred Locations</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Remote</Badge>
                      <Badge variant="outline">New York</Badge>
                      <Badge variant="outline">San Francisco</Badge>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Notice Period</h3>
                    <p className="text-gray-700">{profile.noticePeriod || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button asChild>
                    <Link href="/profile">Update Job Preferences</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
