import type { Team } from "@/types/team"

// Fallback teams data
const fallbackTeams: Team[] = [
  {
    id: "team1",
    name: "Frontend Wizards",
    logo: "/placeholder.svg?height=40&width=40",
    tagline: "Crafting beautiful user experiences",
    description: "A team of frontend developers specializing in React, Vue, and Angular.",
    skills: ["React", "TypeScript", "CSS", "UI/UX"],
    members: ["user1", "user3", "user4"],
    openToWork: true,
    location: "Remote",
    createdAt: "2023-01-20T10:00:00Z",
    updatedAt: "2023-01-20T10:00:00Z",
  },
  {
    id: "team2",
    name: "Backend Ninjas",
    logo: "/placeholder.svg?height=40&width=40",
    tagline: "Building robust server solutions",
    description: "Experts in backend technologies and database optimization.",
    skills: ["Node.js", "Python", "MongoDB", "SQL"],
    members: ["user3", "user6", "user7"],
    openToWork: true,
    location: "San Francisco, CA",
    createdAt: "2023-02-15T14:30:00Z",
    updatedAt: "2023-02-15T14:30:00Z",
  },
  {
    id: "team3",
    name: "Full Stack Heroes",
    logo: "/placeholder.svg?height=40&width=40",
    tagline: "End-to-end development solutions",
    description: "A versatile team that handles everything from UI to databases.",
    skills: ["JavaScript", "React", "Node.js", "AWS"],
    members: ["user1", "user4", "user7"],
    openToWork: false,
    location: "New York, NY",
    createdAt: "2023-03-10T09:15:00Z",
    updatedAt: "2023-03-10T09:15:00Z",
  },
  {
    id: "team4",
    name: "DevOps Masters",
    logo: "/placeholder.svg?height=40&width=40",
    tagline: "Streamlining development workflows",
    description: "Specialists in CI/CD, containerization, and cloud infrastructure.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    members: ["user6"],
    openToWork: true,
    location: "Seattle, WA",
    createdAt: "2023-01-05T11:45:00Z",
    updatedAt: "2023-01-05T11:45:00Z",
  },
  {
    id: "team5",
    name: "Mobile App Developers",
    logo: "/placeholder.svg?height=40&width=40",
    tagline: "Creating exceptional mobile experiences",
    description: "Focused on building high-performance native and cross-platform mobile apps.",
    skills: ["React Native", "Swift", "Kotlin", "Flutter"],
    members: ["user3", "user4"],
    openToWork: true,
    location: "Austin, TX",
    createdAt: "2023-02-25T16:20:00Z",
    updatedAt: "2023-02-25T16:20:00Z",
  },
]

// Function to get all teams
export async function getTeams(): Promise<Team[]> {
  try {
    // Try to fetch from mock data first
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
    const response = await fetch(`${baseUrl}/mock/teams.json`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON")
    }

    const data = await response.json()
    return data.teams || fallbackTeams
  } catch (error) {
    console.warn("Failed to fetch teams from mock data, using fallback:", error)
    return fallbackTeams
  }
}

// Function to get a single team by ID
export async function getTeamById(id: string): Promise<Team | null> {
  const teams = await getTeams()
  return teams.find((team) => team.id === id) || null
}

// Function to create a new team
export async function createTeam(team: Omit<Team, "id" | "createdAt" | "updatedAt">): Promise<Team> {
  // In a real app, this would be an API call
  // For now, we'll just return a mock response
  return {
    id: `team-${Date.now()}`,
    ...team,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

// Function to update an existing team
export async function updateTeam(id: string, team: Partial<Team>): Promise<Team> {
  // In a real app, this would be an API call
  // For now, we'll just return a mock response
  const existingTeam = await getTeamById(id)
  if (!existingTeam) {
    throw new Error(`Team with ID ${id} not found`)
  }

  return {
    ...existingTeam,
    ...team,
    updatedAt: new Date().toISOString(),
  }
}

// Function to delete a team
export async function deleteTeam(id: string): Promise<boolean> {
  // In a real app, this would be an API call
  // For now, we'll just return a mock response
  return true
}
