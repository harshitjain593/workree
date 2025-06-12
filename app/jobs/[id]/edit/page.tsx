"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { useToast } from "@/hooks/use-toast"

// Mock job data
const mockJob = {
  id: "job1",
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  category: "Engineering",
  experience: "5+ years",
  salary: "$120,000 - $150,000",
  status: "active",
  description:
    "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building and maintaining our web applications.",
  requirements: [
    "5+ years of experience with React",
    "Strong knowledge of JavaScript, HTML, and CSS",
    "Experience with state management libraries (Redux, MobX, etc.)",
    "Experience with testing frameworks (Jest, React Testing Library, etc.)",
    "Excellent communication skills",
  ],
  responsibilities: [
    "Develop and maintain our web applications",
    "Collaborate with the design team to implement UI/UX designs",
    "Write clean, maintainable, and efficient code",
    "Participate in code reviews",
    "Mentor junior developers",
  ],
  benefits: [
    "Competitive salary",
    "Health, dental, and vision insurance",
    "401(k) matching",
    "Flexible work hours",
    "Remote work options",
  ],
  skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Redux", "Jest"],
  postedDate: "2023-05-15",
  applications: 24,
  views: 345,
}

export default function JobEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { toast } = useToast()
  const [job, setJob] = useState(mockJob)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "recruiter") {
      router.push("/dashboard")
    }

    // In a real app, you would fetch the job data from an API
    // setLoading(true)
    // fetchJob(params.id).then(data => {
    //   setJob(data)
    //   setLoading(false)
    // })
  }, [isAuthenticated, router, user, params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setJob((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setJob((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault()
      const newSkill = e.currentTarget.value.trim()
      if (newSkill && !job.skills.includes(newSkill)) {
        setJob((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }))
        e.currentTarget.value = ""
      }
    }
  }

  const handleSkillRemove = (skill: string) => {
    setJob((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const handleListItemAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
    listName: "requirements" | "responsibilities" | "benefits"
  ) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault()
      const newItem = e.currentTarget.value.trim()
      if (newItem) {
        setJob((prev) => ({ ...prev, [listName]: [...prev[listName], newItem] }))
        e.currentTarget.value = ""
      }
    }
  }

  const handleListItemRemove = (
    index: number,
    listName: "requirements" | "responsibilities" | "benefits"
  ) => {
    setJob((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the job data to an API
    console.log("Job submitted:", job)
    toast({
      title: "Job updated successfully!",
      description: "Your job has been updated.",
    })
  }
