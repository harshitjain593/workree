import type { Project, Bid } from "@/types/project"

// Mock projects data
const mockProjects: Project[] = [
  {
    id: "project1",
    title: "E-commerce Website Development",
    description:
      "Looking for a skilled developer to build a modern e-commerce website with React and Node.js. The project includes user authentication, payment integration, and admin dashboard.",
    clientId: "client1",
    clientName: "TechCorp Solutions",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    budget: {
      min: 5000,
      max: 8000,
      currency: "USD",
      type: "fixed",
    },
    duration: "2-3 months",
    skills: ["React", "Node.js", "MongoDB", "Payment Integration"],
    category: "Web Development",
    status: "open",
    bids: [],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    deadline: "2024-04-15T23:59:59Z",
    requirements: [
      "Responsive design for mobile and desktop",
      "Secure payment gateway integration",
      "Admin panel for inventory management",
      "SEO optimization",
    ],
  },
  {
    id: "project2",
    title: "Mobile App UI/UX Design",
    description:
      "Need a creative designer to design a mobile app for fitness tracking. Looking for modern, clean design with great user experience.",
    clientId: "client2",
    clientName: "FitLife Inc",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    budget: {
      min: 2000,
      max: 3500,
      currency: "USD",
      type: "fixed",
    },
    duration: "1-2 months",
    skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
    category: "Design",
    status: "open",
    bids: [],
    createdAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    deadline: "2024-03-20T23:59:59Z",
    requirements: [
      "Modern and clean design",
      "User-friendly interface",
      "Prototype with interactions",
      "Design system documentation",
    ],
  },
  {
    id: "project3",
    title: "Data Analysis Dashboard",
    description:
      "Looking for a data analyst to create interactive dashboards for business intelligence. Experience with Python and data visualization tools required.",
    clientId: "client3",
    clientName: "DataInsights Co",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    budget: {
      min: 50,
      max: 75,
      currency: "USD",
      type: "hourly",
    },
    duration: "1 month",
    skills: ["Python", "Data Analysis", "Tableau", "SQL"],
    category: "Data Science",
    status: "open",
    bids: [],
    createdAt: "2024-01-25T09:15:00Z",
    updatedAt: "2024-01-25T09:15:00Z",
    deadline: "2024-02-25T23:59:59Z",
    requirements: [
      "Interactive data visualizations",
      "Real-time data integration",
      "Custom reporting features",
      "Performance optimization",
    ],
  },
]

export async function getProjects(): Promise<Project[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProjects
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find((project) => project.id === id) || null
}

export async function createProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt" | "bids">,
): Promise<Project> {
  const newProject: Project = {
    ...project,
    id: `project-${Date.now()}`,
    bids: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockProjects.unshift(newProject)
  return newProject
}

export async function submitBid(bid: Omit<Bid, "id" | "createdAt">): Promise<Bid> {
  const newBid: Bid = {
    ...bid,
    id: `bid-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  const project = mockProjects.find((p) => p.id === bid.projectId)
  if (project) {
    project.bids.push(newBid)
    project.updatedAt = new Date().toISOString()
  }

  return newBid
}

export async function getProjectsByClient(clientId: string): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter((project) => project.clientId === clientId)
}
