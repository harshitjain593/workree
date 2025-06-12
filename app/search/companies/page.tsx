"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Building2, MapPin, Users, Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { searchAll } from "@/lib/api/search"

export default function CompaniesSearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const searchResults = await searchAll(query)
        setResults(searchResults.companies)
      } catch (error) {
        console.error("Error searching:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Building2 className="h-6 w-6 mr-2 text-[#0077B5] dark:text-[#00A0DC]" />
        <h1 className="text-2xl font-bold">Companies Search Results</h1>
      </div>

      {query && <p className="text-gray-600 dark:text-gray-400 mb-6">Showing results for &quot;{query}&quot;</p>}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <div className="flex flex-wrap gap-2 mt-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No companies found matching your search.</p>
          <p className="text-gray-500 dark:text-gray-500">Try a different search term or browse people instead.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.id}`}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={company.logo || "/placeholder.svg?height=64&width=64"}
                    alt={company.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">{company.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{company.industry}</p>
                  {company.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {company.location}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{company.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {company.specialties.slice(0, 5).map((specialty: string) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {company.specialties.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{company.specialties.length - 5} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-500">
                <span className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {company.size}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Founded {company.founded}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
