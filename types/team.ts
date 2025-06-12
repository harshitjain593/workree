export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  linkedIn?: string
  github?: string
  email?: string
  phone?: string
  skills: string[]
  joinedAt: string
  permissions: ("admin" | "member" | "viewer")[]
}

export interface TeamProject {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  projectUrl?: string
  githubUrl?: string
  startDate: string
  endDate?: string
  status: "planning" | "in-progress" | "completed" | "on-hold"
  teamMembers: string[] // Array of member IDs
}

export type AvailabilityStatus =
  | "Available Immediately"
  | "Available Soon"
  | "Available from Future Date"
  | "Not Available"

export interface TeamAvailability {
  status: AvailabilityStatus
  availableFrom?: string
  workPreferences: ("Contract" | "Full-time" | "Part-time" | "Startup-friendly")[]
  hourlyRate?: {
    min: number
    max: number
    currency: string
  }
  projectTypes: ("Web Development" | "Mobile App" | "E-commerce" | "SaaS" | "Consulting" | "Other")[]
}

export interface Team {
  id: string
  name: string
  tagline: string
  description: string
  logo: string
  skills: string[]
  members: TeamMember[]
  projects: TeamProject[]
  availability: TeamAvailability
  createdAt: string
  updatedAt: string
  ownerId: string
  isPublic: boolean
  location?: string
  website?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}
