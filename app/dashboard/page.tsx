"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import type { Profile } from "@/redux/features/profileSlice"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Bell,
  Calendar,
  FileText,
  ChevronRight,
  BarChart,
  TrendingUp,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Zap,
  Award,
  Star,
  MapPin,
  Plus,
  Eye,
  Search,
  FolderOpen,
  BadgeIcon as BidIcon,
  Building,
  DollarSign,
  User,
  FolderPlus,
  MessageSquare,
  Activity,
  Lightbulb,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateTeamDialog } from "@/components/teams/create-team-dialog"

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { profile } = useSelector((state: RootState) => state.profile)

  const [profileCompletion, setProfileCompletion] = useState(0)
  const [jobMatchScore, setJobMatchScore] = useState(0)
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false)

  // Job Seeker specific data
  const [myBids, setMyBids] = useState([
    {
      id: "bid1",
      projectTitle: "E-commerce Website Development",
      clientName: "TechCorp Solutions",
      bidAmount: 6500,
      status: "pending",
      submittedDate: "2024-01-16",
      projectDescription: "Looking for a skilled developer to build a modern e-commerce platform with React and Node.js",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      deadline: "2024-02-15",
      clientRating: 4.8,
    },
    {
      id: "bid2",
      projectTitle: "Mobile App UI/UX Design",
      clientName: "FitLife Inc",
      bidAmount: 2800,
      status: "accepted",
      submittedDate: "2024-01-18",
      projectDescription: "Design a fitness tracking mobile app with modern UI/UX principles",
      skills: ["UI/UX", "Figma", "Mobile Design", "Prototyping"],
      deadline: "2024-02-20",
      clientRating: 4.5,
    },
    {
      id: "bid3",
      projectTitle: "AI Chatbot Development",
      clientName: "AI Solutions Ltd",
      bidAmount: 4500,
      status: "pending",
      submittedDate: "2024-01-20",
      projectDescription: "Develop an AI-powered chatbot for customer service using Python and TensorFlow",
      skills: ["Python", "TensorFlow", "NLP", "Machine Learning"],
      deadline: "2024-02-25",
      clientRating: 4.7,
    }
  ])

  // Add new state for job seeker's project statistics
  const [projectStats, setProjectStats] = useState({
    totalBids: 12,
    activeBids: 5,
    acceptedBids: 3,
    totalEarnings: 12500,
    averageBidAmount: 3200,
    successRate: 75,
  })

  // Add new state for recent activities
  const [recentActivities, setRecentActivities] = useState([
    {
      id: "act1",
      type: "bid_submitted",
      projectTitle: "E-commerce Website Development",
      date: "2024-01-16",
      status: "pending",
    },
    {
      id: "act2",
      type: "bid_accepted",
      projectTitle: "Mobile App UI/UX Design",
      date: "2024-01-18",
      status: "accepted",
    },
    {
      id: "act3",
      type: "bid_submitted",
      projectTitle: "AI Chatbot Development",
      date: "2024-01-20",
      status: "pending",
    },
  ])

  // Add new state for skill recommendations
  const [skillRecommendations, setSkillRecommendations] = useState([
    {
      skill: "GraphQL",
      matchScore: 85,
      demand: "High",
      reason: "Frequently required in modern web development projects",
    },
    {
      skill: "Docker",
      matchScore: 80,
      demand: "High",
      reason: "Essential for containerization and deployment",
    },
    {
      skill: "AWS",
      matchScore: 75,
      demand: "High",
      reason: "Cloud computing skills are in high demand",
    },
  ])

  // Company Admin specific data
  const [myJobs, setMyJobs] = useState([
    {
      id: "job1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      applicants: 24,
      status: "active",
      postedDate: "2024-01-15",
    },
    {
      id: "job2",
      title: "UI/UX Designer",
      department: "Design",
      applicants: 18,
      status: "active",
      postedDate: "2024-01-18",
    },
  ])

  const [myProjects, setMyProjects] = useState([
    {
      id: "project1",
      title: "E-commerce Website Development",
      budget: { min: 5000, max: 8000 },
      bidsCount: 12,
      status: "open",
      postedDate: "2024-01-15",
    },
    {
      id: "project2",
      title: "Mobile App UI/UX Design",
      budget: { min: 2000, max: 3500 },
      bidsCount: 8,
      status: "in_progress",
      postedDate: "2024-01-17",
    },
  ])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (profile) {
      // Calculate profile completion percentage
      let completion = 0

      // Basic info - 20%
      if (profile.name) completion += 5
      if (profile.email) completion += 5
      if (profile.phone) completion += 5
      if (profile.location) completion += 5

      // Skills - 20%
      if (profile.skills?.length > 0) {
        completion += Math.min(20, profile.skills.length * 2)
      }

      // Experience - 20%
      if (profile.experience?.length > 0) {
        completion += Math.min(20, profile.experience.length * 10)
      }

      // Education - 15%
      if (profile.education?.length > 0) {
        completion += Math.min(15, profile.education.length * 7.5)
      }

      // Projects - 15%
      if (profile.projects?.length > 0) {
        completion += Math.min(15, profile.projects.length * 5)
      }

      // Additional info - 10%
      if (profile.certifications?.length > 0) completion += 5
      if (profile.languages?.length > 0) completion += 5

      setProfileCompletion(completion)

      // Calculate job match score based on profile strength
      setJobMatchScore(Math.min(100, completion * 1.2))
    }
  }, [profile])

  // Mock data for both roles
  const recentMessages = [
    {
      id: "msg1",
      sender: "John Doe",
      company: "Tech Solutions Inc.",
      message:
        user?.role === "company_admin"
          ? "Interested in the Frontend Developer position. Can we schedule an interview?"
          : "Thanks for your application. We would like to schedule an interview.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "msg2",
      sender: "Sarah Johnson",
      company: "Innovate Labs",
      message:
        user?.role === "company_admin"
          ? "Your project posting looks great. I'd like to submit a proposal."
          : "Your profile looks impressive. Are you available for a quick call?",
      time: "1 day ago",
      unread: false,
    },
  ]

  const upcomingInterviews =
    user?.role === "jobseeker"
      ? [
          {
            id: "int1",
            company: "Tech Solutions Inc.",
            position: "Senior Frontend Developer",
            date: "May 15, 2023",
            time: "10:00 AM",
            type: "Video Call",
          },
          {
            id: "int2",
            company: "Innovate Labs",
            position: "React Developer",
            date: "May 18, 2023",
            time: "2:30 PM",
            type: "In-person",
          },
        ]
      : [
          {
            id: "int1",
            candidate: "Alice Smith",
            position: "Senior Frontend Developer",
            date: "May 15, 2023",
            time: "10:00 AM",
            type: "Video Call",
          },
          {
            id: "int2",
            candidate: "Bob Johnson",
            position: "UI/UX Designer",
            date: "May 18, 2023",
            time: "2:30 PM",
            type: "In-person",
          },
        ]

  const jobApplications = [
    {
      id: "job1",
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Developer",
      status: "Interview",
      appliedDate: "May 5, 2023",
    },
    {
      id: "job2",
      company: "Innovate Labs",
      position: "React Developer",
      status: "Interview",
      appliedDate: "May 3, 2023",
    },
    {
      id: "job3",
      company: "Global Systems",
      position: "Full Stack Developer",
      status: "Application Sent",
      appliedDate: "May 1, 2023",
    },
    {
      id: "job4",
      company: "Future Tech",
      position: "UI/UX Developer",
      status: "Rejected",
      appliedDate: "April 25, 2023",
    },
  ]

  const recommendedJobs = [
    {
      id: "rec1",
      company: "Digital Innovations",
      position: "Frontend Developer",
      location: "Remote",
      salary: "$90,000 - $120,000",
      match: "95%",
      skills: ["React", "TypeScript", "Next.js"],
      posted: "2 days ago",
      applicants: 24,
    },
    {
      id: "rec2",
      company: "Creative Solutions",
      position: "React Developer",
      location: "New York, NY",
      salary: "$100,000 - $130,000",
      match: "90%",
      skills: ["React", "Redux", "JavaScript"],
      posted: "1 week ago",
      applicants: 56,
    },
    {
      id: "rec3",
      company: "Tech Ventures",
      position: "Full Stack Developer",
      location: "San Francisco, CA",
      salary: "$110,000 - $140,000",
      match: "85%",
      skills: ["React", "Node.js", "MongoDB"],
      posted: "3 days ago",
      applicants: 38,
    },
  ]

  const myTeams = [
    {
      id: "team1",
      name: "Web Wizards",
      members: 4,
      description: "A team of frontend specialists focused on creating beautiful, responsive web applications.",
      skills: ["React", "Next.js", "TypeScript", "UI/UX"],
      avatar: "/placeholder.svg?height=60&width=60",
      active: true,
    },
    {
      id: "team2",
      name: "Full Stack Heroes",
      members: 3,
      description: "End-to-end development team with expertise in modern web technologies.",
      skills: ["Node.js", "React", "MongoDB", "AWS"],
      avatar: "/placeholder.svg?height=60&width=60",
      active: true,
    },
  ]

  const skillAssessments = [
    {
      id: "skill1",
      name: "JavaScript",
      status: "Completed",
      score: 85,
      percentile: 92,
    },
    {
      id: "skill2",
      name: "React",
      status: "Completed",
      score: 78,
      percentile: 84,
    },
    {
      id: "skill3",
      name: "TypeScript",
      status: "Not Started",
      score: null,
      percentile: null,
    },
    {
      id: "skill4",
      name: "Node.js",
      status: "Not Started",
      score: null,
      percentile: null,
    },
  ]

  const learningResources = [
    {
      id: "course1",
      title: "Advanced React Patterns",
      provider: "Frontend Masters",
      duration: "4 hours",
      level: "Advanced",
    },
    {
      id: "course2",
      title: "TypeScript for React Developers",
      provider: "Udemy",
      duration: "6 hours",
      level: "Intermediate",
    },
    {
      id: "course3",
      title: "System Design for Frontend Engineers",
      provider: "Educative",
      duration: "8 hours",
      level: "Advanced",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview":
      case "active":
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Application Sent":
      case "pending":
      case "open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Rejected":
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Completed":
      case "in_progress":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Not Started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Calculate stats for Company Admin
  const totalJobApplicants = myJobs.reduce((sum, job) => sum + job.applicants, 0)
  const totalProjectBudget = myProjects.reduce((sum, project) => sum + project.budget.max, 0)
  const totalProjectBids = myProjects.reduce((sum, project) => sum + project.bidsCount, 0)

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">My Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name || "User"}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild className="dark:border-gray-700 dark:text-gray-300">
              <Link href={profile ? "/profile/me" : "/profile"}>
                <FileText className="mr-2 h-4 w-4" />
                {profile ? "View Profile" : "Create Profile"}
              </Link>
            </Button>
            <Button className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5]" asChild>
              <Link href="/jobs">
                <Briefcase className="mr-2 h-4 w-4" />
                Find Jobs
              </Link>
            </Button>
          </div>
        </div>

        {!profile && (
          <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-full">
                  <Bell className="h-6 w-6 text-orange-500 dark:text-orange-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 dark:text-white">Complete Your Profile</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your profile is incomplete. Complete your profile to increase your chances of getting noticed by recruiters.
                  </p>
                  <Button asChild className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5]">
                    <Link href="/profile">Complete Profile</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Stats Cards */}
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800/50 dark-card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Profile Completion</p>
                    <h3 className="text-2xl font-bold mt-1 dark:text-white">{profileCompletion}%</h3>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <Progress value={profileCompletion} className="h-2 mt-4 dark:bg-blue-900/50" />
                <div className="mt-4">
                  <Button variant="link" className="text-blue-600 dark:text-blue-400 p-0 h-auto" asChild>
                    <Link href="/profile">
                      Complete Profile <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 dark:bg-gradient-to-br dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800/50 dark-card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Job Match Score</p>
                    <h3 className="text-2xl font-bold mt-1 dark:text-white">{jobMatchScore}%</h3>
                  </div>
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <Progress value={jobMatchScore} className="h-2 mt-4 bg-green-100 dark:bg-green-900/50" />
                <div className="mt-4">
                  <Button variant="link" className="text-green-600 dark:text-green-400 p-0 h-auto">
                    Improve Score <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100 dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-violet-900/20 dark:border-purple-800/50 dark-card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Profile Views</p>
                    <h3 className="text-2xl font-bold mt-1 dark:text-white">124</h3>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400 mr-1" />
                  <span className="text-sm text-green-600 dark:text-green-400">+12% from last week</span>
                </div>
                <div className="mt-4">
                  <Button variant="link" className="text-purple-600 dark:text-purple-400 p-0 h-auto" asChild>
                    <Link href="/profile/me">
                      View Profile <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100 dark:bg-gradient-to-br dark:from-amber-900/20 dark:to-yellow-900/20 dark:border-amber-800/50 dark-card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Applications</p>
                    <h3 className="text-2xl font-bold mt-1 dark:text-white">{jobApplications.length}</h3>
                  </div>
                  <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-full">
                    <Briefcase className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last application 2 days ago</span>
                </div>
                <div className="mt-4">
                  <Button variant="link" className="text-amber-600 dark:text-amber-400 p-0 h-auto">
                    View Applications <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="teams" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-6 dark:bg-gray-800">
            <TabsTrigger value="teams" className="dark:data-[state=active]:bg-[#00A0DC] dark:data-[state=active]:text-white">
              My Teams
            </TabsTrigger>
            <TabsTrigger value="projects" className="dark:data-[state=active]:bg-[#00A0DC] dark:data-[state=active]:text-white">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="applications" className="dark:data-[state=active]:bg-[#00A0DC] dark:data-[state=active]:text-white">
              Applications
            </TabsTrigger>
            <TabsTrigger value="messages" className="dark:data-[state=active]:bg-[#00A0DC] dark:data-[state=active]:text-white">
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-[#00A0DC]" />
                  My Teams
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateTeamDialog(true)}
                  className="flex items-center gap-1 border-[#00A0DC] text-[#00A0DC] hover:bg-[#00A0DC]/10"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Team</span>
                </Button>
              </div>

              {myTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myTeams.map((team) => (
                    <Card
                      key={team.id}
                      className="dark:bg-gray-800 dark:border-gray-700 dark-card-hover overflow-hidden"
                    >
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border dark:border-gray-700">
                            <AvatarImage src={team.avatar || "/placeholder.svg"} alt={team.name} />
                            <AvatarFallback className="bg-[#00A0DC]/20 text-[#00A0DC]">
                              {team.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg dark:text-white">{team.name}</CardTitle>
                            <CardDescription className="dark:text-gray-400">{team.members} members</CardDescription>
                          </div>
                        </div>
                        <Badge
                          className={team.active ? "bg-green-500 dark:bg-green-600" : "bg-gray-500 dark:bg-gray-600"}
                        >
                          {team.active ? "Active" : "Inactive"}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{team.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {team.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 border-t dark:border-gray-700">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#00A0DC] hover:text-[#0077B5] hover:bg-[#00A0DC]/10"
                          asChild
                        >
                          <Link href={`/teams/${team.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#00A0DC] hover:text-[#0077B5] hover:bg-[#00A0DC]/10"
                          asChild
                        >
                          <Link href={`/teams/${team.id}/edit`}>Edit</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

                  {/* Create Team Card */}
                  <Card
                    className="dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-[#00A0DC]/50 dark:hover:bg-gray-800/80 cursor-pointer transition-all group h-full flex flex-col justify-center"
                    onClick={() => setShowCreateTeamDialog(true)}
                  >
                    <CardContent className="flex flex-col items-center justify-center text-center p-6 h-full">
                      <div className="w-16 h-16 rounded-full bg-[#00A0DC]/10 flex items-center justify-center mb-4 group-hover:bg-[#00A0DC]/20 transition-colors">
                        <Plus className="h-8 w-8 text-[#00A0DC]" />
                      </div>
                      <h3 className="text-lg font-medium dark:text-white mb-2">Create a New Team</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Collaborate with others and showcase your collective skills
                      </p>
                      <Button className="bg-[#00A0DC] hover:bg-[#0077B5] group-hover:scale-105 transition-transform">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="dark:bg-gray-800/50 dark:border-gray-700">
                  <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-[#00A0DC]/10 flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-[#00A0DC]" />
                    </div>
                    <h3 className="text-lg font-medium dark:text-white mb-2">No Teams Yet</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
                      Create or join a team to collaborate with others, showcase your collective skills, and find
                      opportunities together.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button className="bg-[#00A0DC] hover:bg-[#0077B5]" onClick={() => setShowCreateTeamDialog(true)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Create Team
                      </Button>
                      <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300" asChild>
                        <Link href="/teams">
                          <Search className="h-4 w-4 mr-1" />
                          Find Teams
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold dark:text-white flex items-center">
                  <BidIcon className="h-5 w-5 mr-2 text-[#00A0DC]" />
                  My Project Bids
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-[#00A0DC] text-[#00A0DC] hover:bg-[#00A0DC]/10"
                  >
                    <Link href="/projects">
                      <FolderOpen className="h-4 w-4 mr-1" />
                      Browse Projects
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-[#00A0DC] text-[#00A0DC] hover:bg-[#00A0DC]/10"
                  >
                    <Link href="/projects/bids">
                      <BarChart className="h-4 w-4 mr-1" />
                      View Statistics
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Project Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Bids</p>
                        <h3 className="text-2xl font-bold dark:text-white">{projectStats.totalBids}</h3>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                        <BidIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Active: {projectStats.activeBids}</span>
                        <span className="text-green-500 dark:text-green-400">Accepted: {projectStats.acceptedBids}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
                        <h3 className="text-2xl font-bold dark:text-white">${projectStats.totalEarnings.toLocaleString()}</h3>
                      </div>
                      <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Avg. Bid: ${projectStats.averageBidAmount}</span>
                        <span className="text-green-500 dark:text-green-400">Success Rate: {projectStats.successRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Recent Activity</p>
                        <h3 className="text-2xl font-bold dark:text-white">{recentActivities.length}</h3>
                      </div>
                      <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Last 7 days</span>
                        <span className="text-purple-500 dark:text-purple-400">View All</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Bids List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myBids.map((bid) => (
                  <Card key={bid.id} className="dark:bg-gray-800 dark:border-gray-700 dark-card-hover">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg dark:text-white">{bid.projectTitle}</CardTitle>
                          <CardDescription className="dark:text-gray-400">Client: {bid.clientName}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(bid.status)}>{bid.status.toUpperCase()}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{bid.projectDescription}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {bid.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Your Bid:</span>
                          <span className="font-semibold dark:text-white">${bid.bidAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Deadline:</span>
                          <span className="dark:text-gray-300">{new Date(bid.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Client Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="dark:text-gray-300">{bid.clientRating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 border-t dark:border-gray-700">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#00A0DC] hover:text-[#0077B5] hover:bg-[#00A0DC]/10"
                      >
                        View Details
                      </Button>
                      {bid.status === "accepted" && (
                        <Button size="sm" className="bg-[#00A0DC] hover:bg-[#0077B5]">
                          Contact Client
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Skill Recommendations */}
              <div className="mt-8">
                <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-[#00A0DC]" />
                  Skill Recommendations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillRecommendations.map((skill) => (
                    <Card key={skill.skill} className="dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold dark:text-white">{skill.skill}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Match Score: {skill.matchScore}%</p>
                          </div>
                          <Badge
                            variant={skill.demand === "High" ? "default" : "secondary"}
                            className={skill.demand === "High" ? "bg-green-500" : "bg-gray-500"}
                          >
                            {skill.demand} Demand
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{skill.reason}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Applied Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {jobApplications.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium dark:text-white">{job.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{job.position}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {job.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm" className="dark:text-gray-300 dark:hover:bg-gray-700">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentMessages.map((message) => (
                <Card
                  key={message.id}
                  className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark-card-hover"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg dark:text-white">{message.sender}</CardTitle>
                        <CardDescription className="dark:text-gray-400">{message.company}</CardDescription>
                      </div>
                      {message.unread && (
                        <Badge className="bg-[#00A0DC] text-white">New</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{message.message}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {message.time}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t dark:border-gray-700 pt-3">
                    <Button variant="outline" size="sm" className="dark:border-gray-700 dark:text-gray-300">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5]"
                    >
                      View Chat
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Team Dialog */}
      <CreateTeamDialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog} />
    </>
  )
}
