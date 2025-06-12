import type { Company } from "./company"

export interface Job {
  id: string
  title: string
  description: string
  company: Company
  location: string
  type: string
  salary: string
  experienceLevel: string
  skills: string[]
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  postedAt: string
  applicants: number
  featured: boolean
  recruiterId?: string
  status: "active" | "paused" | "closed" | "draft"
  views?: number
  applications?: number
}

export interface JobApplication {
  id: string
  jobId: string
  candidateId: string
  candidateName: string
  candidateEmail: string
  candidatePhone?: string
  resumeUrl?: string
  coverLetter?: string
  appliedAt: string
  status: "pending" | "reviewed" | "interview" | "rejected" | "hired"
  notes?: string
}
