"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Clock, User, MessageSquare, Eye, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for freelancer's bids
const mockFreelancerBids = [
  {
    bid: {
      id: "bid1",
      projectId: "project1",
      freelancerId: "freelancer1",
      freelancerName: "Current User",
      amount: 6500,
      currency: "USD",
      duration: "2 months",
      proposal: "I have 5+ years of experience in React and Node.js development...",
      status: "pending" as const,
      createdAt: "2024-01-16T10:00:00Z",
    },
    project: {
      id: "project1",
      title: "E-commerce Website Development",
      description: "Looking for a skilled developer to build a modern e-commerce website with React and Node.js.",
      clientId: "client1",
      clientName: "TechCorp Solutions",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      budget: { min: 5000, max: 8000, currency: "USD", type: "fixed" as const },
      duration: "2-3 months",
      skills: ["React", "Node.js", "MongoDB"],
      category: "Web Development",
      status: "open" as const,
      bids: [],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-16T14:30:00Z",
      requirements: ["Responsive design", "Payment integration"],
    },
  },
  {
    bid: {
      id: "bid2",
      projectId: "project2",
      freelancerId: "freelancer1",
      freelancerName: "Current User",
      amount: 2800,
      currency: "USD",
      duration: "1.5 months",
      proposal: "I'm a UI/UX designer with expertise in mobile app design...",
      status: "accepted" as const,
      createdAt: "2024-01-18T14:00:00Z",
    },
    project: {
      id: "project2",
      title: "Mobile App UI/UX Design",
      description: "Need a creative designer to design a mobile app for fitness tracking.",
      clientId: "client2",
      clientName: "FitLife Inc",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      budget: { min: 2000, max: 3500, currency: "USD", type: "fixed" as const },
      duration: "1-2 months",
      skills: ["UI/UX Design", "Figma", "Mobile Design"],
      category: "Design",
      status: "in_progress" as const,
      bids: [],
      createdAt: "2024-01-17T09:00:00Z",
      updatedAt: "2024-01-18T14:00:00Z",
      requirements: ["Modern design", "User-friendly interface"],
    },
  },
]

export default function MyBidsPage() {
  const [bidsData, setBidsData] = useState(mockFreelancerBids)
  const [loading, setLoading] = useState(false)

  const pendingBids = bidsData.filter((item) => item.bid.status === "pending")
  const acceptedBids = bidsData.filter((item) => item.bid.status === "accepted")
  const rejectedBids = bidsData.filter((item) => item.bid.status === "rejected")

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

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const BidCard = ({ bid, project }: { bid: any; project: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
          </div>
          <Badge className={getBidStatusColor(bid.status)}>{bid.status.toUpperCase()}</Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <DollarSign className="h-4 w-4" />
            <span>Your bid: ${bid.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{bid.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{getTimeAgo(bid.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <User className="h-4 w-4" />
            <span>{project.bids?.length || 0} total bids</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.slice(0, 4).map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {project.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.skills.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={project.clientAvatar || "/placeholder.svg"} />
              <AvatarFallback>{project.clientName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-white">{project.clientName}</p>
              <p className="text-gray-500 dark:text-gray-400">Client</p>
            </div>
          </div>

          <div className="flex gap-2">
            {bid.status === "accepted" && (
              <Button size="sm" className="bg-[#0077B5] hover:bg-[#005885]">
                <MessageSquare className="h-4 w-4 mr-1" />
                Contact Client
              </Button>
            )}
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              View Project
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Bids</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your project proposals and their status</p>
          </div>
          <Button asChild className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5]">
            <Link href="/projects">Browse Projects</Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Bids ({bidsData.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBids.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedBids.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedBids.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-6">
            {bidsData.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No bids yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Start browsing projects and submit your first bid.
                  </p>
                  <Button asChild>
                    <Link href="/projects">Browse Projects</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              bidsData.map((item) => <BidCard key={item.bid.id} bid={item.bid} project={item.project} />)
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6 mt-6">
            {pendingBids.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No pending bids</h3>
                  <p className="text-gray-600 dark:text-gray-400">All your bids have been reviewed by clients.</p>
                </CardContent>
              </Card>
            ) : (
              pendingBids.map((item) => <BidCard key={item.bid.id} bid={item.bid} project={item.project} />)
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-6 mt-6">
            {acceptedBids.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No accepted bids</h3>
                  <p className="text-gray-600 dark:text-gray-400">Keep submitting quality proposals to win projects.</p>
                </CardContent>
              </Card>
            ) : (
              acceptedBids.map((item) => <BidCard key={item.bid.id} bid={item.bid} project={item.project} />)
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6 mt-6">
            {rejectedBids.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No rejected bids</h3>
                  <p className="text-gray-600 dark:text-gray-400">Great job! Keep up the quality proposals.</p>
                </CardContent>
              </Card>
            ) : (
              rejectedBids.map((item) => <BidCard key={item.bid.id} bid={item.bid} project={item.project} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
