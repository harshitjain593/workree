"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, UserPlus, Clock, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { searchAll, sendConnectionRequest, isConnectionPending } from "@/lib/api/search"
import { useToast } from "@/components/ui/use-toast"

export default function PeopleSearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pendingConnections, setPendingConnections] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

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
        setResults(searchResults.users)

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
  }, [query])

  const handleSendRequest = async (userId: string, userName: string) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 mr-2 text-[#0077B5] dark:text-[#00A0DC]" />
        <h1 className="text-2xl font-bold">People Search Results</h1>
      </div>

      {query && <p className="text-gray-600 dark:text-gray-400 mb-6">Showing results for &quot;{query}&quot;</p>}

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
            >
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-60" />
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No people found matching your search.</p>
          <p className="text-gray-500 dark:text-gray-500">Try a different search term or browse teams instead.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <Link href={`/profile/${user.id}`} className="shrink-0">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar || "/placeholder.svg?height=64&width=64"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div>
                  <Link href={`/profile/${user.id}`} className="hover:underline">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{user.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {user.headline || (user.role === "jobseeker" ? "Job Seeker" : "Recruiter")}
                  </p>
                  {user.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {user.role !== "recruiter" && (
                  <Button
                    variant="outline"
                    className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10 dark:border-[#00A0DC] dark:text-[#00A0DC] dark:hover:bg-[#00A0DC]/10"
                    disabled={pendingConnections[user.id]}
                    onClick={() => handleSendRequest(user.id, user.name)}
                  >
                    {pendingConnections[user.id] ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Pending</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        <span>Connect</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
