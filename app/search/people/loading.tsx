import { Skeleton } from "@/components/ui/skeleton"
import { User } from "lucide-react"

export default function PeopleSearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 mr-2 text-[#0077B5] dark:text-[#00A0DC]" />
        <h1 className="text-2xl font-bold">People Search Results</h1>
      </div>

      <Skeleton className="h-6 w-64 mb-6" />

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
    </div>
  )
}
