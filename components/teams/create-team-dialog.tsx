"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Briefcase, Users, CheckCircle, X, Plus, Sparkles, Globe, Rocket, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CreateTeamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTeamDialog({ open, onOpenChange }: CreateTeamDialogProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [teamData, setTeamData] = useState({
    name: "",
    tagline: "",
    description: "",
    industry: "",
    skills: [] as string[],
    openToWork: true,
  })
  const [skill, setSkill] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTeamData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = () => {
    if (skill && !teamData.skills.includes(skill)) {
      setTeamData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
      setSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setTeamData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }))
  }

  const handleNext = () => {
    if (step === 1 && !teamData.name) {
      toast({
        title: "Team name required",
        description: "Please enter a name for your team",
        variant: "destructive",
      })
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      handleCreateTeam()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCreateTeam = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Team created successfully!",
      description: `Your team "${teamData.name}" has been created.`,
    })

    setLoading(false)
    onOpenChange(false)

    // Reset form
    setTeamData({
      name: "",
      tagline: "",
      description: "",
      industry: "",
      skills: [],
      openToWork: true,
    })
    setStep(1)

    // Navigate to teams page
    router.push("/teams")
  }

  const suggestedSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "UI/UX Design",
    "Product Management",
    "DevOps",
    "AWS",
    "Data Science",
    "Machine Learning",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] dark:bg-gray-900 dark:border-gray-800 p-0 overflow-hidden">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A0DC]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <DialogHeader className="px-6 pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-[#00A0DC] text-white px-2 py-1 text-xs">Step {step} of 3</Badge>
              {step === 3 && <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />}
            </div>
            <DialogTitle className="text-2xl font-bold dark:text-white flex items-center gap-2">
              {step === 1 && (
                <>
                  <Users className="h-5 w-5 text-[#00A0DC]" />
                  Create Your Dream Team
                </>
              )}
              {step === 2 && (
                <>
                  <Briefcase className="h-5 w-5 text-[#00A0DC]" />
                  Team Skills & Expertise
                </>
              )}
              {step === 3 && (
                <>
                  <Rocket className="h-5 w-5 text-[#00A0DC]" />
                  Ready for Launch!
                </>
              )}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {step === 1 && "Start by giving your team a name and description."}
              {step === 2 && "What skills and expertise does your team offer?"}
              {step === 3 && "Review your team details before creating."}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-gray-300">
                    Team Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={teamData.name}
                    onChange={handleChange}
                    placeholder="e.g. Pixel Pioneers"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline" className="dark:text-gray-300">
                    Tagline
                  </Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    value={teamData.tagline}
                    onChange={handleChange}
                    placeholder="e.g. Building the future of web"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    A short, catchy phrase that describes your team
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="dark:text-gray-300">
                    Team Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={teamData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your team, your mission, and what makes you unique..."
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="dark:text-gray-300">
                    Industry
                  </Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={teamData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Web Development, Design, Marketing"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label className="dark:text-gray-300">Team Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddSkill()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      disabled={!skill}
                      className="bg-[#00A0DC] hover:bg-[#0077B5]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {teamData.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {teamData.skills.map((s) => (
                        <Badge key={s} className="bg-[#00A0DC]/20 text-[#00A0DC] hover:bg-[#00A0DC]/30 px-2 py-1">
                          {s}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(s)}
                            className="ml-1 text-[#00A0DC] hover:text-red-500 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      No skills added yet. Add skills to help others understand your team's expertise.
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <Label className="dark:text-gray-300 mb-2 block">Suggested Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills.map((s) => (
                      <Badge
                        key={s}
                        className={`cursor-pointer ${
                          teamData.skills.includes(s)
                            ? "bg-[#00A0DC] hover:bg-[#0077B5]"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => {
                          if (teamData.skills.includes(s)) {
                            handleRemoveSkill(s)
                          } else {
                            setTeamData((prev) => ({
                              ...prev,
                              skills: [...prev.skills, s],
                            }))
                          }
                        }}
                      >
                        {s}
                        {teamData.skills.includes(s) && <CheckCircle className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{teamData.name}</h3>
                      {teamData.tagline && <p className="text-[#00A0DC] italic">{teamData.tagline}</p>}
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" /> Ready
                    </Badge>
                  </div>

                  {teamData.description && <p className="text-gray-300 mt-3 text-sm">{teamData.description}</p>}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {teamData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-[#00A0DC]/20 text-[#00A0DC]">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm">
                    {teamData.industry && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Briefcase className="h-4 w-4" />
                        <span>{teamData.industry}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-gray-400">
                      <Globe className="h-4 w-4" />
                      <span>Open to work</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-lg font-semibold dark:text-white">What's Next?</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="dark:text-gray-300 text-sm">Add team members and assign roles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="dark:text-gray-300 text-sm">Showcase your team's projects and achievements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="dark:text-gray-300 text-sm">
                        Connect with potential clients and collaborators
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="px-6 py-4 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex justify-between w-full">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                  className="dark:border-gray-700 dark:text-gray-300"
                >
                  Back
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="dark:border-gray-700 dark:text-gray-300"
                >
                  Cancel
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={loading}
                className={`${
                  step === 3 ? "bg-gradient-to-r from-[#00A0DC] to-[#0077B5]" : "bg-[#00A0DC] hover:bg-[#0077B5]"
                } min-w-[100px]`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <>
                    {step < 3 ? "Continue" : "Create Team"}
                    {step < 3 && <ChevronRight className="h-4 w-4 ml-1" />}
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Missing ChevronRight icon import
import { ChevronRight } from "lucide-react"
