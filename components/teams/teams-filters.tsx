"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Filter, X } from "lucide-react"

const skills = [
  "React",
  "Node.js",
  "TypeScript",
  "UI/UX",
  "DevOps",
  "AWS",
  "Python",
  "Machine Learning",
  "Mobile Development",
  "React Native",
]

const availabilityOptions = ["Available Immediately", "Available Soon", "Available from Future Date", "Not Available"]

const workPreferences = ["Contract", "Full-time", "Part-time", "Startup-friendly"]

export default function TeamsFilters() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="lg:hidden mb-4">
        <Button variant="outline" className="w-full flex justify-between" onClick={() => setIsOpen(!isOpen)}>
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </span>
          {isOpen ? <X className="h-4 w-4" /> : null}
        </Button>
      </div>

      <Card className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Search</h3>
            <div className="space-y-2">
              <Label htmlFor="search" className="sr-only">
                Search teams
              </Label>
              <Input id="search" placeholder="Search teams..." className="w-full" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Skills</h3>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox id={`skill-${skill}`} />
                  <Label htmlFor={`skill-${skill}`} className="text-sm font-normal">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Availability</h3>
            <div className="space-y-2">
              {availabilityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={`availability-${option}`} />
                  <Label htmlFor={`availability-${option}`} className="text-sm font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Work Preferences</h3>
            <div className="space-y-2">
              {workPreferences.map((preference) => (
                <div key={preference} className="flex items-center space-x-2">
                  <Checkbox id={`preference-${preference}`} />
                  <Label htmlFor={`preference-${preference}`} className="text-sm font-normal">
                    {preference}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col space-y-2">
            <Button className="w-full">Apply Filters</Button>
            <Button variant="outline" className="w-full">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
