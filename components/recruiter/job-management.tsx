"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical, Edit, Trash2, Eye, PauseCircle, PlayCircle, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock job data
const mockJobs = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "active",
    postedDate: "2023-05-15",
    applications: 24,
    views: 345,
  },
  {
    id: "job2",
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    status: "active",
    postedDate: "2023-05-20",
    applications: 18,
    views: 289,
  },
  {
    id: "job3",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    status: "paused",
    postedDate: "2023-05-10",
    applications: 12,
    views: 178,
  },
  {
    id: "job4",
    title: "Product Manager",
    company: "InnovateCo",
    location: "New York, NY",
    type: "Full-time",
    status: "closed",
    postedDate: "2023-04-25",
    applications: 32,
    views: 412,
  },
  {
    id: "job5",
    title: "Backend Developer",
    company: "DataSystems",
    location: "Chicago, IL",
    type: "Full-time",
    status: "draft",
    postedDate: "2023-05-22",
    applications: 0,
    views: 0,
  },
]

interface JobManagementProps {
  recruiterId?: string
  userId?: string
}

export default function JobManagement({ recruiterId, userId }: JobManagementProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  // Filter jobs based on search term
  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Count jobs by status
  const jobCounts = {
    all: filteredJobs.length,
    active: filteredJobs.filter((job) => job.status === "active").length,
    paused: filteredJobs.filter((job) => job.status === "paused").length,
    closed: filteredJobs.filter((job) => job.status === "closed").length,
    draft: filteredJobs.filter((job) => job.status === "draft").length,
  }

  // Handle job deletion
  const handleDeleteJob = (jobId: string) => {
    setJobToDelete(jobId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the job
    console.log(`Deleting job ${jobToDelete}`)
    setDeleteDialogOpen(false)
    setJobToDelete(null)
    // Then refresh the job list
  }

  // Handle job status change
  const handleStatusChange = (jobId: string, newStatus: string) => {
    // In a real app, you would call an API to update the job status
    console.log(`Changing job ${jobId} status to ${newStatus}`)
    // Then refresh the job list
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="relative w-full md:w-auto md:flex-grow md:mr-4 mb-4 md:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="w-full md:w-auto bg-[#0077B5] hover:bg-[#005885]" onClick={() => router.push("/jobs/post")}>
          Post New Job
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({jobCounts.all})</TabsTrigger>
          <TabsTrigger value="active">Active ({jobCounts.active})</TabsTrigger>
          <TabsTrigger value="paused">Paused ({jobCounts.paused})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({jobCounts.closed})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({jobCounts.draft})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <JobList
            jobs={filteredJobs}
            onDelete={handleDeleteJob}
            onStatusChange={handleStatusChange}
            onEdit={(jobId) => router.push(`/jobs/${jobId}/edit`)}
            onView={(jobId) => router.push(`/jobs/${jobId}`)}
          />
        </TabsContent>

        <TabsContent value="active">
          <JobList
            jobs={filteredJobs.filter((job) => job.status === "active")}
            onDelete={handleDeleteJob}
            onStatusChange={handleStatusChange}
            onEdit={(jobId) => router.push(`/jobs/${jobId}/edit`)}
            onView={(jobId) => router.push(`/jobs/${jobId}`)}
          />
        </TabsContent>

        <TabsContent value="paused">
          <JobList
            jobs={filteredJobs.filter((job) => job.status === "paused")}
            onDelete={handleDeleteJob}
            onStatusChange={handleStatusChange}
            onEdit={(jobId) => router.push(`/jobs/${jobId}/edit`)}
            onView={(jobId) => router.push(`/jobs/${jobId}`)}
          />
        </TabsContent>

        <TabsContent value="closed">
          <JobList
            jobs={filteredJobs.filter((job) => job.status === "closed")}
            onDelete={handleDeleteJob}
            onStatusChange={handleStatusChange}
            onEdit={(jobId) => router.push(`/jobs/${jobId}/edit`)}
            onView={(jobId) => router.push(`/jobs/${jobId}`)}
          />
        </TabsContent>

        <TabsContent value="draft">
          <JobList
            jobs={filteredJobs.filter((job) => job.status === "draft")}
            onDelete={handleDeleteJob}
            onStatusChange={handleStatusChange}
            onEdit={(jobId) => router.push(`/jobs/${jobId}/edit`)}
            onView={(jobId) => router.push(`/jobs/${jobId}`)}
          />
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface JobListProps {
  jobs: any[]
  onDelete: (jobId: string) => void
  onStatusChange: (jobId: string, newStatus: string) => void
  onEdit: (jobId: string) => void
  onView: (jobId: string) => void
}

function JobList({ jobs, onDelete, onStatusChange, onEdit, onView }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No jobs found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="p-4 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-1">
                <h3 className="font-semibold text-lg dark:text-white">{job.title}</h3>
                <StatusBadge status={job.status} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {job.company} • {job.location} • {job.type}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs">
                Posted on {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-lg font-semibold dark:text-white">{job.applications}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Applications</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold dark:text-white">{job.views}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Views</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-shrink-0" onClick={() => onView(job.id)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost" className="flex-shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(job.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {job.status === "active" ? (
                      <DropdownMenuItem onClick={() => onStatusChange(job.id, "paused")}>
                        <PauseCircle className="h-4 w-4 mr-2" />
                        Pause
                      </DropdownMenuItem>
                    ) : job.status === "paused" || job.status === "closed" ? (
                      <DropdownMenuItem onClick={() => onStatusChange(job.id, "active")}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Activate
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem onClick={() => router.push(`/jobs/${job.id}/applicants`)}>
                      <Users className="h-4 w-4 mr-2" />
                      View Applicants
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => onDelete(job.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    paused: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    draft: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  }

  const statusText = {
    active: "Active",
    paused: "Paused",
    closed: "Closed",
    draft: "Draft",
  }

  return (
    <Badge variant="secondary" className={`ml-2 ${statusStyles[status as keyof typeof statusStyles]}`}>
      {statusText[status as keyof typeof statusText]}
    </Badge>
  )
}
