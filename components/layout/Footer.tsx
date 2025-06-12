import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 dark:border-t dark:border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">JobConnect Pro</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connecting talented professionals with top companies worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Job Search
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Premium Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">For Recruiters</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recruiter"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Find Candidates
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Find Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Recruitment Tools
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#00A0DC] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p>&copy; {new Date().getFullYear()} JobConnect Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
