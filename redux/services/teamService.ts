import { baseApiService } from "./api"
import type { Team } from "@/types/team"

// Fallback team data
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

export const teamService = {
  async getTeams(): Promise<Team[]> {
    try {
      return await baseApiService.fetchData("/mock/teams.json", fallbackTeams)
    } catch (error) {
      console.warn("Failed to fetch teams, using fallback data:", error)
      return fallbackTeams
    }
  },

  async getTeamById(id: string): Promise<Team | undefined> {
    const teams = await this.getTeams()
    return teams.find((team) => team.id === id)
  },

  async searchTeams(query: string): Promise<Team[]> {
    const teams = await this.getTeams()
    const lowerQuery = query.toLowerCase()

    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(lowerQuery) ||
        team.tagline.toLowerCase().includes(lowerQuery) ||
        team.description.toLowerCase().includes(lowerQuery) ||
        team.skills.some((skill: string) => skill.toLowerCase().includes(lowerQuery)),
    )
  },

  async createTeam(teamData: Omit<Team, "id" | "createdAt" | "updatedAt">): Promise<Team> {
    // In a real app, this would create a team via API
    const newTeam: Team = {
      ...teamData,
      id: `team${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      return await baseApiService.postData("/api/teams", newTeam).then((res) => res.data)
    } catch (error) {
      console.warn("Failed to create team via API, returning mock data:", error)
      return newTeam
    }
  },

  async updateTeam(id: string, teamData: Partial<Team>): Promise<Team> {
    try {
      return await baseApiService.updateData(`/api/teams/${id}`, teamData).then((res) => res.data)
    } catch (error) {
      console.warn("Failed to update team via API, returning mock data:", error)
      const existingTeam = await this.getTeamById(id)
      if (!existingTeam) {
        throw new Error(`Team with ID ${id} not found`)
      }
      return {
        ...existingTeam,
        ...teamData,
        updatedAt: new Date().toISOString(),
      }
    }
  },

  async deleteTeam(id: string): Promise<boolean> {
    try {
      return await baseApiService.deleteData(`/api/teams/${id}`).then((res) => res.success)
    } catch (error) {
      console.warn("Failed to delete team via API, returning mock success:", error)
      return true
    }
  },
}
