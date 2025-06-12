"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Clock, User, Eye, MessageSquare, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/types/project"

// Mock data for client's projects
const mockClientProjects: Project[] = [
  {
    id: "project1",
    title: "E-commerce Website Development",
    description: "Looking for a skilled developer to build a modern e-commerce website with React and Node.js.",
    clientId: "client1",
    clientName: "TechCorp Solutions",
    budget: { min: 5000, max: 8000, currency: "USD", type: "fixed" },
    duration: "2-3 months",
    skills: ["React", "Node.js", "MongoDB"],
    category: "Web Development",
    status: "open",
    bids: [
      {
        id: "bid1",
        projectId: "project1",
        freelancerId: "freelancer1",
        freelancerName: "John Developer",
        freelancerAvatar: "/placeholder.svg?height=40&width=40",
        amount: 6500,
        currency: "USD",
        duration: "2 months",
        proposal: "I have 5+ years of experience in React and Node.js development...",
        status: "pending",
        createdAt: "2024-01-16T10:00:00Z",
      },
      {
        id: "bid2",
        projectId: "project1",
        freelancerId: "freelancer2",
        freelancerName: "Sarah Designer",
        freelancerAvatar: "/placeholder.svg?height=40&width=40",
        amount: 7200,
        currency: "USD",
        duration: "2.5 months",
        proposal: "I specialize in full-stack development with modern technologies...",
        status: "pending",
        createdAt: "2024-01-16T14:30:00Z",
      },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-16T14:30:00Z",
    requirements: ["Responsive design", "Payment integration"],
  },
]

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockClientProjects)

  const handleAcceptBid = async (projectId: string, bidId: string) => {
    // Update bid status to accepted
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            bids: project.bids.map((bid) => ({
              ...bid,
              status: bid.id === bidId ? "accepted" : bid.status === "pending" ? "rejected" : bid.status,
            })),
            status: "in_progress",
          }
        }
        return project
      }),
    )
  }

  const handleRejectBid = async (projectId: string, bidId: string) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            bids: project.bids.map((bid) => (bid.id === bidId ? { ...bid, status: "rejected" } : bid)),
          }
        }
        return project
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getBidStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Projects</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your posted projects and review bids</p>
          </div>
          <Button asChild className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5]">
            <Link href="/projects/post">Post New Project</Link>
          </Button>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <CardDescription className="mb-4">{project.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>
                      ${project.budget.min.toLocaleString()}-${project.budget.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{project.bids.length} bids received</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="bids" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="bids">Bids ({project.bids.length})</TabsTrigger>
                    <TabsTrigger value="details">Project Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="bids" className="space-y-4">
                    {project.bids.length === 0 ? (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No bids yet</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Your project is live. Freelancers will start bidding soon.
                        </p>
                      </div>
                    ) : (
                      project.bids.map((bid) => (
                        <Card key={bid.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={bid.freelancerAvatar || "/placeholder.svg"} />
                                  <AvatarFallback>{bid.freelancerName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold">{bid.freelancerName}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Bid: ${bid.amount.toLocaleString()} • {bid.duration}
                                  </p>
                                </div>
                              </div>
                              <Badge className={getBidStatusColor(bid.status)}>{bid.status.toUpperCase()}</Badge>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-4">{bid.proposal}</p>

                            {bid.status === "pending" && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleAcceptBid(project.id, bid.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Accept
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleRejectBid(project.id, bid.id)}>
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                              </div>
                            )}

                            {bid.status === "accepted" && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Contact Freelancer
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Profile
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Project Category</h4>
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                          {project.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Project Timeline</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Posted: {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Duration: {project.duration}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
