// This file is now deprecated. Use the Redux services and slices instead.
// Keeping this file for backward compatibility until all components are updated.

import { userService } from "@/redux/services/userService"
import { teamService } from "@/redux/services/teamService"
import { companyService } from "@/redux/services/companyService"
import { connectionService } from "@/redux/services/connectionService"

export interface SearchResult {
  users: any[]
  teams: any[]
  companies: any[]
}

export async function searchAll(query: string): Promise<SearchResult> {
  try {
    // Perform searches in parallel
    const [users, teams, companies] = await Promise.all([
      userService.searchUsers(query).catch((err) => {
        console.error("Error searching users:", err)
        return []
      }),
      teamService.searchTeams(query).catch((err) => {
        console.error("Error searching teams:", err)
        return []
      }),
      companyService.searchCompanies(query).catch((err) => {
        console.error("Error searching companies:", err)
        return []
      }),
    ])

    return {
      users: users.slice(0, 5),
      teams: teams.slice(0, 5),
      companies: companies.slice(0, 5),
    }
  } catch (error) {
    console.error("Error in searchAll:", error)
    return {
      users: [],
      teams: [],
      companies: [],
    }
  }
}

export async function sendConnectionRequest(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    return await connectionService.sendConnectionRequest(userId)
  } catch (error) {
    console.error("Error sending connection request:", error)
    return { success: false, message: "Failed to send connection request" }
  }
}

export async function isConnectionPending(userId: string): Promise<boolean> {
  try {
    return await connectionService.isConnectionPending(userId)
  } catch (error) {
    console.error("Error checking connection status:", error)
    return false
  }
}
