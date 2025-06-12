"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Briefcase, Users, Building, Globe, TrendingUp, Search, ChevronRight, User } from "lucide-react"
import TestimonialCarousel from "@/components/home/testimonial-carousel"
import FeaturedJobs from "@/components/home/featured-jobs"
import CompanyLogos from "@/components/home/company-logos"
import StatsCounter from "@/components/home/stats-counter"

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"jobseeker" | "recruiter">("jobseeker")

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (featuresRef.current) observer.observe(featuresRef.current)
    if (statsRef.current) observer.observe(statsRef.current)
    if (testimonialsRef.current) observer.observe(testimonialsRef.current)

    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current)
      if (statsRef.current) observer.unobserve(statsRef.current)
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight dark-text-glow">
                Connect, Grow, and <span className="text-yellow-300 animate-pulse-subtle">Advance</span> Your Career
              </h1>

              <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl mb-8 border border-gray-700/50">
                <div className="flex mb-6">
                  <button
                    onClick={() => setActiveTab("jobseeker")}
                    className={`flex-1 py-3 px-4 rounded-l-lg flex justify-center items-center gap-2 transition-all ${
                      activeTab === "jobseeker"
                        ? "bg-[#00A0DC] text-white font-medium"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>Find a Job</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("recruiter")}
                    className={`flex-1 py-3 px-4 rounded-r-lg flex justify-center items-center gap-2 transition-all ${
                      activeTab === "recruiter"
                        ? "bg-[#00A0DC] text-white font-medium"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>Hire Talent</span>
                  </button>
                </div>

                {activeTab === "jobseeker" ? (
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">Looking for your next opportunity?</h3>
                    <p className="text-blue-50 mb-4">
                      Discover thousands of job opportunities, connect with top companies, and take your career to the
                      next level.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-white text-[#0077B5] hover:bg-blue-50 hover:scale-105 transition-all dark-border-glow"
                    >
                      <Link href="/login">Find Jobs Now</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">Need to build your team?</h3>
                    <p className="text-blue-50 mb-4">
                      Connect with top talent, post job openings, and find the perfect candidates to grow your business.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-white text-[#0077B5] hover:bg-blue-50 hover:scale-105 transition-all dark-border-glow"
                    >
                      <Link href="/login?role=recruiter">Start Hiring</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 relative animate-slide-in-right">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse-subtle"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse-subtle"></div>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Job platform illustration"
                className="w-full h-auto rounded-lg shadow-2xl relative z-10 animate-float dark-border-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 dark:bg-gray-900" ref={statsRef}>
        <div className="container mx-auto px-4">
          <StatsCounter />
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-12 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 dark:text-white dark-text-glow">
            Trusted by Leading Companies
          </h2>
          <CompanyLogos />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 dark:bg-gray-900" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-2 dark:bg-[#00A0DC] dark:text-gray-900">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white dark-text-glow">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform provides powerful tools for both job seekers and recruiters to connect and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700 dark-card-hover">
              <CardContent className="p-6">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Smart Job Matching</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our AI-powered algorithm matches your skills and experience with the perfect job opportunities.
                </p>
                <Link
                  href="/jobs"
                  className="text-[#0077B5] dark:text-[#00A0DC] font-medium hover:underline flex items-center group"
                >
                  Find Jobs <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700 dark-card-hover">
              <CardContent className="p-6">
                <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Talent Network</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Connect with industry professionals, join communities, and expand your professional network.
                </p>
                <Link
                  href="/network"
                  className="text-[#0077B5] dark:text-[#00A0DC] font-medium hover:underline flex items-center group"
                >
                  Grow Network <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700 dark-card-hover">
              <CardContent className="p-6">
                <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Company Insights</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get detailed information about companies, their culture, benefits, and growth opportunities.
                </p>
                <Link
                  href="/companies"
                  className="text-[#0077B5] dark:text-[#00A0DC] font-medium hover:underline flex items-center group"
                >
                  Explore Companies{" "}
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700 dark-card-hover">
              <CardContent className="p-6">
                <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Remote Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Find remote jobs from around the world and work from anywhere with our global job listings.
                </p>
                <Link
                  href="/jobs?type=remote"
                  className="text-[#0077B5] dark:text-[#00A0DC] font-medium hover:underline flex items-center group"
                >
                  Find Remote Jobs{" "}
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700 dark-card-hover">
              <CardContent className="p-6">
                <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Career Growth</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Access resources, courses, and mentorship opportunities to advance your career to the next level.
                </p>
                <Link
                  href="/resources"
                  className="text-[#0077B5] dark:text-[#00A0DC] font-medium hover:underline flex items-center group"
                >
                  Explore Resources{" "}
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700 dark-card-hover">
              <CardContent className="p-6">
                <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Advanced Search</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Find exactly what you're looking for with our powerful search filters and customization options.
                </p>
                <Link
                  href="/jobs/search"
                  className="text-[#0077B5] dark:text-[#00A0DC] font-medium hover:underline flex items-center group"
                >
                  Try Advanced Search{" "}
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Job Seekers & Recruiters */}
      <section className="py-16 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 stagger-animation">
            <div className="bg-white dark:bg-gray-900 dark:border-gray-700 p-8 rounded-xl shadow-lg dark-card-hover">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-[#0077B5] dark:text-[#00A0DC]" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white">For Job Seekers</h3>
              </div>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">
                    Create a professional profile to showcase your skills and experience
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">Get matched with jobs that fit your skills and preferences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">Connect directly with recruiters and hiring managers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">Track your applications and interview schedules</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">Access salary insights and career growth resources</span>
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5] transition-all hover:scale-105 dark-border-glow"
              >
                <Link href="/profile">Create Your Profile</Link>
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-900 dark:border-gray-700 p-8 rounded-xl shadow-lg dark-card-hover">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <Building className="h-6 w-6 text-[#0077B5] dark:text-[#00A0DC]" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white">For Recruiters</h3>
              </div>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">
                    Post job openings and reach thousands of qualified candidates
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">Use AI-powered matching to find the perfect candidates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">Manage applications and schedule interviews efficiently</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">Build a talent pipeline for future openings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="dark:text-gray-300">
                    Access analytics and insights to optimize your hiring process
                  </span>
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5] transition-all hover:scale-105 dark-border-glow"
              >
                <Link href="/recruiter">Find Candidates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 dark:bg-[#00A0DC] dark:text-gray-900">Featured Jobs</Badge>
            <h2 className="text-3xl font-bold mb-4 dark:text-white dark-text-glow">Explore Top Opportunities</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover featured job opportunities from top companies across various industries and locations.
            </p>
          </div>
          <FeaturedJobs />
          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5] transition-all hover:scale-105 dark-border-glow"
            >
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 dark:bg-gray-800" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 dark:bg-[#00A0DC] dark:text-gray-900">Testimonials</Badge>
            <h2 className="text-3xl font-bold mb-4 dark:text-white dark-text-glow">Success Stories</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from professionals who found their dream jobs and recruiters who built amazing teams through our
              platform.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 cta-gradient text-white animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark-text-glow">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals and companies already using JobConnect Pro to achieve their career and
            hiring goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#0077B5] hover:bg-blue-50 hover:scale-105 transition-all dark-border-glow"
            >
              <Link href="/login">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-blue-700 hover:scale-105 transition-all"
            >
              <Link href="/pricing">View Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
