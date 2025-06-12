import type { Job } from "@/types/job"

// Mock data for jobs
const mockJobs: Job[] = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    description:
      "We are looking for a Senior Frontend Developer with experience in React and TypeScript to join our team. You will be responsible for building and maintaining our web applications.",
    company: {
      id: "company1",
      name: "Tech Solutions Inc.",
      logo: "/placeholder.svg?height=40&width=40",
      description:
        "Tech Solutions Inc. is a leading technology company specializing in web and mobile application development.",
      industry: "Technology",
      size: "51-200 employees",
      location: "San Francisco, CA",
      website: "https://techsolutions.example.com",
    },
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    experienceLevel: "Senior",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Redux", "Next.js"],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong knowledge of React and TypeScript",
      "Experience with state management libraries like Redux",
      "Familiarity with modern frontend build tools",
      "Excellent problem-solving skills",
    ],
    responsibilities: [
      "Develop and maintain web applications using React and TypeScript",
      "Collaborate with designers and backend developers",
      "Optimize applications for maximum speed and scalability",
      "Implement responsive design and ensure cross-browser compatibility",
      "Participate in code reviews and mentor junior developers",
    ],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Flexible work hours",
      "Remote work options",
      "Professional development budget",
    ],
    postedAt: "2 days ago",
    applicants: 24,
    featured: true,
  },
  {
    id: "job2",
    title: "Full Stack Developer",
    description:
      "We're seeking a Full Stack Developer to join our engineering team. You'll work on both frontend and backend development for our SaaS platform.",
    company: {
      id: "company2",
      name: "Innovate Labs",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Innovate Labs builds cutting-edge SaaS solutions for businesses of all sizes.",
      industry: "Technology",
      size: "11-50 employees",
      location: "New York, NY",
      website: "https://innovatelabs.example.com",
    },
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    experienceLevel: "Mid Level",
    skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express", "AWS"],
    requirements: [
      "3+ years of experience in full stack development",
      "Proficiency in JavaScript, Node.js, and React",
      "Experience with NoSQL databases like MongoDB",
      "Knowledge of cloud services (AWS, Azure, or GCP)",
      "Understanding of CI/CD pipelines",
    ],
    responsibilities: [
      "Develop and maintain both frontend and backend components",
      "Design and implement new features and functionality",
      "Ensure the performance, quality, and responsiveness of applications",
      "Collaborate with cross-functional teams",
      "Troubleshoot and debug applications",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Unlimited PTO",
      "Flexible work schedule",
      "Remote work options",
      "Stock options",
    ],
    postedAt: "1 week ago",
    applicants: 42,
    featured: true,
  },
  {
    id: "job3",
    title: "React Native Developer",
    description:
      "Join our mobile team to build cross-platform mobile applications using React Native. You'll be responsible for developing and maintaining our mobile apps.",
    company: {
      id: "company3",
      name: "Mobile Innovations",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Mobile Innovations creates cutting-edge mobile applications for clients worldwide.",
      industry: "Technology",
      size: "11-50 employees",
      location: "Remote",
      website: "https://mobileinnovations.example.com",
    },
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    experienceLevel: "Mid Level",
    skills: ["React Native", "JavaScript", "TypeScript", "Redux", "iOS", "Android"],
    requirements: [
      "2+ years of experience with React Native",
      "Strong knowledge of JavaScript and TypeScript",
      "Experience with state management in React Native",
      "Understanding of mobile app architecture",
      "Familiarity with native build tools",
    ],
    responsibilities: [
      "Develop and maintain React Native applications",
      "Implement new features and functionality",
      "Ensure app performance and quality",
      "Collaborate with designers and backend developers",
      "Troubleshoot and fix bugs",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible work hours",
      "Remote work",
      "Professional development budget",
    ],
    postedAt: "3 days ago",
    applicants: 18,
    featured: true,
  },
  {
    id: "job4",
    title: "UI/UX Designer",
    description:
      "We're looking for a talented UI/UX Designer to create beautiful, intuitive interfaces for our web and mobile applications.",
    company: {
      id: "company4",
      name: "Design Forward",
      logo: "/placeholder.svg?height=40&width=40",
      description:
        "Design Forward is a design agency specializing in creating beautiful, user-friendly digital experiences.",
      industry: "Design",
      size: "11-50 employees",
      location: "Boston, MA",
      website: "https://designforward.example.com",
    },
    location: "Boston, MA",
    type: "Full-time",
    salary: "$80,000 - $110,000",
    experienceLevel: "Mid Level",
    skills: ["UI Design", "UX Design", "Figma", "Adobe XD", "Prototyping", "User Research"],
    requirements: [
      "3+ years of experience in UI/UX design",
      "Proficiency in design tools like Figma or Adobe XD",
      "Strong portfolio showcasing your design work",
      "Experience with user research and usability testing",
      "Understanding of design systems",
    ],
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Maintain and evolve our design system",
    ],
    benefits: [
      "Competitive salary",
      "Health and dental insurance",
      "Flexible work hours",
      "Hybrid work model",
      "Professional development opportunities",
    ],
    postedAt: "1 week ago",
    applicants: 36,
    featured: false,
  },
  {
    id: "job5",
    title: "DevOps Engineer",
    description:
      "We're seeking a DevOps Engineer to help us build and maintain our cloud infrastructure and CI/CD pipelines.",
    company: {
      id: "company5",
      name: "Cloud Systems",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Cloud Systems provides cloud infrastructure and DevOps solutions for businesses of all sizes.",
      industry: "Technology",
      size: "51-200 employees",
      location: "Seattle, WA",
      website: "https://cloudsystems.example.com",
    },
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    experienceLevel: "Senior",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux", "Python"],
    requirements: [
      "4+ years of experience in DevOps or SRE roles",
      "Strong knowledge of AWS services",
      "Experience with containerization and orchestration",
      "Proficiency in infrastructure as code",
      "Understanding of CI/CD principles",
    ],
    responsibilities: [
      "Design, implement, and maintain cloud infrastructure",
      "Build and improve CI/CD pipelines",
      "Automate deployment processes",
      "Monitor system performance and reliability",
      "Collaborate with development teams to improve infrastructure",
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive health benefits",
      "401(k) matching",
      "Flexible work arrangements",
      "Professional development budget",
    ],
    postedAt: "5 days ago",
    applicants: 15,
    featured: false,
  },
  {
    id: "job6",
    title: "Product Manager",
    description:
      "We're looking for a Product Manager to lead the development of our SaaS platform. You'll work closely with engineering, design, and marketing teams.",
    company: {
      id: "company6",
      name: "Product Innovations",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Product Innovations builds SaaS products that help businesses streamline their operations.",
      industry: "Technology",
      size: "11-50 employees",
      location: "Austin, TX",
      website: "https://productinnovations.example.com",
    },
    location: "Austin, TX",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    experienceLevel: "Mid Level",
    skills: ["Product Management", "Agile", "User Stories", "Roadmapping", "Data Analysis", "Market Research"],
    requirements: [
      "3+ years of experience in product management",
      "Experience with agile development methodologies",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Technical background or understanding of software development",
    ],
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work with engineering and design teams to deliver features",
      "Analyze market trends and competition",
      "Collect and analyze user feedback",
    ],
    benefits: [
      "Competitive salary",
      "Health and dental insurance",
      "401(k) plan",
      "Flexible work hours",
      "Remote work options",
      "Professional development opportunities",
    ],
    postedAt: "2 weeks ago",
    applicants: 28,
    featured: false,
  },
]

