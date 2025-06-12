"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store"
import { logout } from "@/redux/features/authSlice"
import {
  Menu,
  X,
  User,
  MessageSquare,
  Bell,
  Search,
  LogOut,
  Plus,
  Briefcase,
  FolderPlus,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateTeamDialog } from "@/components/teams/create-team-dialog"
import { SearchDropdown } from "./search-dropdown"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const hasNotifications = false // Replace with actual logic to check for notifications

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    router.push("/")
  }

  // Filter navLinks based on user role
  const getNavLinks = () => {
    const baseLinks = [
      { name: "Home", path: "/" },
      { name: "Jobs", path: "/jobs" },
      { name: "Teams", path: "/teams" },
      { name: "Projects", path: "/projects" },
    ]

    if (!isAuthenticated) return baseLinks

    // Add Dashboard link for all authenticated users
    const linksWithDashboard = [...baseLinks, { 
      name: "Dashboard", 
      path: user?.role === "company_admin" ? "/client/dashboard" : "/dashboard" 
    }]

    return linksWithDashboard
  }

  // Get project-related actions for the dropdown menu
  const getProjectActions = () => {
    if (!isAuthenticated) return null

    if (user?.role === "company_admin") {
      return (
        <>
          <DropdownMenuItem asChild className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
            <Link href="/projects">Browse All Projects</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
            <Link href="/projects/post">Post New Project</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
            <Link href="/projects/manage">My Posted Projects</Link>
          </DropdownMenuItem>
        </>
      )
    }

    if (user?.role === "jobseeker") {
      return (
        <>
          <DropdownMenuItem asChild className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
            <Link href="/projects">Find Projects</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
            <Link href="/projects/bids">My Bids</Link>
          </DropdownMenuItem>
        </>
      )
    }

    return null
  }

  const navLinks = getNavLinks()

  // Get role-specific action button
  const getRoleSpecificButton = () => {
    if (!isAuthenticated) return null

    if (user?.role === "company_admin") {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-1 border-[#00A0DC] text-[#00A0DC] hover:bg-[#00A0DC]/10"
          >
            <Link href="/jobs/post">
              <Briefcase className="h-4 w-4" />
              <span>Post Job</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-1 border-[#00A0DC] text-[#00A0DC] hover:bg-[#00A0DC]/10"
          >
            <Link href="/projects/post">
              <FolderPlus className="h-4 w-4" />
              <span>Post Project</span>
            </Link>
          </Button>
        </div>
      )
    }

    if (user?.role === "jobseeker") {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-1 border-[#00A0DC] text-[#00A0DC] hover:bg-[#00A0DC]/10"
          >
            <Link href="/projects">
              <Briefcase className="h-4 w-4" />
              <span>Find Projects</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCreateTeamDialog(true)}
            className="flex items-center gap-1 border-[#00A0DC] text-[#00A0DC] hover:bg-[#00A0DC]/10"
          >
            <Plus className="h-4 w-4" />
            <span>Create Team</span>
          </Button>
        </div>
      )
    }

    return null
  }

  const getUserRoleLabel = () => {
    switch (user?.role) {
      case "jobseeker":
        return "Job Seeker"
      case "company_admin":
        return "Company Admin"
      default:
        return "User"
    }
  }

  // Handle dashboard navigation based on user role
  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (user?.role === "company_admin") {
      router.push("/client/dashboard")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-10 transition-all duration-300 ${
          scrolled
            ? "dark:bg-opacity-80 dark:backdrop-blur-md dark:border-b dark:border-gray-800 dark-glass"
            : "dark:bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <span className="text-2xl font-bold text-[#0077B5] dark:text-[#00A0DC] group-hover:dark-text-glow transition-all">
                  JobConnect
                </span>
                <span className="text-2xl font-bold ml-1 gradient-text">Pro</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative mr-4 group">
                <div className="flex items-center cursor-pointer" onClick={() => setShowSearchDropdown(true)}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:border-transparent bg-transparent dark:bg-gray-800 dark:text-gray-200 transition-all cursor-pointer"
                    readOnly
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-[#00A0DC] transition-colors" />
                </div>
                {showSearchDropdown && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={() => setShowSearchDropdown(false)}
                  >
                    <div className="container mx-auto px-4 pt-16">
                      <SearchDropdown onClose={() => setShowSearchDropdown(false)} />
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={link.name === "Dashboard" ? handleDashboardClick : undefined}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105 ${
                      pathname === link.path
                        ? "text-[#0077B5] dark:text-[#00A0DC] font-semibold dark-text-glow"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#0077B5] dark:hover:text-[#00A0DC]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {getRoleSpecificButton()}
              </div>

              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="relative hover:bg-gray-800 transition-colors" asChild>
                    <Link href="/notifications">
                      <Bell className="h-5 w-5 text-gray-300 hover:text-[#00A0DC] transition-colors" />
                      {hasNotifications && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle"></span>
                      )}
                    </Link>
                  </Button>

                  <Button variant="ghost" size="icon" asChild className="hover:bg-gray-800 transition-colors">
                    <Link href="/chat">
                      <MessageSquare className="h-5 w-5 text-gray-300 hover:text-[#00A0DC] transition-colors" />
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-800 transition-colors">
                        <User className="h-5 w-5 text-gray-300 hover:text-[#00A0DC] transition-colors" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="dark:bg-gray-900 dark:border-gray-700">
                      <DropdownMenuLabel className="dark:text-gray-200">
                        {user?.name || "My Account"}
                        <p className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                          {getUserRoleLabel()}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="dark:bg-gray-700" />
                      <DropdownMenuItem
                        asChild
                        className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                      >
                        <Link href="/profile/me">Profile</Link>
                      </DropdownMenuItem>

                      {/* Dashboard link */}
                      <DropdownMenuItem
                        onClick={handleDashboardClick}
                        className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>

                      {/* Company Admin specific links */}
                      {user?.role === "company_admin" && (
                        <>
                          <DropdownMenuSeparator className="dark:bg-gray-700" />
                          <DropdownMenuLabel className="dark:text-gray-400 text-xs">Company Admin</DropdownMenuLabel>
                          <DropdownMenuItem
                            asChild
                            className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                          >
                            <Link href="/jobs/post">Post Job</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            asChild
                            className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                          >
                            <Link href="/projects/post">Post Project</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            asChild
                            className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                          >
                            <Link href="/projects/manage">Manage Projects</Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      {/* Project-related links for job seekers */}
                      {user?.role === "jobseeker" && (
                        <>
                          <DropdownMenuSeparator className="dark:bg-gray-700" />
                          <DropdownMenuLabel className="dark:text-gray-400 text-xs">Projects</DropdownMenuLabel>
                          {getProjectActions()}
                        </>
                      )}

                      <DropdownMenuSeparator className="dark:bg-gray-700" />
                      <DropdownMenuItem
                        asChild
                        className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                      >
                        <Link href="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="dark:bg-gray-700" />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    asChild
                    className="dark:text-gray-200 dark:hover:bg-gray-800 transition-all hover:scale-105"
                  >
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button
                    className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5] transition-all hover:scale-105 dark-border-glow"
                    asChild
                  >
                    <Link href="/login?signup=true">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearchDropdown(true)}
                className="mr-2 hover:bg-gray-800 transition-colors"
              >
                <Search className="h-5 w-5 text-gray-300 hover:text-[#00A0DC] transition-colors" />
              </Button>

              {isAuthenticated && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative mr-2 hover:bg-gray-800 transition-colors"
                    asChild
                  >
                    <Link href="/notifications">
                      <Bell className="h-5 w-5 text-gray-300 hover:text-[#00A0DC] transition-colors" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle"></span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="mr-2 hover:bg-gray-800 transition-colors">
                    <Link href="/chat">
                      <MessageSquare className="h-5 w-5 text-gray-300 hover:text-[#00A0DC] transition-colors" />
                    </Link>
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-300 hover:text-[#00A0DC] transition-colors" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-300 hover:text-[#00A0DC] transition-colors" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden dark:bg-gray-900 dark:border-gray-800 px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-md animate-fade-in">
            <div className="stagger-animation">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={(e) => {
                    if (link.name === "Dashboard") {
                      e.preventDefault()
                      handleDashboardClick(e)
                    }
                    setIsMenuOpen(false)
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium animate-slide-up ${
                    pathname === link.path
                      ? "text-[#0077B5] dark:text-[#00A0DC] font-semibold dark-text-glow"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#0077B5] dark:hover:text-[#00A0DC]"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile action buttons */}
              {isAuthenticated && user?.role === "company_admin" && (
                <>
                  <Link
                    href="/jobs/post"
                    className="flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium text-[#00A0DC] animate-slide-up"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${navLinks.length * 0.05}s` }}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Post Job</span>
                  </Link>
                  <Link
                    href="/projects/post"
                    className="flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium text-[#00A0DC] animate-slide-up"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${(navLinks.length + 1) * 0.05}s` }}
                  >
                    <FolderPlus className="h-4 w-4" />
                    <span>Post Project</span>
                  </Link>
                </>
              )}
            </div>

            {isAuthenticated ? (
              <div className="stagger-animation">
                <Link
                  href="/profile/me"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#0077B5] dark:hover:text-[#00A0DC] animate-slide-up"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>

                {/* Project-related mobile links for job seekers */}
                {user?.role === "jobseeker" && (
                  <Link
                    href="/projects/bids"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#0077B5] dark:hover:text-[#00A0DC] animate-slide-up"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bids
                  </Link>
                )}

                {/* Project management for company admins */}
                {user?.role === "company_admin" && (
                  <Link
                    href="/projects/manage"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#0077B5] dark:hover:text-[#00A0DC] animate-slide-up"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Manage Projects
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#0077B5] dark:hover:text-[#00A0DC] animate-slide-up"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-3 pt-2 stagger-animation">
                <Button
                  variant="outline"
                  asChild
                  className="dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 animate-slide-up"
                >
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button
                  className="bg-[#0077B5] hover:bg-[#005885] dark:bg-[#00A0DC] dark:hover:bg-[#0077B5] animate-slide-up dark-border-glow"
                  asChild
                >
                  <Link href="/login?signup=true" onClick={() => setIsMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Create Team Dialog */}
      <CreateTeamDialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog} />

      {/* Mobile Search Dropdown */}
      {showSearchDropdown && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-40">
          <div className="container mx-auto px-4 pt-16">
            <SearchDropdown onClose={() => setShowSearchDropdown(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
