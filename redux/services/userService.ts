import { baseApiService } from "./api"
import type { User } from "@/types/user"

// Fallback user data in case fetching fails
const fallbackUsers = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "jobseeker",
    avatar: "/placeholder.svg?height=40&width=40",
    headline: "Senior Frontend Developer",
    location: "San Francisco, CA",
    connections: ["user3", "user5"],
    createdAt: "2023-01-15T08:00:00Z",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "recruiter",
    avatar: "/placeholder.svg?height=40&width=40",
    headline: "Technical Recruiter at Innovate Labs",
    location: "New York, NY",
    connections: ["user4"],
    createdAt: "2023-02-10T10:15:00Z",
  },
  {
    id: "user3",
    name: "Michael Johnson",
    email: "michael@example.com",
    password: "password123",
    role: "jobseeker",
    avatar: "/placeholder.svg?height=40&width=40",
    headline: "Full Stack Developer",
    location: "Austin, TX",
    connections: ["user1"],
    createdAt: "2023-03-05T15:30:00Z",
  },
  {
    id: "user4",
    name: "Emily Davis",
    email: "emily@example.com",
    password: "password123",
    role: "jobseeker",
    avatar: "/placeholder.svg?height=40&width=40",
    headline: "UX/UI Designer",
    location: "Seattle, WA",
    connections: ["user2"],
    createdAt: "2023-01-25T09:45:00Z",
  },
  {
    id: "user5",
    name: "David Wilson",
    email: "david@example.com",
    password: "password123",
    role: "recruiter",
    avatar: "/placeholder.svg?height=40&width=40",
    headline: "Senior Talent Acquisition Specialist",
    location: "Chicago, IL",
    connections: ["user1"],
    createdAt: "2023-02-28T11:20:00Z",
  },
  {
    id: "user6",
    name: "Sarah Brown",
    email: "sarah@example.com",
    password: "password123",
    role: "jobseeker",
    avatar: "/placeholder.svg?height=40&width=40",
    headline: "DevOps Engineer",
    location: "Remote",
    connections: [],
    createdAt: "2023-03-15T14:10:00Z",
  },
  {
    id: "user7",
    name: "Robert Taylor",
    email: "robert@example.com",
    password: "password123",
    role: "jobseeker",
    avatar: "/placeholder.svg?height=40&width=40",
    headline: "Data Scientist",
    location: "Boston, MA",
    connections: [],
    createdAt: "2023-02-05T11:30:00Z",
  },
  {
    id: "user8",
    name: "Jennifer Martinez",
    email: "jennifer@example.com",
    password: "password123",
    role: "recruiter",
    avatar: "/placeholder.svg?height=40&width=40",
    headline: "HR Manager at Global Tech",
    location: "San Jose, CA",
    connections: [],
    createdAt: "2023-01-10T09:15:00Z",
  },
]

export const userService = {
  async getUsers(): Promise<User[]> {
    return baseApiService.fetchData("/mock/users.json", fallbackUsers)
  },

  async getUserById(id: string): Promise<User | undefined> {
    const users = await this.getUsers()
    return users.find((user) => user.id === id)
  },

  async searchUsers(query: string): Promise<User[]> {
    const users = await this.getUsers()
    const lowerQuery = query.toLowerCase()

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        (user.headline && user.headline.toLowerCase().includes(lowerQuery)) ||
        (user.location && user.location.toLowerCase().includes(lowerQuery)),
    )
  },

  async createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    // In a real app, this would create a user via API
    const newUser = {
      ...userData,
      id: `user${Date.now()}`,
      createdAt: new Date().toISOString(),
      connections: [],
    }

    return baseApiService.postData("/api/users", newUser).then((res) => res.data)
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    // In a real app, this would update a user via API
    return baseApiService.updateData(`/api/users/${id}`, userData).then((res) => res.data)
  },

  async deleteUser(id: string): Promise<boolean> {
    // In a real app, this would delete a user via API
    return baseApiService.deleteData(`/api/users/${id}`).then((res) => res.success)
  },
}
