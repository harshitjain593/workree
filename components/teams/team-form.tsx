"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Search, Users, DollarSign, Github, Linkedin, Twitter, LinkIcon } from "lucide-react"
import type { Team, TeamMember, AvailabilityStatus } from "@/types/team"
import TeamProjects from "./team-projects"
import { users } from "@/data/users"

interface TeamFormProps {
  team?: Team
  isEditing?: boolean
}

export default function TeamForm({ team, isEditing = false }: TeamFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTab, setCurrentTab] = useState("basic")
  const [searchQuery, setSearchQuery] = useState("")
  const [skill, setSkill] = useState("")

  const [formData, setFormData] = useState({
    name: team?.name || "",
    tagline: team?.tagline || "",
    description: team?.description || "",
    location: team?.location || "",
    website: team?.website || "",
    skills: team?.skills || [],
    members: team?.members || [],
    projects: team?.projects || [],
    availability: team?.availability || {
      status: "Available Immediately" as AvailabilityStatus,
      workPreferences: [],
      projectTypes: [],
      hourlyRate: { min: 50, max: 150, currency: "USD" },
    },
    socialLinks: team?.socialLinks || {},
    isPublic: team?.isPublic ?? true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvailabilityChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      availability: { ...prev.availability, [field]: value },
    }))
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  const handleAddSkill = () => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
      setSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }))
  }

  const handleAddMember = (user: any) => {
    const isAlreadyMember = formData.members.some((member) => member.id === user.id)
    if (!isAlreadyMember) {
      const newMember: TeamMember = {
        id: user.id,
        name: user.name,
        role: user.title,
        avatar: user.image,
        email: user.email,
        skills: user.skills,
        joinedAt: new Date().toISOString(),
        permissions: ["member"],
      }
      setFormData((prev) => ({
        ...prev,
        members: [...prev.members, newMember],
      }))
      setSearchQuery("")
    }
  }

  const handleRemoveMember = (memberId: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== memberId),
    }))
  }

  const handleMemberRoleChange = (memberId: string, newRole: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)),
    }))
  }

  const handleWorkPreferenceChange = (preference: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        workPreferences: checked
          ? [...prev.availability.workPreferences, preference as any]
          : prev.availability.workPreferences.filter((p) => p !== preference),
      },
    }))
  }

  const handleProjectTypeChange = (projectType: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        projectTypes: checked
          ? [...prev.availability.projectTypes, projectType as any]
          : prev.availability.projectTypes.filter((p) => p !== projectType),
      },
    }))
  }

  const handleProjectsChange = (projects: any[]) => {
    setFormData((prev) => ({ ...prev, projects }))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // If creating a new team and has members, create team conversation
      if (!isEditing && formData.members.length > 0) {
        // This would create a team chat room in a real implementation
        console.log("Creating team chat for:", formData.name, "with members:", formData.members)
      }

      toast({
        title: isEditing ? "Team Updated" : "Team Created",
        description: `Your team "${formData.name}" has been ${isEditing ? "updated" : "created"} successfully!${
          !isEditing && formData.members.length > 0 ? " A team chat has been created." : ""
        }`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error ${isEditing ? "updating" : "creating"} your team. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedToNext = () => {
    switch (currentTab) {
      case "basic":
        return formData.name.trim() !== ""
      case "members":
        return true // Members are optional
      case "projects":
        return true // Projects are optional
      case "availability":
        return formData.availability.workPreferences.length > 0
      default:
        return true
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-[#00A0DC]" />
          {isEditing ? "Edit Team" : "Create a New Team"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update your team information, members, and availability"
            : "Build your dream team and start collaborating on amazing projects"}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="social">Social & Links</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Team Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter team name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    placeholder="A catchy tagline for your team"
                    value={formData.tagline}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your team, its mission, and goals"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Remote, New York, Global"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://yourteam.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Team Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSkill()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddSkill} disabled={!skill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((s) => (
                      <Badge key={s} className="bg-[#00A0DC]/20 text-[#00A0DC]">
                        {s}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(s)}
                          className="ml-1 text-[#00A0DC] hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked as boolean }))}
                />
                <Label htmlFor="isPublic">Make this team publicly visible</Label>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <Badge variant="outline">{formData.members.length} members</Badge>
                </div>

                <div className="space-y-2">
                  <Label>Search and Add Members</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, email, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {searchQuery && (
                    <div className="border rounded-lg max-h-60 overflow-y-auto">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleAddMember(user)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-medium">{user.name}</h4>
                              <p className="text-sm text-gray-500">{user.title}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.skills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                      {filteredUsers.length === 0 && (
                        <div className="p-4 text-center text-gray-500">No users found matching your search</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Current Team Members</Label>
                  {formData.members.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No team members added yet</p>
                      <p className="text-sm">Search and add members to your team</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.members.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{member.name}</h4>
                            <Input
                              value={member.role}
                              onChange={(e) => handleMemberRoleChange(member.id, e.target.value)}
                              placeholder="Member role"
                              className="mt-1 text-sm"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6 mt-6">
              <TeamProjects
                projects={formData.projects}
                members={formData.members}
                onProjectsChange={handleProjectsChange}
                canEdit={true}
              />
            </TabsContent>

            <TabsContent value="availability" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Availability Status</Label>
                  <RadioGroup
                    value={formData.availability.status}
                    onValueChange={(value) => handleAvailabilityChange("status", value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {["Available Immediately", "Available Soon", "Available from Future Date", "Not Available"].map(
                      (status) => (
                        <div key={status} className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value={status} id={status} />
                          <Label htmlFor={status} className="cursor-pointer font-normal">
                            {status}
                          </Label>
                        </div>
                      ),
                    )}
                  </RadioGroup>

                  {formData.availability.status === "Available from Future Date" && (
                    <div className="space-y-2">
                      <Label htmlFor="availableFrom">Available From</Label>
                      <Input
                        id="availableFrom"
                        type="date"
                        value={formData.availability.availableFrom || ""}
                        onChange={(e) => handleAvailabilityChange("availableFrom", e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Work Preferences *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Contract", "Full-time", "Part-time", "Startup-friendly"].map((preference) => (
                      <div key={preference} className="flex items-center space-x-2">
                        <Checkbox
                          id={preference}
                          checked={formData.availability.workPreferences.includes(preference as any)}
                          onCheckedChange={(checked) => handleWorkPreferenceChange(preference, checked as boolean)}
                        />
                        <Label htmlFor={preference} className="text-sm">
                          {preference}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Project Types</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Web Development", "Mobile App", "E-commerce", "SaaS", "Consulting", "Other"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={formData.availability.projectTypes.includes(type as any)}
                          onCheckedChange={(checked) => handleProjectTypeChange(type, checked as boolean)}
                        />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Hourly Rate Range (Optional)
                  </Label>
                  <div className="grid grid-cols-3 gap-3 items-center">
                    <div>
                      <Label htmlFor="minRate" className="text-sm">
                        Min Rate
                      </Label>
                      <Input
                        id="minRate"
                        type="number"
                        value={formData.availability.hourlyRate?.min || ""}
                        onChange={(e) =>
                          handleAvailabilityChange("hourlyRate", {
                            ...formData.availability.hourlyRate,
                            min: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxRate" className="text-sm">
                        Max Rate
                      </Label>
                      <Input
                        id="maxRate"
                        type="number"
                        value={formData.availability.hourlyRate?.max || ""}
                        onChange={(e) =>
                          handleAvailabilityChange("hourlyRate", {
                            ...formData.availability.hourlyRate,
                            max: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency" className="text-sm">
                        Currency
                      </Label>
                      <Select
                        value={formData.availability.hourlyRate?.currency || "USD"}
                        onValueChange={(value) =>
                          handleAvailabilityChange("hourlyRate", {
                            ...formData.availability.hourlyRate,
                            currency: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Social Links & Contact
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/company/yourteam"
                      value={formData.socialLinks.linkedin || ""}
                      onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/yourteam"
                      value={formData.socialLinks.github || ""}
                      onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/yourteam"
                      value={formData.socialLinks.twitter || ""}
                      onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">Team Summary</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {formData.name || "Not set"}
                    </p>
                    <p>
                      <strong>Members:</strong> {formData.members.length} people
                    </p>
                    <p>
                      <strong>Projects:</strong> {formData.projects.length} projects
                    </p>
                    <p>
                      <strong>Skills:</strong> {formData.skills.length} skills
                    </p>
                    <p>
                      <strong>Availability:</strong> {formData.availability.status}
                    </p>
                    <p>
                      <strong>Work Preferences:</strong>{" "}
                      {formData.availability.workPreferences.join(", ") || "None selected"}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <div className="flex justify-between items-center p-6 border-t">
          <div className="flex gap-2">
            {currentTab !== "basic" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const tabs = ["basic", "members", "projects", "availability", "social"]
                  const currentIndex = tabs.indexOf(currentTab)
                  if (currentIndex > 0) {
                    setCurrentTab(tabs[currentIndex - 1])
                  }
                }}
              >
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {currentTab !== "social" ? (
              <Button
                type="button"
                onClick={() => {
                  const tabs = ["basic", "members", "projects", "availability", "social"]
                  const currentIndex = tabs.indexOf(currentTab)
                  if (currentIndex < tabs.length - 1) {
                    setCurrentTab(tabs[currentIndex + 1])
                  }
                }}
                disabled={!canProceedToNext()}
                className="bg-[#00A0DC] hover:bg-[#0077B5]"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || !canProceedToNext()}
                className="bg-[#00A0DC] hover:bg-[#0077B5]"
              >
                {isSubmitting ? "Saving..." : isEditing ? "Update Team" : "Create Team"}
              </Button>
            )}

            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
