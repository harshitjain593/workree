"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Upload, DollarSign, Clock, Tag } from "lucide-react"
import { TagInput } from "@/components/ui/tag-input"

const categories = [
  "Web Development",
  "Mobile Development",
  "Design",
  "Data Science",
  "Marketing",
  "Writing",
  "Video & Animation",
  "Music & Audio",
  "Programming",
  "Business",
]

export default function PostProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: {
      min: "",
      max: "",
      type: "fixed" as "fixed" | "hourly",
    },
    duration: "",
    skills: [] as string[],
    requirements: [""],
    attachments: [] as File[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would normally call your API
      console.log("Project data:", formData)

      // Redirect to projects management page
      router.push("/projects/manage")
    } catch (error) {
      console.error("Error posting project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    })
  }

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements]
    newRequirements[index] = value
    setFormData({
      ...formData,
      requirements: newRequirements,
    })
  }

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files],
    })
  }

  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Post a New Project</h1>
          <p className="text-gray-600 dark:text-gray-400">Find the perfect freelancer or team for your project</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Project Details
              </CardTitle>
              <CardDescription>Provide basic information about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Build a modern e-commerce website"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project in detail..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Budget & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Budget & Timeline
              </CardTitle>
              <CardDescription>Set your budget and project timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Budget Type</Label>
                <Select
                  value={formData.budget.type}
                  onValueChange={(value: "fixed" | "hourly") =>
                    setFormData({
                      ...formData,
                      budget: { ...formData.budget, type: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget-min">
                    {formData.budget.type === "fixed" ? "Minimum Budget" : "Min Hourly Rate"} ($)
                  </Label>
                  <Input
                    id="budget-min"
                    type="number"
                    placeholder="1000"
                    value={formData.budget.min}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        budget: { ...formData.budget, min: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="budget-max">
                    {formData.budget.type === "fixed" ? "Maximum Budget" : "Max Hourly Rate"} ($)
                  </Label>
                  <Input
                    id="budget-max"
                    type="number"
                    placeholder="5000"
                    value={formData.budget.max}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        budget: { ...formData.budget, max: e.target.value },
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Project Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 2-3 months, 4 weeks"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Skills & Requirements
              </CardTitle>
              <CardDescription>Specify the skills and requirements for your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Required Skills</Label>
                <TagInput
                  tags={formData.skills}
                  setTags={(skills) => setFormData({ ...formData, skills })}
                  placeholder="Add skills (e.g., React, Node.js, Design)"
                />
              </div>

              <div>
                <Label>Project Requirements</Label>
                <div className="space-y-2">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Requirement ${index + 1}`}
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                      />
                      {formData.requirements.length > 1 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => removeRequirement(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addRequirement} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Requirement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Attachments (Optional)
              </CardTitle>
              <CardDescription>Upload any relevant files, documents, or references</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Upload Files</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  />
                </div>

                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files:</Label>
                    {formData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded"
                      >
                        <span className="text-sm">{file.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5]"
            >
              {isSubmitting ? "Posting..." : "Post Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
