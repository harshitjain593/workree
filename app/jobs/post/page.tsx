"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { createJob } from "@/lib/api/jobs"
import { Briefcase, DollarSign, Building, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { TagInput } from "@/components/ui/tag-input"

// Job types and experience levels
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

// Form schema
const jobFormSchema = z.object({
  title: z.string().min(5, { message: "Job title must be at least 5 characters" }),
  company: z.object({
    id: z.string().optional(),
    name: z.string().min(2, { message: "Company name must be at least 2 characters" }),
    logo: z.string().optional(),
  }),
  location: z.string().min(2, { message: "Location must be at least 2 characters" }),
  type: z.string().min(1, { message: "Please select a job type" }),
  experienceLevel: z.string().min(1, { message: "Please select an experience level" }),
  industry: z.string().min(1, { message: "Please select an industry" }),
  salaryMin: z.coerce.number().min(0, { message: "Minimum salary must be a positive number" }),
  salaryMax: z.coerce.number().min(0, { message: "Maximum salary must be a positive number" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters" }),
  requirements: z.array(z.string()).min(1, { message: "Add at least one requirement" }),
  responsibilities: z.array(z.string()).min(1, { message: "Add at least one responsibility" }),
  benefits: z.array(z.string()).min(1, { message: "Add at least one benefit" }),
  skills: z.array(z.string()).min(1, { message: "Add at least one skill" }),
  featured: z.boolean().default(false),
})

type JobFormValues = z.infer<typeof jobFormSchema>

export default function PostJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with default values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: {
        id: user?.company?.id || "",
        name: user?.company?.name || "",
        logo: user?.company?.logo || "",
      },
      location: "",
      type: "",
      experienceLevel: "",
      industry: "",
      salaryMin: 0,
      salaryMax: 0,
      description: "",
      requirements: [],
      responsibilities: [],
      benefits: [],
      skills: [],
      featured: false,
    },
  })

  // Redirect if not authenticated or not a recruiter
  if (!isAuthenticated || user?.role !== "company_admin") {
    if (typeof window !== "undefined") {
      router.push("/login")
    }
    return null
  }

  const onSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true)
    try {
      // Format salary range
      const formattedData = {
        ...data,
        salary: `$${data.salaryMin.toLocaleString()} - $${data.salaryMax.toLocaleString()}`,
      }

      // Call API to create job
      await createJob(formattedData)

      toast({
        title: "Job Posted Successfully",
        description: "Your job has been posted and is now live.",
        variant: "default",
      })

      // Redirect to jobs page
      router.push("/jobs")
    } catch (error) {
      console.error("Error posting job:", error)
      toast({
        title: "Error Posting Job",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Post a New Job</h1>
          <p className="text-gray-600 mt-1">Create a job listing to find the perfect candidate for your position</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Job Details</TabsTrigger>
                <TabsTrigger value="requirements">Requirements & Benefits</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Job Information</CardTitle>
                    <CardDescription>Provide the essential details about the job position</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="e.g. Senior Frontend Developer" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="e.g. Acme Inc." className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="e.g. San Francisco, CA or Remote" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {jobTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {experienceLevels.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industries.map((industry) => (
                                  <SelectItem key={industry} value={industry}>
                                    {industry}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="salaryMin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Salary</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input type="number" min="0" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="salaryMax"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Salary</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input type="number" min="0" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Featured Job</FormLabel>
                            <FormDescription>
                              Featured jobs appear at the top of search results and get more visibility.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={() =>
                        form
                          .trigger([
                            "title",
                            "company.name",
                            "location",
                            "type",
                            "experienceLevel",
                            "industry",
                            "salaryMin",
                            "salaryMax",
                          ])
                          .then((isValid) => {
                            if (isValid) document.querySelector('[data-value="details"]')?.click()
                          })
                      }
                    >
                      Next: Job Details
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Job Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>
                      Provide a detailed description and required skills for the position
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the job role, responsibilities, and what the candidate will be doing..."
                              className="min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Required Skills</FormLabel>
                          <FormControl>
                            <TagInput
                              placeholder="Add skills and press Enter (e.g. React, TypeScript, Node.js)"
                              tags={field.value}
                              setTags={(newTags) => field.onChange(newTags)}
                            />
                          </FormControl>
                          <FormDescription>Add skills that are required for this position</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => document.querySelector('[data-value="basic"]')?.click()}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() =>
                        form.trigger(["description", "skills"]).then((isValid) => {
                          if (isValid) document.querySelector('[data-value="requirements"]')?.click()
                        })
                      }
                    >
                      Next: Requirements & Benefits
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Requirements & Benefits Tab */}
              <TabsContent value="requirements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements & Benefits</CardTitle>
                    <CardDescription>Specify job requirements, responsibilities, and benefits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requirements</FormLabel>
                          <FormControl>
                            <TagInput
                              placeholder="Add requirements and press Enter"
                              tags={field.value}
                              setTags={(newTags) => field.onChange(newTags)}
                            />
                          </FormControl>
                          <FormDescription>
                            Add specific requirements for candidates (e.g. "5+ years of experience", "Bachelor's
                            degree")
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="responsibilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Responsibilities</FormLabel>
                          <FormControl>
                            <TagInput
                              placeholder="Add responsibilities and press Enter"
                              tags={field.value}
                              setTags={(newTags) => field.onChange(newTags)}
                            />
                          </FormControl>
                          <FormDescription>Add key responsibilities for this role</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="benefits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Benefits</FormLabel>
                          <FormControl>
                            <TagInput
                              placeholder="Add benefits and press Enter"
                              tags={field.value}
                              setTags={(newTags) => field.onChange(newTags)}
                            />
                          </FormControl>
                          <FormDescription>
                            Add benefits offered with this position (e.g. "Health insurance", "Remote work")
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => document.querySelector('[data-value="details"]')?.click()}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="bg-[#0077B5] hover:bg-[#005885]" disabled={isSubmitting}>
                      {isSubmitting ? "Posting..." : "Post Job"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  )
}
