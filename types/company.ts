export interface Company {
  id: string
  name: string
  logo?: string
  description: string
  industry: string
  size: string
  location: string
  website: string
  founded?: number
  specialties?: string[]
  featured?: boolean
}
