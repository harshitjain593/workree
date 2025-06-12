"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { createProfile, getProfile, resetProfileState } from "@/redux/features/profileSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Plus, X, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock data
const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "Python",
  "Java",
  "C#",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "Redux",
  "Vue.js",
  "Angular",
]

const noticePeriodOptions = ["Immediate", "15 Days", "30 Days", "60 Days", "90 Days"]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const timeSlots = ["Morning (9AM-12PM)", "Afternoon (12PM-3PM)", "Evening (3PM-6PM)", "Night (6PM-9PM)"]

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { profile, loading, error, success } = useSelector((state: RootState) => state.profile)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    about: "",
    currentCompany: "",
    noticePeriod: "",
    skills: [] as string[],
    availability: {
      days: [] as string[],
      timeSlots: [] as string[],
    },
    projects: [] as { title: string; description: string; technologies: string[]; url?: string }[],
    experience: [] as {
      title: string
      company: string
      location: string
      startDate: string
      endDate: string | null
      description: string
    }[],
    education: [] as {
      degree: string
      institution: string
      location: string
      startDate: string
      endDate: string | null
    }[],
    certifications: [] as {
      name: string
      issuer: string
      date: string
    }[],
    languages: [] as {
      language: string
      proficiency: string
    }[],
  })

  const [currentSkill, setCurrentSkill] = useState("")
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    technologies: "",
    url: "",
  })

  const [currentExperience, setCurrentExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
  })

  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
  })

  const [currentCertification, setCurrentCertification] = useState({
    name: "",
    issuer: "",
    date: "",
  })

  const [currentLanguage, setCurrentLanguage] = useState({
    language: "",
    proficiency: "",
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user && !profile) {
      dispatch(getProfile(user.id))
    }
  }, [isAuthenticated, user, profile, router, dispatch])

  useEffect(() => {
    if (profile) {
      setHasProfile(true)
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        headline: profile.headline || "",
        about: profile.about || "",
        currentCompany: profile.currentCompany || "",
        noticePeriod: profile.noticePeriod || "",
        skills: profile.skills?.map((skill: any) => skill.name) || [],
        availability: profile.availability || { days: [], timeSlots: [] },
        projects: profile.projects || [],
        experience: profile.experience || [],
        education: profile.education || [],
        certifications: profile.certifications || [],
        languages: profile.languages || [],
      })
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }))
    }
  }, [profile, user])

  useEffect(() => {
    if (success) {
      router.push(`/profile/me`)
      dispatch(resetProfileState())
    }
  }, [success, router, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = () => {
    if (currentSkill && !formData.skills.includes(currentSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill],
      }))
      setCurrentSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleAvailabilityChange = (type: "days" | "timeSlots", value: string) => {
    const availability = { ...formData.availability }

    if (availability[type].includes(value)) {
      availability[type] = availability[type].filter((item) => item !== value)
    } else {
      availability[type] = [...availability[type], value]
    }

    setFormData((prev) => ({ ...prev, availability }))
  }

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddProject = () => {
    if (currentProject.title && currentProject.description) {
      const newProject = {
        ...currentProject,
        technologies: currentProject.technologies.split(",").map((tech) => tech.trim()),
      }

      setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, newProject],
      }))

      setCurrentProject({
        title: "",
        description: "",
        technologies: "",
        url: "",
      })
    }
  }

  const handleRemoveProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
  }

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentExperience((prev) => ({ ...prev, [name]: value }))
  }

  const handleExperienceCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCurrentExperience((prev) => ({
      ...prev,
      current: checked,
      endDate: checked ? "" : prev.endDate,
    }))
  }

  const handleAddExperience = () => {
    if (currentExperience.title && currentExperience.company) {
      const newExperience = {
        ...currentExperience,
        endDate: currentExperience.current ? null : currentExperience.endDate,
      }

      delete (newExperience as any).current

      setFormData((prev) => ({
        ...prev,
        experience: [...prev.experience, newExperience],
      }))

      setCurrentExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      })
    }
  }

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentEducation((prev) => ({ ...prev, [name]: value }))
  }

  const handleEducationCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCurrentEducation((prev) => ({
      ...prev,
      current: checked,
      endDate: checked ? "" : prev.endDate,
    }))
  }

  const handleAddEducation = () => {
    if (currentEducation.degree && currentEducation.institution) {
      const newEducation = {
        ...currentEducation,
        endDate: currentEducation.current ? null : currentEducation.endDate,
      }

      delete (newEducation as any).current

      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, newEducation],
      }))

      setCurrentEducation({
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
      })
    }
  }

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentCertification((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCertification = () => {
    if (currentCertification.name && currentCertification.issuer) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, currentCertification],
      }))

      setCurrentCertification({
        name: "",
        issuer: "",
        date: "",
      })
    }
  }

  const handleRemoveCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentLanguage((prev) => ({ ...prev, [name]: value }))
  }

  const handleProficiencyChange = (value: string) => {
    setCurrentLanguage((prev) => ({ ...prev, proficiency: value }))
  }

  const handleAddLanguage = () => {
    if (currentLanguage.language && currentLanguage.proficiency) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, currentLanguage],
      }))

      setCurrentLanguage({
        language: "",
        proficiency: "",
      })
    }
  }

  const handleRemoveLanguage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    const profileData = {
      userId: user.id,
      ...formData,
      skills: formData.skills.map((name) => ({ id: name.toLowerCase().replace(/\s/g, "-"), name })),
    }

    dispatch(createProfile(profileData))
  }

  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("skills")
    else if (activeTab === "skills") setActiveTab("experience")
    else if (activeTab === "experience") setActiveTab("education")
    else if (activeTab === "education") setActiveTab("projects")
    else if (activeTab === "projects") setActiveTab("additional")
  }

  const prevTab = () => {
    if (activeTab === "additional") setActiveTab("projects")
    else if (activeTab === "projects") setActiveTab("education")
    else if (activeTab === "education") setActiveTab("experience")
    else if (activeTab === "experience") setActiveTab("skills")
    else if (activeTab === "skills") setActiveTab("basic")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href={hasProfile ? "/profile/me" : "/dashboard"}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{hasProfile ? "Edit Profile" : "Create Your Profile"}</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter your personal and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" value={formData.location} onChange={handleChange} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="headline">Professional Headline</Label>
                    <Input
                      id="headline"
                      name="headline"
                      value={formData.headline}
                      onChange={handleChange}
                      placeholder="e.g., Senior Frontend Developer at Tech Company"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="about">About</Label>
                    <Textarea
                      id="about"
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Write a brief summary about yourself, your experience, and your career goals"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentCompany">Current Company</Label>
                    <Input
                      id="currentCompany"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="noticePeriod">Notice Period</Label>
                    <Select
                      value={formData.noticePeriod}
                      onValueChange={(value) => handleSelectChange("noticePeriod", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        {noticePeriodOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume</Label>
                    <Input id="resume" name="resume" type="file" className="cursor-pointer" />
                    <p className="text-sm text-gray-500">Upload your resume (PDF, DOCX, max 5MB)</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={nextTab}>
                  Next: Skills
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>Add your skills to help recruiters find you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Select value={currentSkill} onValueChange={setCurrentSkill}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillOptions.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={handleAddSkill} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center bg-[#0077B5] text-white px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next: Experience
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Add your work history to showcase your professional experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exp-title">Job Title</Label>
                      <Input
                        id="exp-title"
                        name="title"
                        value={currentExperience.title}
                        onChange={handleExperienceChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exp-company">Company</Label>
                      <Input
                        id="exp-company"
                        name="company"
                        value={currentExperience.company}
                        onChange={handleExperienceChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exp-location">Location</Label>
                      <Input
                        id="exp-location"
                        name="location"
                        value={currentExperience.location}
                        onChange={handleExperienceChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exp-start">Start Date</Label>
                      <Input
                        id="exp-start"
                        name="startDate"
                        type="month"
                        value={currentExperience.startDate}
                        onChange={handleExperienceChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exp-end">End Date</Label>
                      <Input
                        id="exp-end"
                        name="endDate"
                        type="month"
                        value={currentExperience.endDate}
                        onChange={handleExperienceChange}
                        disabled={currentExperience.current}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="current-position"
                        checked={currentExperience.current}
                        onChange={handleExperienceCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-[#0077B5] focus:ring-[#0077B5]"
                      />
                      <Label htmlFor="current-position">I currently work here</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exp-description">Description</Label>
                    <Textarea
                      id="exp-description"
                      name="description"
                      value={currentExperience.description}
                      onChange={handleExperienceChange}
                      rows={3}
                      placeholder="Describe your responsibilities and achievements"
                    />
                  </div>

                  <Button type="button" onClick={handleAddExperience} className="w-full">
                    Add Experience
                  </Button>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium">Added Experience</h3>

                  {formData.experience.length === 0 ? (
                    <p className="text-gray-500">No experience added yet</p>
                  ) : (
                    <div className="space-y-4">
                      {formData.experience.map((exp, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(index)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-sm text-gray-600">
                            {exp.company} • {exp.location}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -{" "}
                            {exp.endDate
                              ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                              : "Present"}
                          </p>
                          {exp.description && <p className="text-sm mt-2">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next: Education
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Add your educational background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edu-degree">Degree</Label>
                      <Input
                        id="edu-degree"
                        name="degree"
                        value={currentEducation.degree}
                        onChange={handleEducationChange}
                        placeholder="e.g., Bachelor of Science in Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edu-institution">Institution</Label>
                      <Input
                        id="edu-institution"
                        name="institution"
                        value={currentEducation.institution}
                        onChange={handleEducationChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edu-location">Location</Label>
                      <Input
                        id="edu-location"
                        name="location"
                        value={currentEducation.location}
                        onChange={handleEducationChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edu-start">Start Date</Label>
                      <Input
                        id="edu-start"
                        name="startDate"
                        type="month"
                        value={currentEducation.startDate}
                        onChange={handleEducationChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edu-end">End Date</Label>
                      <Input
                        id="edu-end"
                        name="endDate"
                        type="month"
                        value={currentEducation.endDate}
                        onChange={handleEducationChange}
                        disabled={currentEducation.current}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="current-education"
                        checked={currentEducation.current}
                        onChange={handleEducationCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-[#0077B5] focus:ring-[#0077B5]"
                      />
                      <Label htmlFor="current-education">I am currently studying here</Label>
                    </div>
                  </div>

                  <Button type="button" onClick={handleAddEducation} className="w-full">
                    Add Education
                  </Button>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium">Added Education</h3>

                  {formData.education.length === 0 ? (
                    <p className="text-gray-500">No education added yet</p>
                  ) : (
                    <div className="space-y-4">
                      {formData.education.map((edu, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                          <button
                            type="button"
                            onClick={() => handleRemoveEducation(index)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-sm text-gray-600">
                            {edu.institution} • {edu.location}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -{" "}
                            {edu.endDate
                              ? new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                              : "Present"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next: Projects
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Add your past projects to showcase your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input
                      id="project-title"
                      name="title"
                      value={currentProject.title}
                      onChange={handleProjectChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      name="description"
                      value={currentProject.description}
                      onChange={handleProjectChange}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-technologies">Technologies (comma separated)</Label>
                    <Input
                      id="project-technologies"
                      name="technologies"
                      value={currentProject.technologies}
                      onChange={handleProjectChange}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-url">Project URL (optional)</Label>
                    <Input
                      id="project-url"
                      name="url"
                      value={currentProject.url}
                      onChange={handleProjectChange}
                      placeholder="https://example.com"
                    />
                  </div>

                  <Button type="button" onClick={handleAddProject} className="w-full">
                    Add Project
                  </Button>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium">Added Projects</h3>

                  {formData.projects.length === 0 ? (
                    <p className="text-gray-500">No projects added yet</p>
                  ) : (
                    <div className="space-y-4">
                      {formData.projects.map((project, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                          <button
                            type="button"
                            onClick={() => handleRemoveProject(index)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#0077B5] hover:underline mt-2 inline-block"
                            >
                              View Project
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next: Additional Info
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="additional">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Add certifications, languages, and availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Certifications</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cert-name">Certification Name</Label>
                        <Input
                          id="cert-name"
                          name="name"
                          value={currentCertification.name}
                          onChange={handleCertificationChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cert-issuer">Issuing Organization</Label>
                        <Input
                          id="cert-issuer"
                          name="issuer"
                          value={currentCertification.issuer}
                          onChange={handleCertificationChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cert-date">Date Issued</Label>
                        <Input
                          id="cert-date"
                          name="date"
                          type="month"
                          value={currentCertification.date}
                          onChange={handleCertificationChange}
                        />
                      </div>
                    </div>

                    <Button type="button" onClick={handleAddCertification} className="w-full">
                      Add Certification
                    </Button>

                    <div className="mt-4">
                      {formData.certifications.length === 0 ? (
                        <p className="text-gray-500">No certifications added yet</p>
                      ) : (
                        <div className="space-y-2">
                          {formData.certifications.map((cert, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                              <div>
                                <p className="font-medium">{cert.name}</p>
                                <p className="text-sm text-gray-600">
                                  {cert.issuer} •{" "}
                                  {new Date(cert.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveCertification(index)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Languages</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Input
                          id="language"
                          name="language"
                          value={currentLanguage.language}
                          onChange={handleLanguageChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="proficiency">Proficiency</Label>
                        <Select value={currentLanguage.proficiency} onValueChange={handleProficiencyChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select proficiency level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Native">Native</SelectItem>
                            <SelectItem value="Fluent">Fluent</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="button" onClick={handleAddLanguage} className="w-full">
                      Add Language
                    </Button>

                    <div className="mt-4">
                      {formData.languages.length === 0 ? (
                        <p className="text-gray-500">No languages added yet</p>
                      ) : (
                        <div className="space-y-2">
                          {formData.languages.map((lang, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between w-full">
                                <span>{lang.language}</span>
                                <span className="text-gray-600">{lang.proficiency}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveLanguage(index)}
                                className="text-gray-500 hover:text-red-500 ml-4"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Availability for Interviews</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Days Available</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {daysOfWeek.map((day) => (
                          <div key={day} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`day-${day}`}
                              checked={formData.availability.days.includes(day)}
                              onChange={() => handleAvailabilityChange("days", day)}
                              className="h-4 w-4 rounded border-gray-300 text-[#0077B5] focus:ring-[#0077B5]"
                            />
                            <Label htmlFor={`day-${day}`}>{day}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Time Slots</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <div key={slot} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`slot-${slot}`}
                              checked={formData.availability.timeSlots.includes(slot)}
                              onChange={() => handleAvailabilityChange("timeSlots", slot)}
                              className="h-4 w-4 rounded border-gray-300 text-[#0077B5] focus:ring-[#0077B5]"
                            />
                            <Label htmlFor={`slot-${slot}`}>{slot}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button type="submit" className="bg-[#0077B5] hover:bg-[#005885]" disabled={loading}>
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