interface JobFilters {
  query?: string
  location?: string
  jobTypes?: string[]
  experienceLevels?: string[]
  industries?: string[]
  salaryMin?: number
  salaryMax?: number
  sortBy?: string
  limit?: number
  page?: number
}

export async function fetchJobs(filters: JobFilters = {}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  let filteredJobs = [...mockJobs]

  // Apply filters
  if (filters.query) {
    const query = filters.query.toLowerCase()
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.name.toLowerCase().includes(query) ||
        job.skills.some((skill) => skill.toLowerCase().includes(query)),
    )
  }

  if (filters.location) {
    const location = filters.location.toLowerCase()
    filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location))
  }

  if (filters.jobTypes && filters.jobTypes.length > 0) {
    filteredJobs = filteredJobs.filter((job) => filters.jobTypes!.some((type) => job.type.includes(type)))
  }

  if (filters.experienceLevels && filters.experienceLevels.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      filters.experienceLevels!.some((level) => job.experienceLevel.includes(level)),
    )
  }

  if (filters.industries && filters.industries.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      filters.industries!.some((industry) => job.company.industry.includes(industry)),
    )
  }

  if (filters.salaryMin !== undefined || filters.salaryMax !== undefined) {
    filteredJobs = filteredJobs.filter((job) => {
      // Extract numeric values from salary range
      const salaryRange = job.salary.match(/\$(\d+,?\d*)\s*-\s*\$(\d+,?\d*)/)
      if (!salaryRange) return true

      const min = Number.parseInt(salaryRange[1].replace(/,/g, ""))
      const max = Number.parseInt(salaryRange[2].replace(/,/g, ""))

      if (filters.salaryMin !== undefined && max < filters.salaryMin) return false
      if (filters.salaryMax !== undefined && min > filters.salaryMax) return false

      return true
    })
  }

  // Sort jobs
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "recent":
        // Sort by posted date (most recent first)
        filteredJobs.sort((a, b) => {
          const aTime = parsePostedTime(a.postedAt)
          const bTime = parsePostedTime(b.postedAt)
          return aTime - bTime
        })
        break
      case "salary_high":
        // Sort by salary (highest first)
        filteredJobs.sort((a, b) => {
          const aSalary = extractMaxSalary(a.salary)
          const bSalary = extractMaxSalary(b.salary)
          return bSalary - aSalary
        })
        break
      case "salary_low":
        // Sort by salary (lowest first)
        filteredJobs.sort((a, b) => {
          const aSalary = extractMinSalary(a.salary)
          const bSalary = extractMinSalary(b.salary)
          return aSalary - bSalary
        })
        break
      default:
        // Default: relevance (featured jobs first)
        filteredJobs.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
    }
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
}

