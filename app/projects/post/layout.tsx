"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"

export default function PostProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for auth state to be loaded
    if (isAuthenticated !== undefined && user !== undefined) {
      setIsLoading(false)

      // Redirect if not authenticated
      if (!isAuthenticated) {
        router.push("/login")
        return
      }

      // Check if user is a company admin
      if (user?.role !== "company_admin") {
        console.log("User role:", user?.role, "- redirecting to projects")
        router.push("/projects")
        return
      }
    }
  }, [isAuthenticated, user, router])

  // Show loading state while checking authentication
  if (isLoading || !isAuthenticated || user?.role !== "company_admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0077B5]"></div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
