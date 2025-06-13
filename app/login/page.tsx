"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { login, clearError } from "@/redux/features/authSlice"
import type { AppDispatch, RootState } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Briefcase, User } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { register } from "@/redux/features/authSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const [userRole, setUserRole] = useState<'jobseeker' | 'company_admin'>("jobseeker")

  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Clear error when component mounts or when switching tabs
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch, activeTab])

  useEffect(() => {
    // Check if signup parameter is present
    if (searchParams.get("signup") === "true") {
      setActiveTab("signup")
    }

    // Check if role parameter is present
    if (searchParams.get("role") === "company_admin") {
      setUserRole("company_admin")
    }
  }, [searchParams])

  useEffect(() => {
    // Redirect if already authenticated, except immediately after signup
    if (isAuthenticated && activeTab !== 'signup') {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router, activeTab])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('Starting login process with:', { email });
      const result = await dispatch(login({ email, password }))
      if (login.fulfilled.match(result)) {
        console.log('Login successful:', result.payload)
        // Redirect based on role
        if (result.payload.role === 'company_admin') {
          router.push('client/dashboard')
        } else {
          router.push('/dashboard')
        }
      } else if (login.rejected.match(result)) {
        const errorMessage = typeof result.payload === 'string' ? result.payload : 'Login failed. Please try again.';
        console.error('Login failed:', errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      console.error('Login error:', errorMessage);
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    // Split name into first and last name (simple split by space)
    const [firstName, ...lastNameArray] = name.split(' ')
    const lastName = lastNameArray.join(' ')
    
    // Map the lowercase role from state to the uppercase role string expected by the backend
    const apiRole = userRole === 'jobseeker' ? 'JOB_SEEKER' : 'COMPANY_ADMIN';

    try {
      console.log('Starting registration process with:', { firstName, lastName, email, role: apiRole });
      const result = await dispatch(register({ firstName, lastName, email, password, role: apiRole }))
      
      if (register.fulfilled.match(result)) {
        console.log('Registration successful:', result.payload);
        // Redirect to login page after successful registration
        router.push('/login')
        // Clear form fields
        setEmail('');
        setPassword('');
        setName('');
        setUserRole('jobseeker'); // Reset to default role
      } else if (register.rejected.match(result)) {
        const errorMessage = typeof result.payload === 'string' ? result.payload : 'Registration failed. Please try again.';
        console.error('Registration failed:', errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      console.error('Registration error:', errorMessage);
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-8 animate-fade-in">
      <div className="w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 dark:bg-gray-800">
            <TabsTrigger
              value="login"
              className="dark:data-[state=active]:bg-[#00A0DC] dark:data-[state=active]:text-white"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="dark:data-[state=active]:bg-[#00A0DC] dark:data-[state=active]:text-white"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="animate-slide-up">
            <Card className="dark:bg-gray-900 dark:border-gray-800 dark-card-hover">
              <CardHeader>
                <CardTitle className="dark:text-white">Welcome Back</CardTitle>
                <CardDescription className="dark:text-gray-400">Log in to your account to continue</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="dark:bg-red-900 dark:border-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}

                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="dark:text-gray-300">
                        Password
                      </Label>
                      <a href="#" className="text-sm text-[#0077B5] dark:text-[#00A0DC] hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5] transition-all hover:scale-105 dark-border-glow"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="animate-slide-up">
            <Card className="dark:bg-gray-900 dark:border-gray-800 dark-card-hover">
              <CardHeader>
                <CardTitle className="dark:text-white">Create an account</CardTitle>
                <CardDescription className="dark:text-gray-400">Join JobConnect Pro today</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Label className="dark:text-gray-300">I want to:</Label>
                    <RadioGroup defaultValue={userRole} onValueChange={setUserRole as (value: string) => void} className="grid grid-cols-2 gap-4">
                      <div>
                        <RadioGroupItem value="jobseeker" id="signup-jobseeker" className="peer sr-only" />
                        <Label
                          htmlFor="signup-jobseeker"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#00A0DC] dark:peer-data-[state=checked]:border-[#00A0DC] dark:peer-data-[state=checked]:text-[#00A0DC] [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <User className="mb-2 h-6 w-6" />
                          Find a Job
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="company_admin" id="signup-company_admin" className="peer sr-only" />
                        <Label
                          htmlFor="signup-company_admin"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#00A0DC] dark:peer-data-[state=checked]:border-[#00A0DC] dark:peer-data-[state=checked]:text-[#00A0DC] [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <Briefcase className="mb-2 h-6 w-6" />
                          Hire Talent
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="dark:text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="dark:text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="dark:text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 rounded border-gray-300 text-[#0077B5] focus:ring-[#0077B5] dark:border-gray-700 dark:bg-gray-800"
                      required
                    />
                    <Label htmlFor="terms" className="text-sm dark:text-gray-300">
                      I agree to the{" "}
                      <a href="#" className="text-[#0077B5] dark:text-[#00A0DC] hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#0077B5] dark:text-[#00A0DC] hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5] transition-all hover:scale-105 dark-border-glow"
                  >
                    Create Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
