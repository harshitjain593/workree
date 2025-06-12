"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Search, MapPin, Filter, X, ChevronDown, Grid, List, Plus } from "lucide-react"
import { fetchJobs } from "@/lib/api/jobs"
import type { Job } from "@/types/job"
import JobCard from "@/components/jobs/job-card"
import JobListItem from "@/components/jobs/job-list-item"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import Link from "next/link"

// Filter options
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"]
const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Manager", "Director", "Executive"]
const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Media",
  "Hospitality",
]

export default function JobsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [totalJobs, setTotalJobs] = useState(0)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const isRecruiter = isAuthenticated && user?.role === "recruiter"

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [location, setLocation] = useState(searchParams.get("location") || "")
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000])
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true)
      try {
        // Build filter object from all filter states
        const filters = {
          query: searchQuery,
          location: location,
          jobTypes: selectedJobTypes,
          experienceLevels: selectedExperienceLevels,
          industries: selectedIndustries,
          salaryMin: salaryRange[0],
          salaryMax: salaryRange[1],
          sortBy: sortBy,
        }

        const { jobs, total } = await fetchJobs(filters)
        setJobs(jobs)
        setTotalJobs(total)
      } catch (error) {
        console.error("Error loading jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [searchQuery, location, selectedJobTypes, selectedExperienceLevels, selectedIndustries, salaryRange, sortBy])

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (location) params.set("location", location)
    router.push(`/jobs?${params.toString()}`)
  }

  const handleJobTypeChange = (type: string) => {
    setSelectedJobTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleExperienceLevelChange = (level: string) => {
    setSelectedExperienceLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setLocation("")
    setSelectedJobTypes([])
    setSelectedExperienceLevels([])
    setSelectedIndustries([])
    setSalaryRange([0, 200000])
    setSortBy("relevance")
  }

  const formatSalary = (value: number) => {
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Find Your Dream Job</h1>
          <p className="text-gray-600 mt-1">
            {totalJobs} jobs available{" "}
            {(searchQuery || location) && (
              <span>
                for {[searchQuery && `"${searchQuery}"`, location && `in ${location}`].filter(Boolean).join(" ")}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isRecruiter && (
            <Button asChild className="bg-[#0077B5] hover:bg-[#005885] mr-2">
              <Link href="/jobs/post" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Post a Job</span>
              </Link>
            </Button>
          )}

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary_high">Highest Salary</SelectItem>
              <SelectItem value="salary_low">Lowest Salary</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-none rounded-l-md"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-none rounded-r-md"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="bg-[#0077B5] hover:bg-[#005885]">
              Search Jobs
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            {(selectedJobTypes.length > 0 ||
              selectedExperienceLevels.length > 0 ||
              selectedIndustries.length > 0 ||
              salaryRange[0] > 0 ||
              salaryRange[1] < 200000) && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2 text-sm">
                Clear All
              </Button>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-3">Job Type</h3>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedJobTypes.includes(type)}
                    onCheckedChange={() => handleJobTypeChange(type)}
                  />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Experience Level</h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level}`}
                    checked={selectedExperienceLevels.includes(level)}
                    onCheckedChange={() => handleExperienceLevelChange(level)}
                  />
                  <Label htmlFor={`level-${level}`}>{level}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Industry</h3>
            <div className="space-y-2">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={selectedIndustries.includes(industry)}
                    onCheckedChange={() => handleIndustryChange(industry)}
                  />
                  <Label htmlFor={`industry-${industry}`}>{industry}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Salary Range</h3>
              <span className="text-sm text-gray-500">
                {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
              </span>
            </div>
            <Slider
              defaultValue={[0, 200000]}
              min={0}
              max={200000}
              step={10000}
              value={salaryRange}
              onValueChange={(value) => setSalaryRange(value as [number, number])}
              className="my-6"
            />
          </div>
        </div>

        {/* Filters - Mobile */}
        <div className="lg:hidden mb-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filters</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your job search</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <Tabs defaultValue="type">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="type">Type</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="industry">Industry</TabsTrigger>
                    <TabsTrigger value="salary">Salary</TabsTrigger>
                  </TabsList>

                  <TabsContent value="type" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {jobTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-type-${type}`}
                            checked={selectedJobTypes.includes(type)}
                            onCheckedChange={() => handleJobTypeChange(type)}
                          />
                          <Label htmlFor={`mobile-type-${type}`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {experienceLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-level-${level}`}
                            checked={selectedExperienceLevels.includes(level)}
                            onCheckedChange={() => handleExperienceLevelChange(level)}
                          />
                          <Label htmlFor={`mobile-level-${level}`}>{level}</Label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="industry" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {industries.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-industry-${industry}`}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={() => handleIndustryChange(industry)}
                          />
                          <Label htmlFor={`mobile-industry-${industry}`}>{industry}</Label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="salary" className="space-y-4">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Salary Range</h3>
                        <span className="text-sm text-gray-500">
                          {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0, 200000]}
                        min={0}
                        max={200000}
                        step={10000}
                        value={salaryRange}
                        onValueChange={(value) => setSalaryRange(value as [number, number])}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setIsFilterOpen(false)} className="bg-[#0077B5] hover:bg-[#005885]">
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active filters */}
        {(selectedJobTypes.length > 0 ||
          selectedExperienceLevels.length > 0 ||
          selectedIndustries.length > 0 ||
          salaryRange[0] > 0 ||
          salaryRange[1] < 200000) && (
          <div className="lg:hidden mb-4">
            <div className="flex flex-wrap gap-2">
              {selectedJobTypes.map((type) => (
                <Badge key={type} variant="secondary" className="flex items-center gap-1">
                  {type}
                  <button onClick={() => handleJobTypeChange(type)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {selectedExperienceLevels.map((level) => (
                <Badge key={level} variant="secondary" className="flex items-center gap-1">
                  {level}
                  <button onClick={() => handleExperienceLevelChange(level)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {selectedIndustries.map((industry) => (
                <Badge key={industry} variant="secondary" className="flex items-center gap-1">
                  {industry}
                  <button onClick={() => handleIndustryChange(industry)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {(salaryRange[0] > 0 || salaryRange[1] < 200000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
                  <button onClick={() => setSalaryRange([0, 200000])} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-7 px-2 text-xs">
                Clear All
              </Button>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="flex-1">
          {loading ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="border-0 shadow animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="border-0 shadow animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="flex gap-4 mt-2">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="h-12 w-12 bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
              <Button onClick={clearAllFilters}>Clear All Filters</Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.includes(job.id)}
                  onSave={() => toggleSaveJob(job.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobListItem
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.includes(job.id)}
                  onSave={() => toggleSaveJob(job.id)}
                />
              ))}
            </div>
          )}

          {jobs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="mr-2">
                Previous
              </Button>
              <Button variant="outline" className="mx-1">
                1
              </Button>
              <Button variant="default" className="mx-1">
                2
              </Button>
              <Button variant="outline" className="mx-1">
                3
              </Button>
              <Button variant="outline" className="ml-2">
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
