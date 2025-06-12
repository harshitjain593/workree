"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Clock, User } from "lucide-react"
import type { Project } from "@/types/project"

interface BidDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
}

export function BidDialog({ open, onOpenChange, project }: BidDialogProps) {
  const [bidData, setBidData] = useState({
    amount: "",
    duration: "",
    proposal: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would normally call your API to submit the bid
      console.log("Bid submitted:", {
        projectId: project.id,
        ...bidData,
      })

      // Reset form and close dialog
      setBidData({ amount: "", duration: "", proposal: "" })
      onOpenChange(false)

      // Show success message (you could use a toast here)
      alert("Bid submitted successfully!")
    } catch (error) {
      console.error("Error submitting bid:", error)
      alert("Error submitting bid. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatBudget = (project: Project) => {
    const { min, max, type } = project.budget
    if (type === "hourly") {
      return `$${min}-${max}/hr`
    }
    return `$${min.toLocaleString()}-${max.toLocaleString()}`
  }

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit a Bid</DialogTitle>
          <DialogDescription>Submit your proposal for this project</DialogDescription>
        </DialogHeader>

        {/* Project Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{formatBudget(project)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{project.bids.length} bids</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={project.clientAvatar || "/placeholder.svg"} />
                <AvatarFallback>{project.clientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{project.clientName}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bid Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bid-amount">Your Bid Amount ($) *</Label>
              <Input
                id="bid-amount"
                type="number"
                placeholder="Enter your bid"
                value={bidData.amount}
                onChange={(e) => setBidData({ ...bidData, amount: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Client's budget: {formatBudget(project)}</p>
            </div>

            <div>
              <Label htmlFor="bid-duration">Delivery Time *</Label>
              <Input
                id="bid-duration"
                placeholder="e.g., 2 weeks, 1 month"
                value={bidData.duration}
                onChange={(e) => setBidData({ ...bidData, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="proposal">Cover Letter / Proposal *</Label>
            <Textarea
              id="proposal"
              placeholder="Explain why you're the best fit for this project..."
              rows={6}
              value={bidData.proposal}
              onChange={(e) => setBidData({ ...bidData, proposal: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 100 characters. Be specific about your approach and experience.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || bidData.proposal.length < 100}
              className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5]"
            >
              {isSubmitting ? "Submitting..." : "Submit Bid"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
