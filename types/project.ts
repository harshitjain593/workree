export interface Project {
  id: string
  title: string
  description: string
  clientId: string
  clientName: string
  clientAvatar?: string
  budget: {
    min: number
    max: number
    currency: string
    type: "fixed" | "hourly"
  }
  duration: string
  skills: string[]
  category: string
  status: "open" | "in_progress" | "completed" | "cancelled"
  bids: Bid[]
  createdAt: string
  updatedAt: string
  deadline?: string
  attachments?: string[]
  requirements: string[]
}

export interface Bid {
  id: string
  projectId: string
  freelancerId: string
  freelancerName: string
  freelancerAvatar?: string
  amount: number
  currency: string
  duration: string
  proposal: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
  attachments?: string[]
}
