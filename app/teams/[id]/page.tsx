import { notFound } from "next/navigation"
import Image from "next/image"
import { getTeamById } from "@/lib/api/teams"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ExternalLink, Github, Globe, Linkedin, Mail, Phone, Users } from "lucide-react"
import ContactTeamDialog from "@/components/teams/contact-team-dialog"
import JoinTeamDialog from "@/components/teams/join-team-dialog"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id)

  if (!team) {
    return {
      title: "Team Not Found",
    }
  }

  return {
    title: `${team.name} | Job Portal`,
    description: team.description,
  }
}

export default async function TeamProfilePage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id)

  if (!team) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border-2 border-background bg-background flex-shrink-0">
              <Image src={team.logo || "/placeholder.svg"} alt={team.name} fill className="object-cover" />
            </div>

            <div className="space-y-2 flex-1">
              <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
              <p className="text-xl text-muted-foreground">{team.tagline}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {team.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">About the Team</h2>
                <p className="text-muted-foreground whitespace-pre-line">{team.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Team Formation</h2>
                <p className="text-muted-foreground">
                  This team has been working together since {new Date(team.createdAt).toLocaleDateString()}.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="members" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Team Members ({team.members.length})</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {team.members.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full border bg-background flex-shrink-0">
                          <Image
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {member.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {member.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{member.skills.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-2 mt-3">
                            {member.linkedIn && (
                              <a
                                href={member.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary"
                              >
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                              </a>
                            )}

                            {member.github && (
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary"
                              >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                              </a>
                            )}

                            {member.email && (
                              <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary">
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Email</span>
                              </a>
                            )}

                            {member.phone && (
                              <a href={`tel:${member.phone}`} className="text-muted-foreground hover:text-primary">
                                <Phone className="h-4 w-4" />
                                <span className="sr-only">Phone</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Projects ({team.projects.length})</h2>
              <div className="space-y-6">
                {team.projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader className="p-0">
                      {project.imageUrl && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={project.imageUrl || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Project Link</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(project.startDate).toLocaleDateString()} -
                          {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Present"}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="availability" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Team Availability</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Current Status</h3>
                    <Badge
                      variant={
                        team.availability.status === "Available Immediately"
                          ? "success"
                          : team.availability.status === "Not Available"
                            ? "destructive"
                            : "outline"
                      }
                      className="text-sm"
                    >
                      {team.availability.status}
                    </Badge>

                    {team.availability.availableFrom && (
                      <p className="text-sm text-muted-foreground mt-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Available from {new Date(team.availability.availableFrom).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Work Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                      {team.availability.workPreferences.map((preference) => (
                        <Badge key={preference} variant="outline">
                          {preference}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ContactTeamDialog team={team} />
              <JoinTeamDialog team={team} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Team Size</span>
                </div>
                <span className="font-medium">{team.members.length} members</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Projects Completed</span>
                </div>
                <span className="font-medium">{team.projects.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Team Formed</span>
                </div>
                <span className="font-medium">{new Date(team.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
