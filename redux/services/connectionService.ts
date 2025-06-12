import { baseApiService } from "./api"
import { userService } from "./userService"

// Fallback connection requests data
const fallbackConnectionRequests = [
  { from: "user1", to: "user6", status: "pending" },
  { from: "user3", to: "user7", status: "pending" },
  { from: "user5", to: "user4", status: "accepted" },
]

export const connectionService = {
  async getConnectionRequests() {
    return baseApiService.fetchData("/mock/connection-requests.json", fallbackConnectionRequests)
  },

  async sendConnectionRequest(userId: string): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, we would make an API call to send a connection request
    // For now, we'll just check against our mock data
    const currentUserId = "user1" // Assuming the current user is user1

    // Get existing connection requests
    const connectionRequests = await this.getConnectionRequests()

    // Check if a request already exists
    const existingRequest = connectionRequests.find(
      (req) => (req.from === currentUserId && req.to === userId) || (req.from === userId && req.to === currentUserId),
    )

    if (existingRequest) {
      return { success: false, message: "A connection request already exists" }
    }

    // In a real app, we would add the request to the database
    // For now, we'll just return success
    return { success: true, message: "Connection request sent successfully" }
  },

  async isConnectionPending(userId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const currentUserId = "user1" // Assuming the current user is user1

    // Check if users are already connected
    const currentUser = await userService.getUserById(currentUserId)
    if (currentUser && currentUser.connections && currentUser.connections.includes(userId)) {
      return false
    }

    // Get connection requests
    const connectionRequests = await this.getConnectionRequests()

    // Check if there's a pending request
    return connectionRequests.some(
      (req) =>
        ((req.from === currentUserId && req.to === userId) || (req.from === userId && req.to === currentUserId)) &&
        req.status === "pending",
    )
  },
}
