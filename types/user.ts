export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "jobseeker" | "company_admin"
  title?: string
  company?: string
  location?: string
  bio?: string
  skills?: string[]
  experience?: {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string | null
    description: string
  }[]
  education?: {
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string | null
  }[]
  connections?: number
  isOnline?: boolean
  lastActive?: string
  verified?: boolean
  rating?: number
  completedProjects?: number
  hourlyRate?: number
  availability?: {
    days: string[]
    timeSlots: string[]
  }
}

export interface Profile extends User {
  coverImage?: string
  portfolio?: PortfolioItem[]
  testimonials?: Testimonial[]
  certifications?: {
    name: string
    issuer: string
    date: string
  }[]
  languages?: {
    language: string
    proficiency: string
  }[]
  socialLinks?: {
    linkedin?: string
    github?: string
    website?: string
    twitter?: string
  }
  phone?: string
  headline?: string
  about?: string
  currentCompany?: string
  noticePeriod?: string
  availability?: {
    days: string[]
    timeSlots: string[]
  }
  projects?: {
    title: string
    description: string
    technologies: string[]
    url?: string
  }[]
  experience?: {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string | null
    description: string
  }[]
  education?: {
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string | null
  }[]
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  image?: string
  url?: string
  technologies?: string[]
  completedAt: string
}

export interface Testimonial {
  id: string
  author: string
  role: string
  company: string
  content: string
  rating: number
  date: string
}
