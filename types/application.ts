import type { User } from "./user"
import type { Job } from "./job"

export interface Application {
  id: string
  userId: string
  jobId: string
  status: "applied" | "reviewing" | "interview" | "offer" | "rejected" | "accepted"
  appliedAt: string
  updatedAt: string
  coverLetter?: string
  resume?: string
  user?: User
  job?: Job
  notes?: string
  interviewDate?: string
}
