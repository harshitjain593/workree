"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowUp, ArrowDown, TrendingUp, Users, Eye, Clock, Search, BarChart4, PieChart } from "lucide-react"

export default function AnalyticsPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
      <p className="text-gray-600 mb-8">Track your job search performance and profile metrics</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Profile Views</p>
                <h3 className="text-2xl font-bold mt-1">247</h3>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>32% </span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <Eye className="h-6 w-6 text-[#0077B5]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Applications</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>8% </span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-full">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Interviews</p>
                <h3 className="text-2xl font-bold mt-1">4</h3>
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>5% </span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Response Rate</p>
                <h3 className="text-2xl font-bold mt-1">33%</h3>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>12% </span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="profile">Profile Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Application Activity</CardTitle>
                <CardDescription>Your job application activity over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <BarChart4 className="h-40 w-40 text-gray-300" />
                <div className="text-center text-gray-500">Activity chart visualization would appear here</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Current status of your applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span>Applied</span>
                    </div>
                    <span className="font-medium">8</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span>In Review</span>
                    </div>
                    <span className="font-medium">3</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Interview</span>
                    </div>
                    <span className="font-medium">4</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span>Offer</span>
                    </div>
                    <span className="font-medium">1</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>Rejected</span>
                    </div>
                    <span className="font-medium">2</span>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <PieChart className="h-40 w-40 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Metrics</CardTitle>
                <CardDescription>Average response and process times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Average Response Time</span>
                      <span className="text-sm font-medium">5 days</span>
                    </div>
                    <Progress value={50} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Industry average: 10 days</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Time to Interview</span>
                      <span className="text-sm font-medium">14 days</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Industry average: 20 days</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Total Hiring Process</span>
                      <span className="text-sm font-medium">32 days</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Industry average: 45 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Skills in Demand</CardTitle>
                <CardDescription>Skills most requested in your job searches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">React</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">TypeScript</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Next.js</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Node.js</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">GraphQL</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Insights</CardTitle>
                <CardDescription>Detailed breakdown of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Applications by Industry</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Technology</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Finance</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Healthcare</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other</span>
                          <span className="font-medium">5%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Applications by Job Type</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Full-time</span>
                          <span className="font-medium">75%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contract</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Part-time</span>
                          <span className="font-medium">5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Freelance</span>
                          <span className="font-medium">5%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Applications by Location</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Remote</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>San Francisco</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>New York</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other</span>
                          <span className="font-medium">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Recent Applications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Senior Frontend Developer</h4>
                          <p className="text-sm text-gray-500">Tech Solutions Inc.</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Applied</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">React Developer</h4>
                          <p className="text-sm text-gray-500">Innovate Labs</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Full Stack Developer</h4>
                          <p className="text-sm text-gray-500">Global Systems</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Interview</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">UI/UX Developer</h4>
                          <p className="text-sm text-gray-500">Future Tech</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
                <CardDescription>Factors affecting your application success rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Application Success Factors</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Skills Match</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">Your skills match with job requirements</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Experience Relevance</span>
                          <span className="text-sm font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">Relevance of your experience to job requirements</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Application Timing</span>
                          <span className="text-sm font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">How quickly you applied after job posting</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Resume Optimization</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">How well your resume matches job keywords</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Performance</CardTitle>
                <CardDescription>How your profile is performing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500">Profile Views Over Time</h3>
                    <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg">
                      <BarChart4 className="h-20 w-20 text-gray-300" />
                      <div className="text-center text-gray-500">Profile views chart would appear here</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500">Viewer Demographics</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">By Industry</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Technology</span>
                              <span className="text-sm font-medium">65%</span>
                            </div>
                            <Progress value={65} className="h-1.5" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Finance</span>
                              <span className="text-sm font-medium">20%</span>
                            </div>
                            <Progress value={20} className="h-1.5" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Healthcare</span>
                              <span className="text-sm font-medium">15%</span>
                            </div>
                            <Progress value={15} className="h-1.5" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">By Role</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Recruiters</span>
                              <span className="text-sm font-medium">45%</span>
                            </div>
                            <Progress value={45} className="h-1.5" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Hiring Managers</span>
                              <span className="text-sm font-medium">30%</span>
                            </div>
                            <Progress value={30} className="h-1.5" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Other Professionals</span>
                              <span className="text-sm font-medium">25%</span>
                            </div>
                            <Progress value={25} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Profile Completion</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Overall Completion</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Basic Information</span>
                          <span className="text-sm font-medium">100%</span>
                        </div>
                        <Progress value={100} className="h-1.5" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Skills</span>
                          <span className="text-sm font-medium">90%</span>
                        </div>
                        <Progress value={90} className="h-1.5" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Experience</span>
                          <span className="text-sm font-medium">100%</span>
                        </div>
                        <Progress value={100} className="h-1.5" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Education</span>
                          <span className="text-sm font-medium">100%</span>
                        </div>
                        <Progress value={100} className="h-1.5" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Projects</span>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <Progress value={75} className="h-1.5" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Additional Info</span>
                          <span className="text-sm font-medium">50%</span>
                        </div>
                        <Progress value={50} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Optimization Tips</CardTitle>
                <CardDescription>Suggestions to improve your profile visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Add more projects to your portfolio</h4>
                      <p className="text-sm text-blue-600 mt-1">
                        Profiles with 3+ projects get 40% more views from recruiters.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Complete your certifications section</h4>
                      <p className="text-sm text-green-600 mt-1">
                        Adding relevant certifications can increase your profile visibility by 20%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="bg-yellow-100 p-1.5 rounded-full">
                      <Search className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-800">Add more industry-specific keywords</h4>
                      <p className="text-sm text-yellow-600 mt-1">
                        Including relevant keywords can make your profile appear in 70% more searches.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
