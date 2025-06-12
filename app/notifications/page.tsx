"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, BriefcaseBusiness, CheckCircle2, MessageSquare, Users, Clock, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  type: "job" | "message" | "team" | "connection" | "system"
  title: string
  description: string
  time: string
  read: boolean
  actionUrl?: string
  actionLabel?: string
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching notifications
    const fetchNotifications = async () => {
      try {
        // This would be an API call in a real application
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockNotifications: Notification[] = [
          {
            id: "1",
            type: "job",
            title: "New job match found",
            description: "A new Senior React Developer position at TechCorp matches your profile.",
            time: "10 minutes ago",
            read: false,
            actionUrl: "/jobs/123",
            actionLabel: "View Job",
          },
          {
            id: "2",
            type: "message",
            title: "New message from Sarah Johnson",
            description: "Hi there! I saw your profile and wanted to discuss a potential opportunity...",
            time: "1 hour ago",
            read: false,
            actionUrl: "/chat",
            actionLabel: "Reply",
          },
          {
            id: "3",
            type: "team",
            title: "Team invitation",
            description: 'You have been invited to join the "Frontend Wizards" team.',
            time: "3 hours ago",
            read: true,
            actionUrl: "/teams/456",
            actionLabel: "View Team",
          },
          {
            id: "4",
            type: "connection",
            title: "New connection request",
            description: "Michael Chen wants to connect with you.",
            time: "5 hours ago",
            read: true,
            actionUrl: "/profile/789",
            actionLabel: "View Profile",
          },
          {
            id: "5",
            type: "job",
            title: "Application update",
            description: "Your application for UX Designer at DesignHub has moved to the interview stage.",
            time: "1 day ago",
            read: true,
            actionUrl: "/jobs/applications",
            actionLabel: "View Application",
          },
          {
            id: "6",
            type: "system",
            title: "Profile strength increased",
            description: "Your profile is now 85% complete. Add your recent projects to reach 100%.",
            time: "2 days ago",
            read: true,
            actionUrl: "/profile/me",
            actionLabel: "Update Profile",
          },
          {
            id: "7",
            type: "message",
            title: "New message from Recruiting Team",
            description: "Thank you for your interest in our company. We would like to schedule an interview...",
            time: "2 days ago",
            read: true,
            actionUrl: "/chat",
            actionLabel: "Reply",
          },
        ]

        setNotifications(mockNotifications)
      } catch (error) {
        console.error("Error fetching notifications:", error)
        toast({
          title: "Error",
          description: "Failed to load notifications. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [toast])

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === activeTab)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "Success",
      description: "All notifications marked as read",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "job":
        return <BriefcaseBusiness className="h-5 w-5 text-primary" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "team":
        return <Users className="h-5 w-5 text-purple-500" />
      case "connection":
        return <Users className="h-5 w-5 text-blue-500" />
      case "system":
        return <Bell className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} new
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Stay updated with your job applications, messages, and connections</CardDescription>
          </div>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span className="hidden md:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="hidden md:inline">Unread</span>
              </TabsTrigger>
              <TabsTrigger value="job" className="flex items-center gap-1">
                <BriefcaseBusiness className="h-4 w-4" />
                <span className="hidden md:inline">Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="message" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden md:inline">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Teams</span>
              </TabsTrigger>
              <TabsTrigger value="connection" className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span className="hidden md:inline">Network</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "unread"
                      ? "You've read all your notifications"
                      : "You don't have any notifications yet"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${!notification.read ? "bg-primary/5 dark:bg-primary/10" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            {notification.actionUrl && (
                              <Button variant="outline" size="sm" asChild className="text-xs h-8">
                                <a href={notification.actionUrl}>{notification.actionLabel || "View"}</a>
                              </Button>
                            )}
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs h-8 ml-auto"
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