export async function fetchFeaturedJobs(limit = 6) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return mockJobs.filter((job) => job.featured).slice(0, limit)
}

export async function fetchJobById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const job = mockJobs.find((job) => job.id === id)

  if (!job) {
    throw new Error("Job not found")
  }

  return job
}

export async function createJob(jobData: Partial<Job>) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate a unique ID
  const id = `job${mockJobs.length + 1}`

  // Create a new job with default values for missing fields
  const newJob: Job = {
    id,
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

  // Add the new job to the mock data
  mockJobs.unshift(newJob)

  return newJob
}

// Helper functions
function parsePostedTime(postedAt: string): number {
  const match = postedAt.match(/(\d+)\s+(\w+)/)
  if (!match) return 0

  const value = Number.parseInt(match[1])
  const unit = match[2]

  const now = new Date().getTime()

  switch (unit) {
    case "day":
    case "days":
      return now - value * 24 * 60 * 60 * 1000
    case "week":
    case "weeks":
      return now - value * 7 * 24 * 60 * 60 * 1000
    case "month":
    case "months":
      return now - value * 30 * 24 * 60 * 60 * 1000
    default:
      return 0
  }
}

function extractMinSalary(salary: string): number {
  const match = salary.match(/\$(\d+,?\d*)/)
  if (!match) return 0
  return Number.parseInt(match[1].replace(/,/g, ""))
}

function extractMaxSalary(salary: string): number {
  const match = salary.match(/\$(\d+,?\d*)\s*-\s*\$(\d+,?\d*)/)
  if (!match) return 0
  return Number.parseInt(match[2].replace(/,/g, ""))
}
