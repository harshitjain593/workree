"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeAnalyzer from "@/components/features/resume-analyzer"
import SkillAssessment from "@/components/features/skill-assessment"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Send, Briefcase, Lightbulb, MessageSquare, BarChart } from "lucide-react"

export default function ToolsPage() {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState("resume")
  const [coverLetterPrompt, setCoverLetterPrompt] = useState("")
  const [coverLetterResult, setCoverLetterResult] = useState("")
  const [generating, setGenerating] = useState(false)

  // Redirect if not authenticated
  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/login")
    return null
  }

  const handleGenerateCoverLetter = () => {
    if (!coverLetterPrompt) return

    setGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setCoverLetterResult(`
Dear Hiring Manager,

I am writing to express my interest in the Frontend Developer position at Tech Innovations Inc. With over 5 years of experience building responsive and user-friendly web applications using React, Next.js, and TypeScript, I believe I would be a valuable addition to your team.

In my current role at Digital Solutions, I've led the development of several key projects that improved user engagement by 35% and reduced load times by 40%. I'm particularly proud of implementing a component library that streamlined our development process and ensured consistency across all our products.

I was excited to learn about your company's focus on creating accessible web applications that serve diverse user needs. This aligns perfectly with my passion for building inclusive digital experiences. I'm also impressed by your recent work on the healthcare portal that has helped thousands of patients access critical information.

I would welcome the opportunity to discuss how my skills and experience could contribute to your team's success. Thank you for considering my application.

Sincerely,
[Your Name]
      `)
      setGenerating(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Career Tools</h1>
      <p className="text-gray-600 mb-8">Boost your job search with our AI-powered career tools</p>

      <Tabs defaultValue="resume" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="resume" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Resume Analyzer</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Skill Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="cover" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Cover Letter AI</span>
          </TabsTrigger>
          <TabsTrigger value="interview" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Interview Prep</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resume">
          <ResumeAnalyzer />
        </TabsContent>

        <TabsContent value="skills">
          <SkillAssessment />
        </TabsContent>

        <TabsContent value="cover">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">AI Cover Letter Generator</CardTitle>
              <CardDescription>Create personalized cover letters tailored to specific job descriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-description">Job Description</Label>
                    <Textarea
                      id="job-description"
                      placeholder="Paste the job description here..."
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="key-skills">Key Skills to Highlight</Label>
                    <Input id="key-skills" placeholder="e.g., React, TypeScript, Team Leadership" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Relevant Experience</Label>
                    <Textarea
                      id="experience"
                      placeholder="Briefly describe your relevant experience..."
                      rows={3}
                      className="resize-none"
                      value={coverLetterPrompt}
                      onChange={(e) => setCoverLetterPrompt(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleGenerateCoverLetter}
                    disabled={generating || !coverLetterPrompt}
                    className="w-full bg-[#0077B5] hover:bg-[#005885]"
                  >
                    {generating ? (
                      <>Generating...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Generate Cover Letter
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <Label htmlFor="result">Generated Cover Letter</Label>
                  <div className="mt-2 p-4 border rounded-md h-[400px] overflow-y-auto bg-white">
                    {coverLetterResult ? (
                      <div className="whitespace-pre-line">{coverLetterResult}</div>
                    ) : (
                      <div className="text-gray-400 italic">Your generated cover letter will appear here...</div>
                    )}
                  </div>

                  {coverLetterResult && (
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm" className="mr-2">
                        Copy to Clipboard
                      </Button>
                      <Button size="sm" className="bg-[#0077B5] hover:bg-[#005885]">
                        Download as PDF
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Interview Preparation</CardTitle>
              <CardDescription>Practice for interviews with AI-powered mock interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">Technical Interview</CardTitle>
                    <CardDescription>Practice coding and technical questions</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm text-gray-600 mt-2">
                      <p>• 20 common technical questions</p>
                      <p>• Live coding challenges</p>
                      <p>• Personalized feedback</p>
                      <p>• Solution explanations</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-[#0077B5] hover:bg-[#005885]">Start Practice</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">Behavioral Interview</CardTitle>
                    <CardDescription>Practice STAR method responses</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm text-gray-600 mt-2">
                      <p>• 15 common behavioral questions</p>
                      <p>• STAR method guidance</p>
                      <p>• Response evaluation</p>
                      <p>• Improvement suggestions</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-[#0077B5] hover:bg-[#005885]">Start Practice</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">Mock Interview</CardTitle>
                    <CardDescription>Full interview simulation with AI</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm text-gray-600 mt-2">
                      <p>• Real-time interview simulation</p>
                      <p>• Video recording option</p>
                      <p>• Comprehensive feedback</p>
                      <p>• Body language tips</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-[#0077B5] hover:bg-[#005885]">Start Interview</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Recent Interview Questions</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">
                          Tell me about a time you had to deal with a difficult team member.
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          This question assesses your interpersonal skills and conflict resolution abilities. Use the
                          STAR method to structure your response.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">How would you implement a debounce function in JavaScript?</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          This technical question tests your understanding of JavaScript concepts and practical
                          implementation skills.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Where do you see yourself in 5 years?</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          This question evaluates your career goals and ambition. Be honest but strategic in your
                          response.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
