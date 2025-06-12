export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string
  read: boolean
  messageType: "text" | "image" | "file" | "system"
  attachments?: MessageAttachment[]
}

export interface MessageAttachment {
  id: string
  name: string
  url: string
  type: "image" | "file"
  size: number
}

export interface Conversation {
  id: string
  type: "direct" | "team"
  name: string
  participants: ConversationParticipant[]
  lastMessage?: Message
  unreadCount: number
  messages: Message[]
  createdAt: string
  updatedAt: string
  teamId?: string // For team conversations
  avatar?: string
  isActive: boolean
}

export interface ConversationParticipant {
  id: string
  name: string
  avatar?: string
  email: string
  role?: string
  isOnline: boolean
  lastSeen?: string
}

export interface ChatState {
  conversations: Conversation[]
  activeConversation: Conversation | null
  loading: boolean
  error: string | null
  searchResults: ConversationParticipant[]
  searchLoading: boolean
  onlineUsers: string[]
  typingUsers: { [conversationId: string]: string[] }
}
