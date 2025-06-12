"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDebounce } from "use-debounce"
import { Search, User, Users, Building2, X, UserPlus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { searchAll, sendConnectionRequest, isConnectionPending } from "@/lib/api/search"
import type { SearchResult } from "@/lib/api/search"
import { useToast } from "@/components/ui/use-toast"

interface SearchDropdownProps {
  onClose: () => void
}

export function SearchDropdown({ onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pendingConnections, setPendingConnections] = useState<Record<string, boolean>>({})
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Search when query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults(null)
        return
      }

      setIsLoading(true)
      try {
        const searchResults = await searchAll(debouncedQuery)
        setResults(searchResults)

        // Check pending connection status for users
        const pendingStatuses: Record<string, boolean> = {}
        for (const user of searchResults.users) {
          pendingStatuses[user.id] = await isConnectionPending(user.id)
        }
        setPendingConnections(pendingStatuses)
      } catch (error) {
        console.error("Error searching:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  const handleSendRequest = async (e: React.MouseEvent, userId: string, userName: string) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const result = await sendConnectionRequest(userId)
      if (result.success) {
        setPendingConnections((prev) => ({ ...prev, [userId]: true }))
        toast({
          title: "Request Sent",
          description: `Connection request sent to ${userName}`,
        })
      }
    } catch (error) {
      console.error("Error sending connection request:", error)
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleProfileClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Navigating to:", path) // Debug log

    // Close dropdown first
    onClose()

    // Navigate after a small delay to ensure dropdown is closed
    setTimeout(() => {
      router.push(path)
    }, 100)
  }

  const handleSeeAllClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Navigating to see all:", path) // Debug log

    // Close dropdown first
    onClose()

    // Navigate after a small delay
    setTimeout(() => {
      router.push(path)
    }, 100)
  }

  const hasResults = results && (results.users.length > 0 || results.teams.length > 0 || results.companies.length > 0)

  return (
    <div
      ref={dropdownRef}
      className="absolute top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto mt-2"
    >
      <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for people, teams, companies..."
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100"
          autoComplete="off"
        />
        <Button variant="ghost" size="icon" onClick={onClose} className="ml-2">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto p-2">
        {isLoading ? (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : !hasResults && query.trim() ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No results found for &quot;{query}&quot;
          </div>
        ) : (
          <>
            {/* People results */}
            {results?.users.length ? (
              <div className="mb-4">
                <div className="flex items-center px-3 py-2">
                  <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">People</h3>
                </div>
                <div className="space-y-1">
                  {results.users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <div
                        className="flex items-center flex-1 cursor-pointer"
                        onClick={(e) => handleProfileClick(e, `/profile/${user.id}`)}
                      >
                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={user.avatar || "/placeholder.svg?height=40&width=40"}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.headline || (user.role === "jobseeker" ? "Job Seeker" : "Recruiter")}
                            {user.location && ` • ${user.location}`}
                          </p>
                        </div>
                      </div>
                      {user.role !== "recruiter" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2"
                          disabled={pendingConnections[user.id]}
                          onClick={(e) => handleSendRequest(e, user.id, user.name)}
                        >
                          {pendingConnections[user.id] ? (
                            <>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Pending</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-1" />
                              <span>Connect</span>
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="w-full text-[#0077B5] dark:text-[#00A0DC] mt-1 text-sm py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  onClick={(e) => handleSeeAllClick(e, `/search/people?q=${encodeURIComponent(query)}`)}
                >
                  See all people results
                </button>
              </div>
            ) : null}

            {/* Teams results */}
            {results?.teams.length ? (
              <div className="mb-4">
                <div className="flex items-center px-3 py-2">
                  <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Teams</h3>
                </div>
                <div className="space-y-1">
                  {results.teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
                      onClick={(e) => handleProfileClick(e, `/teams/${team.id}`)}
                    >
                      <div className="relative h-10 w-10 rounded-md overflow-hidden mr-3">
                        <Image
                          src={team.logo || "/placeholder.svg?height=40&width=40"}
                          alt={team.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{team.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{team.tagline}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full text-[#0077B5] dark:text-[#00A0DC] mt-1 text-sm py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  onClick={(e) => handleSeeAllClick(e, `/search/teams?q=${encodeURIComponent(query)}`)}
                >
                  See all team results
                </button>
              </div>
            ) : null}

            {/* Companies results */}
            {results?.companies.length ? (
              <div className="mb-4">
                <div className="flex items-center px-3 py-2">
                  <Building2 className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Companies</h3>
                </div>
                <div className="space-y-1">
                  {results.companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
                      onClick={(e) => handleProfileClick(e, `/companies/${company.id}`)}
                    >
                      <div className="relative h-10 w-10 rounded-md overflow-hidden mr-3">
                        <Image
                          src={company.logo || "/placeholder.svg?height=40&width=40"}
                          alt={company.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {company.industry} • {company.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full text-[#0077B5] dark:text-[#00A0DC] mt-1 text-sm py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  onClick={(e) => handleSeeAllClick(e, `/search/companies?q=${encodeURIComponent(query)}`)}
                >
                  See all company results
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
