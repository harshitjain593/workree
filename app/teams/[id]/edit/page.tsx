import { notFound } from "next/navigation"
import TeamForm from "@/components/teams/team-form"

// Mock function to get team by ID - replace with actual API call
async function getTeamById(id: string) {
  // Mock teams data
  const mockTeams = [
    {
      id: "team1",
      name: "Web Wizards",
      tagline: "Creating magical web experiences",
      description: "A team of frontend specialists focused on creating beautiful, responsive web applications.",
      logo: "/placeholder.svg?height=60&width=60",
      skills: ["React", "Next.js", "TypeScript", "UI/UX"],
      members: [
        {
          id: "user1",
          name: "John Doe",
          role: "Frontend Developer",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "john@example.com",
          skills: ["React", "TypeScript", "Next.js"],
          joinedAt: "2023-01-15T00:00:00Z",
          permissions: ["admin"],
        },
      ],
      projects: [],
      availability: {
        status: "Available Immediately",
        workPreferences: ["Full-time", "Contract"],
        projectTypes: ["Web Development", "SaaS"],
        hourlyRate: { min: 75, max: 150, currency: "USD" },
      },
      createdAt: "2023-01-15T00:00:00Z",
      updatedAt: "2023-01-15T00:00:00Z",
      ownerId: "user1",
      isPublic: true,
      location: "Remote",
      website: "https://webwizards.dev",
      socialLinks: {
        linkedin: "https://linkedin.com/company/webwizards",
        github: "https://github.com/webwizards",
      },
    },
    {
      id: "team2",
      name: "Full Stack Heroes",
      tagline: "End-to-end solutions",
      description: "End-to-end development team with expertise in modern web technologies.",
      logo: "/placeholder.svg?height=60&width=60",
      skills: ["Node.js", "React", "MongoDB", "AWS"],
      members: [
        {
          id: "user2",
          name: "Jane Smith",
          role: "Full Stack Developer",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "jane@example.com",
          skills: ["Node.js", "React", "MongoDB"],
          joinedAt: "2023-02-01T00:00:00Z",
          permissions: ["admin"],
        },
      ],
      projects: [],
      availability: {
        status: "Available Soon",
        workPreferences: ["Full-time", "Part-time"],
        projectTypes: ["Web Development", "Mobile App"],
        hourlyRate: { min: 80, max: 160, currency: "USD" },
      },
      createdAt: "2023-02-01T00:00:00Z",
      updatedAt: "2023-02-01T00:00:00Z",
      ownerId: "user2",
      isPublic: true,
      location: "New York, NY",
      website: "https://fullstackheroes.com",
      socialLinks: {
        linkedin: "https://linkedin.com/company/fullstackheroes",
        github: "https://github.com/fullstackheroes",
      },
    },
  ]

  return mockTeams.find((team) => team.id === id) || null
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id)

  if (!team) {
    return {
      title: "Team Not Found",
    }
  }

  return {
    title: `Edit ${team.name} | Job Portal`,
    description: `Edit team information for ${team.name}`,
  }
}

export default async function EditTeamPage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id)

  if (!team) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TeamForm team={team} isEditing={true} />
    </div>
  )
}
