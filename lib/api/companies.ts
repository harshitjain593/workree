import type { Company } from "@/types/company"

// Mock data for companies
const mockCompanies: Company[] = [
  {
    id: "company1",
    name: "Tech Solutions Inc.",
    logo: "/placeholder.svg?height=40&width=40",
    description:
      "Tech Solutions Inc. is a leading technology company specializing in web and mobile application development.",
    industry: "Technology",
    size: "51-200 employees",
    location: "San Francisco, CA",
    website: "https://techsolutions.example.com",
    founded: 2010,
    specialties: ["Web Development", "Mobile Development", "Cloud Solutions", "UI/UX Design"],
    featured: true,
  },
  {
    id: "company2",
    name: "Innovate Labs",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Innovate Labs builds cutting-edge SaaS solutions for businesses of all sizes.",
    industry: "Technology",
    size: "11-50 employees",
    location: "New York, NY",
    website: "https://innovatelabs.example.com",
    founded: 2015,
    specialties: ["SaaS", "Cloud Computing", "Enterprise Software", "AI Solutions"],
    featured: true,
  },
  {
    id: "company3",
    name: "Mobile Innovations",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Mobile Innovations creates cutting-edge mobile applications for clients worldwide.",
    industry: "Technology",
    size: "11-50 employees",
    location: "Remote",
    website: "https://mobileinnovations.example.com",
    founded: 2017,
    specialties: ["Mobile Apps", "React Native", "iOS Development", "Android Development"],
    featured: true,
  },
  {
    id: "company4",
    name: "Design Forward",
    logo: "/placeholder.svg?height=40&width=40",
    description:
      "Design Forward is a design agency specializing in creating beautiful, user-friendly digital experiences.",
    industry: "Design",
    size: "11-50 employees",
    location: "Boston, MA",
    website: "https://designforward.example.com",
    founded: 2014,
    specialties: ["UI/UX Design", "Brand Identity", "Web Design", "Product Design"],
    featured: true,
  },
  {
    id: "company5",
    name: "Cloud Systems",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Cloud Systems provides cloud infrastructure and DevOps solutions for businesses of all sizes.",
    industry: "Technology",
    size: "51-200 employees",
    location: "Seattle, WA",
    website: "https://cloudsystems.example.com",
    founded: 2012,
    specialties: ["Cloud Infrastructure", "DevOps", "AWS", "Kubernetes"],
    featured: true,
  },
  {
    id: "company6",
    name: "Product Innovations",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Product Innovations builds SaaS products that help businesses streamline their operations.",
    industry: "Technology",
    size: "11-50 employees",
    location: "Austin, TX",
    website: "https://productinnovations.example.com",
    founded: 2016,
    specialties: ["SaaS Products", "Business Software", "Productivity Tools", "Workflow Automation"],
    featured: true,
  },
  {
    id: "company7",
    name: "Global Tech",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Global Tech is an international technology company with offices in multiple countries.",
    industry: "Technology",
    size: "1001-5000 employees",
    location: "Multiple Locations",
    website: "https://globaltech.example.com",
    founded: 2005,
    specialties: ["Enterprise Solutions", "Consulting", "IT Services", "Digital Transformation"],
    featured: true,
  },
  {
    id: "company8",
    name: "Future Innovations",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Future Innovations focuses on emerging technologies like AI, blockchain, and IoT.",
    industry: "Technology",
    size: "51-200 employees",
    location: "San Jose, CA",
    website: "https://futureinnovations.example.com",
    founded: 2018,
    specialties: ["Artificial Intelligence", "Blockchain", "IoT", "Machine Learning"],
    featured: true,
  },
]

interface CompanyFilters {
  query?: string
  industry?: string
  location?: string
  featured?: boolean
  limit?: number
  page?: number
}

export async function fetchCompanies(filters: CompanyFilters = {}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  let filteredCompanies = [...mockCompanies]

  // Apply filters
  if (filters.query) {
    const query = filters.query.toLowerCase()
    filteredCompanies = filteredCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.description.toLowerCase().includes(query) ||
        company.specialties.some((specialty) => specialty.toLowerCase().includes(query)),
    )
  }

  if (filters.industry) {
    filteredCompanies = filteredCompanies.filter(
      (company) => company.industry.toLowerCase() === filters.industry!.toLowerCase(),
    )
  }

  if (filters.location) {
    filteredCompanies = filteredCompanies.filter((company) =>
      company.location.toLowerCase().includes(filters.location!.toLowerCase()),
    )
  }

  if (filters.featured !== undefined) {
    filteredCompanies = filteredCompanies.filter((company) => company.featured === filters.featured)
  }

  // Pagination
  const total = filteredCompanies.length
  const page = filters.page || 1
  const limit = filters.limit || filteredCompanies.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return filteredCompanies.slice(startIndex, endIndex)
}

export async function fetchCompanyById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const company = mockCompanies.find((company) => company.id === id)

  if (!company) {
    throw new Error("Company not found")
  }

  return company
}
