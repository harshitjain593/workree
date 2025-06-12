import { baseApiService } from "./api"
import type { Company } from "@/types/company"

// Fallback company data
const fallbackCompanies = [
  {
    id: "company1",
    name: "TechNova",
    logo: "/placeholder.svg?height=40&width=40",
    description: "A leading technology company focused on innovation and digital transformation.",
    industry: "Technology",
    location: "San Francisco, CA",
    website: "https://technova.example.com",
    size: "1001-5000",
    founded: 2010,
    specialties: ["Cloud Computing", "AI", "Digital Transformation"],
    createdAt: "2023-01-10T08:30:00Z",
  },
  {
    id: "company2",
    name: "Global Finance Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Providing innovative financial services and solutions worldwide.",
    industry: "Financial Services",
    location: "New York, NY",
    website: "https://gfs.example.com",
    size: "5001-10000",
    founded: 1995,
    specialties: ["Banking", "Investment", "Financial Technology"],
    createdAt: "2023-02-05T14:15:00Z",
  },
  {
    id: "company3",
    name: "HealthPlus",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Revolutionizing healthcare through technology and patient-centered approaches.",
    industry: "Healthcare",
    location: "Boston, MA",
    website: "https://healthplus.example.com",
    size: "501-1000",
    founded: 2015,
    specialties: ["Telemedicine", "Health IT", "Patient Care"],
    createdAt: "2023-01-25T11:45:00Z",
  },
  {
    id: "company4",
    name: "EcoSustain",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Dedicated to creating sustainable solutions for a greener future.",
    industry: "Environmental Services",
    location: "Portland, OR",
    website: "https://ecosustain.example.com",
    size: "201-500",
    founded: 2018,
    specialties: ["Renewable Energy", "Sustainability", "Green Technology"],
    createdAt: "2023-03-15T09:20:00Z",
  },
  {
    id: "company5",
    name: "MediaStream",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Creating engaging content and media solutions for the digital age.",
    industry: "Media & Entertainment",
    location: "Los Angeles, CA",
    website: "https://mediastream.example.com",
    size: "501-1000",
    founded: 2012,
    specialties: ["Digital Media", "Content Creation", "Streaming Services"],
    createdAt: "2023-02-20T16:30:00Z",
  },
]

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    return baseApiService.fetchData("/mock/companies.json", fallbackCompanies)
  },

  async getCompanyById(id: string): Promise<Company | undefined> {
    const companies = await this.getCompanies()
    return companies.find((company) => company.id === id)
  },

  async searchCompanies(query: string): Promise<Company[]> {
    const companies = await this.getCompanies()
    const lowerQuery = query.toLowerCase()

    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(lowerQuery) ||
        company.description.toLowerCase().includes(lowerQuery) ||
        company.industry.toLowerCase().includes(lowerQuery) ||
        company.location.toLowerCase().includes(lowerQuery) ||
        company.specialties.some((specialty: string) => specialty.toLowerCase().includes(lowerQuery)),
    )
  },

  async createCompany(companyData: Omit<Company, "id" | "createdAt">): Promise<Company> {
    // In a real app, this would create a company via API
    const newCompany = {
      ...companyData,
      id: `company${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    return baseApiService.postData("/api/companies", newCompany).then((res) => res.data)
  },

  async updateCompany(id: string, companyData: Partial<Company>): Promise<Company> {
    // In a real app, this would update a company via API
    return baseApiService.updateData(`/api/companies/${id}`, companyData).then((res) => res.data)
  },

  async deleteCompany(id: string): Promise<boolean> {
    // In a real app, this would delete a company via API
    return baseApiService.deleteData(`/api/companies/${id}`).then((res) => res.success)
  },
}
