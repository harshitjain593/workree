"use client"

import { useEffect, useState } from "react"
import { fetchCompanies } from "@/lib/api/companies"
import type { Company } from "@/types/company"

export default function CompanyLogos() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const featuredCompanies = await fetchCompanies({ featured: true, limit: 8 })
        setCompanies(featuredCompanies)
      } catch (error) {
        console.error("Error loading companies:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCompanies()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="w-24 h-12 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {companies.map((company) => (
        <div key={company.id} className="grayscale hover:grayscale-0 transition-all duration-300">
          <img
            src={company.logo || "/placeholder.svg?height=48&width=120"}
            alt={company.name}
            className="h-12 object-contain"
          />
        </div>
      ))}
    </div>
  )
}
