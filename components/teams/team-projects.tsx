"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Plus, ExternalLink, Github, Calendar, Users, Edit, Trash2 } from "lucide-react"
import type { TeamProject, TeamMember } from "@/types/team"

interface TeamProjectsProps {
  projects: TeamProject[]
  members: TeamMember[]
  onProjectsChange: (projects: TeamProject[]) => void
  canEdit?: boolean
}

export default function TeamProjects({ projects, members, onProjectsChange, canEdit = false }: TeamProjectsProps) {
  const { toast } = useToast()
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [editingProject, setEditingProject] = useState<TeamProject | null>(null)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    projectUrl: "",
    githubUrl: "",
    startDate: "",
    endDate: "",
    status: "planning" as const,
    teamMembers: [] as string[],
  })
  const [newTech, setNewTech] = useState("")

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the project title and description",
        variant: "destructive",
      })
      return
    }

    const project: TeamProject = {
      id: `project-${Date.now()}`,
      ...newProject,
      startDate: newProject.startDate || new Date().toISOString().split("T")[0],
    }

    onProjectsChange([...projects, project])
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      projectUrl: "",
      githubUrl: "",
      startDate: "",
      endDate: "",
      status: "planning",
      teamMembers: [],
    })
    setIsAddingProject(false)

    toast({
      title: "Project Added",
      description: "Project has been added to your team portfolio",
    })
  }

  const handleEditProject = (project: TeamProject) => {
    setEditingProject(project)
    setNewProject({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      projectUrl: project.projectUrl || "",
      githubUrl: project.githubUrl || "",
      startDate: project.startDate,
      endDate: project.endDate || "",
      status: project.status,
      teamMembers: project.teamMembers,
    })
  }

  const handleUpdateProject = () => {
    if (!editingProject) return

    const updatedProjects = projects.map((p) => (p.id === editingProject.id ? { ...editingProject, ...newProject } : p))

    onProjectsChange(updatedProjects)
    setEditingProject(null)
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      projectUrl: "",
      githubUrl: "",
      startDate: "",
      endDate: "",
      status: "planning",
      teamMembers: [],
    })

    toast({
      title: "Project Updated",
      description: "Project has been updated successfully",
    })
  }

  const handleDeleteProject = (projectId: string) => {
    onProjectsChange(projects.filter((p) => p.id !== projectId))
    toast({
      title: "Project Deleted",
      description: "Project has been removed from your team portfolio",
    })
  }

  const handleAddTechnology = () => {
    if (newTech && !newProject.technologies.includes(newTech)) {
      setNewProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech],
      }))
      setNewTech("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setNewProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "on-hold":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Team Projects ({projects.length})</h3>
        {canEdit && (
          <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
            <DialogTrigger asChild>
              <Button className="bg-[#00A0DC] hover:bg-[#0077B5]">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={newProject.title}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter project title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newProject.status}
                      onValueChange={(value) => setNewProject((prev) => ({ ...prev, status: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the project"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Technologies</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="Add technology"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTechnology()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTechnology} disabled={!newTech}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {newProject.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newProject.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTechnology(tech)}
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectUrl">Project URL</Label>
                    <Input
                      id="projectUrl"
                      value={newProject.projectUrl}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, projectUrl: e.target.value }))}
                      placeholder="https://project.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, githubUrl: e.target.value }))}
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProject} className="bg-[#00A0DC] hover:bg-[#0077B5]">
                    Add Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
              <p className="text-gray-500 mb-4">Start showcasing your team's work by adding projects</p>
              {canEdit && (
                <Button onClick={() => setIsAddingProject(true)} className="bg-[#00A0DC] hover:bg-[#0077B5]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Project
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(project.startDate).toLocaleDateString()}
                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                      </div>
                    </div>
                  </div>
                  {canEdit && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.teamMembers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {project.teamMembers.length} team member{project.teamMembers.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  {project.projectUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Project
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
