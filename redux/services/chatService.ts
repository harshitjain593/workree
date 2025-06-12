import type { Conversation, Message, ConversationParticipant } from "@/types/message"

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: "conv1",
    type: "direct",
    name: "John Doe",
    participants: [
      {
        id: "user1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "john@example.com",
        isOnline: true,
      },
      {
        id: "currentUser",
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "current@example.com",
        isOnline: true,
      },
    ],
    lastMessage: {
      id: "msg1",
      conversationId: "conv1",
      senderId: "user1",
      senderName: "John Doe",
      content: "Hi there! I saw your profile and I think you would be a great fit for our company.",
      timestamp: "2024-01-15T10:30:00Z",
      read: true,
      messageType: "text",
    },
    unreadCount: 0,
    messages: [],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
  },
  {
    id: "conv2",
    type: "direct",
    name: "Jane Smith",
    participants: [
      {
        id: "user2",
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "jane@example.com",
        isOnline: false,
        lastSeen: "2024-01-15T09:00:00Z",
      },
      {
        id: "currentUser",
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "current@example.com",
        isOnline: true,
      },
    ],
    lastMessage: {
      id: "msg2",
      conversationId: "conv2",
      senderId: "user2",
      senderName: "Jane Smith",
      content: "Thanks for your application. When are you available for an interview?",
      timestamp: "2024-01-15T14:15:00Z",
      read: false,
      messageType: "text",
    },
    unreadCount: 2,
    messages: [],
    createdAt: "2024-01-15T14:00:00Z",
    updatedAt: "2024-01-15T14:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
  },
  {
    id: "team-conv1",
    type: "team",
    name: "Frontend Development Team",
    teamId: "team1",
    participants: [
      {
        id: "user1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "john@example.com",
        role: "Frontend Developer",
        isOnline: true,
      },
      {
        id: "user2",
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "jane@example.com",
        role: "UI/UX Designer",
        isOnline: false,
        lastSeen: "2024-01-15T09:00:00Z",
      },
      {
        id: "currentUser",
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "current@example.com",
        role: "Team Lead",
        isOnline: true,
      },
    ],
    lastMessage: {
      id: "msg3",
      conversationId: "team-conv1",
      senderId: "user1",
      senderName: "John Doe",
      content: "Great work on the new feature! The UI looks amazing.",
      timestamp: "2024-01-15T16:45:00Z",
      read: true,
      messageType: "text",
    },
    unreadCount: 0,
    messages: [],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T16:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
  },
]

const mockMessages: Message[] = [
  {
    id: "msg1",
    conversationId: "conv1",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Hi there! I saw your profile and I think you would be a great fit for our company.",
    timestamp: "2024-01-15T10:30:00Z",
    read: true,
    messageType: "text",
  },
  {
    id: "msg2",
    conversationId: "conv1",
    senderId: "currentUser",
    senderName: "Current User",
    content: "Thank you! I appreciate your interest. What position are you hiring for?",
    timestamp: "2024-01-15T10:35:00Z",
    read: true,
    messageType: "text",
  },
  {
    id: "msg3",
    conversationId: "conv1",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "We are looking for a Senior Frontend Developer with React and Next.js experience.",
    timestamp: "2024-01-15T10:40:00Z",
    read: true,
    messageType: "text",
  },
  {
    id: "msg4",
    conversationId: "team-conv1",
    senderId: "currentUser",
    senderName: "Current User",
    content: "Welcome to the Frontend Development Team! Let's build something amazing together.",
    timestamp: "2024-01-15T10:00:00Z",
    read: true,
    messageType: "system",
  },
  {
    id: "msg5",
    conversationId: "team-conv1",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Excited to be part of this team!",
    timestamp: "2024-01-15T10:05:00Z",
    read: true,
    messageType: "text",
  },
]

const mockUsers: ConversationParticipant[] = [
  {
    id: "user3",
    name: "Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "mike@example.com",
    isOnline: true,
  },
  {
    id: "user4",
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "sarah@example.com",
    isOnline: false,
    lastSeen: "2024-01-15T08:00:00Z",
  },
  {
    id: "user5",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "alex@example.com",
    isOnline: true,
  },
]

class ChatService {
  // Get all conversations for current user
  async getConversations(): Promise<Conversation[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockConversations
  }

  // Get messages for a specific conversation
  async getMessages(conversationId: string): Promise<Message[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockMessages.filter((msg) => msg.conversationId === conversationId)
  }

  // Send a message
  async sendMessage(
    conversationId: string,
    content: string,
    messageType: "text" | "image" | "file" = "text",
  ): Promise<Message> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: "currentUser",
      senderName: "Current User",
      content,
      timestamp: new Date().toISOString(),
      read: false,
      messageType,
    }

    return newMessage
  }

  // Search users to start new conversation
  async searchUsers(query: string): Promise<ConversationParticipant[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (!query.trim()) return []

    return mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Create new conversation
  async createConversation(participantId: string, type: "direct" | "team" = "direct"): Promise<Conversation> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const participant = mockUsers.find((user) => user.id === participantId)
    if (!participant) throw new Error("User not found")

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      type,
      name: participant.name,
      participants: [
        participant,
        {
          id: "currentUser",
          name: "Current User",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "current@example.com",
          isOnline: true,
        },
      ],
      unreadCount: 0,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: participant.avatar,
      isActive: true,
    }

    return newConversation
  }

  // Create team conversation when team is created
  async createTeamConversation(teamId: string, teamName: string, members: any[]): Promise<Conversation> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const participants: ConversationParticipant[] = members.map((member) => ({
      id: member.id,
      name: member.name,
      avatar: member.avatar,
      email: member.email,
      role: member.role,
      isOnline: Math.random() > 0.5, // Random online status for demo
      lastSeen: new Date().toISOString(),
    }))

    const teamConversation: Conversation = {
      id: `team-conv-${teamId}`,
      type: "team",
      name: teamName,
      teamId,
      participants,
      unreadCount: 0,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: "/placeholder.svg?height=40&width=40",
      isActive: true,
    }

    // Add welcome message
    const welcomeMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: teamConversation.id,
      senderId: "system",
      senderName: "System",
      content: `Welcome to ${teamName}! This is your team chat room.`,
      timestamp: new Date().toISOString(),
      read: false,
      messageType: "system",
    }

    teamConversation.messages = [welcomeMessage]
    teamConversation.lastMessage = welcomeMessage

    return teamConversation
  }

  // Mark messages as read
  async markAsRead(conversationId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    // In real implementation, this would update the backend
  }

  // Delete conversation
  async deleteConversation(conversationId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    // In real implementation, this would delete from backend
  }

  // Get online users
  async getOnlineUsers(): Promise<string[]> {
    return mockUsers.filter((user) => user.isOnline).map((user) => user.id)
  }
}

export const chatService = new ChatService()
