// Base API service with common functionality
export const baseApiService = {
  async fetchData(url: string, fallbackData: any[] = []) {
    // In development/preview environments, fetching JSON from public directory might not work as expected
    // We'll implement a fallback mechanism

    if (process.env.NODE_ENV !== "production") {
      console.log(`Using fallback data for ${url} in non-production environment`)
      return fallbackData
    }

    try {
      const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
      const fullUrl = `${baseUrl}${url}`

      console.log(`Fetching data from: ${fullUrl}`)

      const response = await fetch(fullUrl)

      if (!response.ok) {
        console.error(`API error (${response.status}) for ${url}`)
        return fallbackData
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error(`Expected JSON but got: ${contentType} for ${url}`)
        return fallbackData
      }

      return await response.json()
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error)
      return fallbackData
    }
  },

  async postData(url: string, data: any) {
    try {
      // In a real app, this would be a POST request to an API
      // For now, we'll just simulate a delay and return a success response
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true, data }
    } catch (error) {
      console.error(`Error posting data to ${url}:`, error)
      throw error
    }
  },

  async updateData(url: string, data: any) {
    try {
      // In a real app, this would be a PUT/PATCH request to an API
      // For now, we'll just simulate a delay and return a success response
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true, data }
    } catch (error) {
      console.error(`Error updating data at ${url}:`, error)
      throw error
    }
  },

  async deleteData(url: string) {
    try {
      // In a real app, this would be a DELETE request to an API
      // For now, we'll just simulate a delay and return a success response
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true }
    } catch (error) {
      console.error(`Error deleting data at ${url}:`, error)
      throw error
    }
  },
}
