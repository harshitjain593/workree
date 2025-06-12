"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Award, ArrowRight } from "lucide-react"

const assessments = [
  {
    id: "js",
    name: "JavaScript",
    description: "Test your JavaScript knowledge with 20 questions",
    questions: 20,
    timeLimit: 30,
    difficulty: "Intermediate",
    popular: true,
    completed: false,
  },
  {
    id: "react",
    name: "React",
    description: "Assess your React skills with practical questions",
    questions: 15,
    timeLimit: 25,
    difficulty: "Intermediate",
    popular: true,
    completed: true,
    score: 85,
  },
  {
    id: "node",
    name: "Node.js",
    description: "Test your Node.js backend development skills",
    questions: 18,
    timeLimit: 30,
    difficulty: "Advanced",
    popular: false,
    completed: false,
  },
  {
    id: "ts",
    name: "TypeScript",
    description: "Validate your TypeScript knowledge",
    questions: 15,
    timeLimit: 25,
    difficulty: "Intermediate",
    popular: false,
    completed: true,
    score: 92,
  },
  {
    id: "css",
    name: "CSS & Styling",
    description: "Test your CSS and modern styling techniques",
    questions: 20,
    timeLimit: 20,
    difficulty: "Beginner",
    popular: true,
    completed: false,
  },
  {
    id: "algo",
    name: "Algorithms",
    description: "Solve algorithm challenges to showcase your problem-solving skills",
    questions: 10,
    timeLimit: 45,
    difficulty: "Advanced",
    popular: false,
    completed: false,
  },
]

export default function SkillAssessment() {
  const [activeTab, setActiveTab] = useState("available")

  const availableAssessments = assessments.filter((a) => !a.completed)
  const completedAssessments = assessments.filter((a) => a.completed)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Skill Assessments</CardTitle>
        <CardDescription>Validate your skills with industry-standard assessments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="available" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="available">Available Tests</TabsTrigger>
            <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableAssessments.map((assessment) => (
                <Card key={assessment.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{assessment.name}</CardTitle>
                      {assessment.popular && (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Popular</Badge>
                      )}
                    </div>
                    <CardDescription>{assessment.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{assessment.questions} questions</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{assessment.timeLimit} minutes</span>
                      </div>
                      <div>
                        <Badge variant="outline">{assessment.difficulty}</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-[#0077B5] hover:bg-[#005885]">Start Assessment</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {availableAssessments.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium">All caught up!</h3>
                <p className="text-gray-500 mt-1">You've completed all available assessments.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedAssessments.map((assessment) => (
                <Card key={assessment.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-lg">{assessment.name}</h3>
                        <p className="text-sm text-gray-500">Completed on May 10, 2023</p>
                      </div>

                      <div className="flex items-center">
                        <div className="mr-4">
                          <div className="text-2xl font-bold text-[#0077B5]">{assessment.score}%</div>
                          <div className="text-xs text-gray-500">Your Score</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm font-medium">
                            {assessment.score >= 90
                              ? "Expert"
                              : assessment.score >= 80
                                ? "Advanced"
                                : assessment.score >= 70
                                  ? "Intermediate"
                                  : "Beginner"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your performance</span>
                        <span>Top 15%</span>
                      </div>
                      <Progress value={assessment.score} className="h-2" />
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="flex items-center">
                        View Certificate
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {completedAssessments.length === 0 && (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium">No completed assessments</h3>
                <p className="text-gray-500 mt-1">Take an assessment to showcase your skills to recruiters.</p>
                <Button onClick={() => setActiveTab("available")} variant="link" className="mt-2">
                  View available assessments
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
