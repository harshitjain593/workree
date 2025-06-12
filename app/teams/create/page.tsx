import type { Metadata } from "next"
import TeamForm from "@/components/teams/team-form"

export const metadata: Metadata = {
  title: "Create Team | Job Portal",
  description: "Create a new team on the Job Portal",
}

export default function CreateTeamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TeamForm />
    </div>
  )
}
