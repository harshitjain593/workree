"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "JobConnect Pro helped me find my dream job at Google. The platform's AI matching technology connected me with opportunities that perfectly matched my skills and career goals.",
    type: "job_seeker",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "HR Director at Microsoft",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "As a recruiter, JobConnect Pro has transformed our hiring process. We've reduced time-to-hire by 40% and found exceptional candidates that match our company culture and technical requirements.",
    type: "recruiter",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager at Airbnb",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The career resources and networking opportunities on JobConnect Pro were instrumental in my transition from engineering to product management. I couldn't have made this career pivot without it!",
    type: "job_seeker",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Talent Acquisition at Amazon",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "JobConnect Pro's advanced filtering and candidate matching have revolutionized our recruitment strategy. We've built a strong talent pipeline and improved our hiring quality significantly.",
    type: "recruiter",
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "UX Designer at Netflix",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "I was able to showcase my portfolio and connect with design teams at top companies through JobConnect Pro. The platform's focus on skills rather than just resumes made all the difference.",
    type: "job_seeker",
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<typeof testimonials>([])

  useEffect(() => {
    // Determine how many testimonials to show based on screen size
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setVisibleTestimonials([testimonials[activeIndex]])
      } else if (width < 1024) {
        setVisibleTestimonials(testimonials.slice(activeIndex, activeIndex + 2))
      } else {
        setVisibleTestimonials(testimonials.slice(activeIndex, activeIndex + 3))
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeIndex])

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - (visibleTestimonials.length - 1)))
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - visibleTestimonials.length : prevIndex - 1))
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">What Our Users Say</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Quote className="h-10 w-10 text-[#0077B5] opacity-20 mb-4" />
              <p className="text-gray-700 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
