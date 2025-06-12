import { baseApiService } from "./api"
import type { Job } from "@/types/job"

export const jobService = {
  async getJobs(): Promise<Job[]> {
    return baseApiService.fetchData("/mock/jobs.json")
  },

  async getJobById(id: string): Promise<Job | undefined> {
    const jobs = await this.getJobs()
    return jobs.find((job) => job.id === id)
  },

  async getFeaturedJobs(limit = 6): Promise<Job[]> {
    const jobs = await this.getJobs()
    return jobs.filter((job) => job.featured).slice(0, limit)
  },

  async searchJobs(
    filters: any = {},
  ): Promise<{ jobs: Job[]; total: number; page: number; limit: number; totalPages: number }> {
    const jobs = await this.getJobs()
    let filteredJobs = [...jobs]

    // Apply filters
    if (filters.query) {
      const query = filters.query.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.name.toLowerCase().includes(query) ||
          job.skills.some((skill: string) => skill.toLowerCase().includes(query)),
      )
    }

    if (filters.location) {
      const location = filters.location.toLowerCase()
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location))
    }

    if (filters.jobTypes && filters.jobTypes.length > 0) {
      filteredJobs = filteredJobs.filter((job) => filters.jobTypes.some((type: string) => job.type.includes(type)))
    }

    if (filters.experienceLevels && filters.experienceLevels.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filters.experienceLevels.some((level: string) => job.experienceLevel.includes(level)),
      )
    }

    // Pagination
    const total = filteredJobs.length
    const page = filters.page || 1
    const limit = filters.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    return {
      jobs: filteredJobs.slice(startIndex, endIndex),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  },

  async createJob(jobData: Partial<Job>): Promise<Job> {
    // In a real app, this would create a job via API
    const newJob = {
      id: `job-${Date.now()}`,
      title: jobData.title || "",
      description: jobData.description || "",
      company: jobData.company || {
        id: "",
        name: "",
        logo: "/placeholder.svg?height=40&width=40",
        description: "",
        industry: "",
        size: "",
        location: "",
        website: "",
      },
      location: jobData.location || "",
      type: jobData.type || "",
      salary: jobData.salary || "",
      experienceLevel: jobData.experienceLevel || "",
      skills: jobData.skills || [],
      requirements: jobData.requirements || [],
      responsibilities: jobData.responsibilities || [],
      benefits: jobData.benefits || [],
      postedAt: "Just now",
      applicants: 0,
      featured: jobData.featured || false,
    }

    return baseApiService.postData("/api/jobs", newJob).then((res) => res.data)
  },
}
