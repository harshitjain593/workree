"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, X, Maximize2, Minimize2, Send, Paperclip, Smile, Search, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  senderId: string
  timestamp: string
  messageType: "text" | "system"
}

interface Participant {
  id: string
  name: string
  avatar: string
}

interface DirectConversation {
  id: string
  type: "direct"
  participantName: string
  participantAvatar: string
  participantId: string
  lastMessage: Message | null
  messages: Message[]
  unreadCount: number
  isOnline: boolean
  lastSeen: string
}

interface TeamConversation {
  id: string
  type: "team"
  teamName: string
  teamId: string
  participants: Participant[]
  lastMessage: Message | null
  messages: Message[]
  unreadCount: number
}

type Conversation = DirectConversation | TeamConversation

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: "1",
    type: "direct" as const,
    participantName: "Sarah Johnson",
    participantAvatar: "/placeholder.svg?height=40&width=40",
    participantId: "user1",
    lastMessage: {
      id: "msg1",
      content: "Hey! How's the project going?",
      senderId: "user1",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      messageType: "text" as const,
    },
    messages: [
      {
        id: "msg1",
        content: "Hey! How's the project going?",
        senderId: "user1",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        messageType: "text" as const,
      },
      {
        id: "msg2",
        content: "It's going well! Just finished the frontend components.",
        senderId: "currentUser",
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        messageType: "text" as const,
      },
    ],
    unreadCount: 1,
    isOnline: true,
    lastSeen: new Date().toISOString(),
  },
  {
    id: "2",
    type: "team" as const,
    teamName: "Frontend Development Team",
    teamId: "team1",
    participants: [
      { id: "user1", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "user2", name: "Mike Chen", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "currentUser", name: "You", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    lastMessage: {
      id: "msg3",
      content: "Welcome to the Frontend Development Team chat!",
      senderId: "system",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      messageType: "system" as const,
    },
    messages: [
      {
        id: "msg3",
        content: "Welcome to the Frontend Development Team chat!",
        senderId: "system",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        messageType: "system" as const,
      },
    ],
    unreadCount: 0,
  },
]

// Mock users for search
const mockUsers = [
  { id: "user3", name: "Alex Rodriguez", avatar: "/placeholder.svg?height=40&width=40", title: "Backend Developer" },
  { id: "user4", name: "Emily Davis", avatar: "/placeholder.svg?height=40&width=40", title: "UI/UX Designer" },
  { id: "user5", name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40", title: "Product Manager" },
]

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(mockUsers)
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Mock authentication
  const router = useRouter()

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  // Search users
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(filtered)
    } else {
      setSearchResults(mockUsers)
    }
  }, [searchQuery])

  // Close chat when navigating to chat page
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname === "/chat") {
        setIsOpen(false)
      }
    }

    window.addEventListener("popstate", handleRouteChange)
    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [])

  const handleOpenChat = (conversationId: string) => {
    setActiveChat(conversationId)
    // Mark as read
    setConversations((prev) =>
      prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv))
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !activeChat) return

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      content: message,
      senderId: "currentUser",
      timestamp: new Date().toISOString(),
      messageType: "text",
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeChat
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage,
            }
          : conv
      )
    )

    setMessage("")
  }

  const handleStartNewChat = (user: { id: string; name: string; avatar: string; title?: string }) => {
    // Check if conversation already exists
    const existingConv = conversations.find(
      (conv) => conv.type === "direct" && "participantId" in conv && conv.participantId === user.id
    )

    if (existingConv) {
      setActiveChat(existingConv.id)
    } else {
      // Create new conversation
      const newConversation: DirectConversation = {
        id: `conv_${Date.now()}`,
        type: "direct",
        participantName: user.name,
        participantAvatar: user.avatar,
        participantId: user.id,
        lastMessage: null,
        messages: [],
        unreadCount: 0,
        isOnline: Math.random() > 0.5,
        lastSeen: new Date().toISOString(),
      }

      setConversations((prev) => [newConversation, ...prev])
      setActiveChat(newConversation.id)
    }

    setIsNewChatOpen(false)
    setSearchQuery("")
  }

  const handleViewAllChats = () => {
    router.push("/chat")
  }

  if (!isAuthenticated) return null

  const activeConversation = activeChat ? conversations.find((conv) => conv.id === activeChat) : null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "bg-white rounded-lg shadow-xl mb-4 overflow-hidden border border-gray-200",
              isExpanded ? "w-[450px] h-[550px]" : "w-[350px] h-[450px]"
            )}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#0077B5] to-[#0a66c2] text-white p-3 flex items-center justify-between">
              {activeChat ? (
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 text-white hover:bg-white/20"
                    onClick={() => setActiveChat(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center">
                    {activeConversation?.type === "team" ? (
                      <div className="flex items-center">
                        <div className="flex -space-x-1 mr-2">
                          {activeConversation.participants?.slice(0, 3).map((participant) => (
                            <Avatar key={participant.id} className="h-6 w-6 border-2 border-white">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{participant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="font-medium text-sm">{activeConversation.teamName}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={activeConversation?.participantAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {activeConversation?.participantName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium text-sm">{activeConversation?.participantName}</span>
                          {activeConversation?.isOnline && (
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                              <span className="text-xs opacity-90">Online</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Messages</span>
                  <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Start New Conversation</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search people..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {searchResults.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                              onClick={() => handleStartNewChat(user)}
                            >
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            {activeChat ? (
              <div className="flex flex-col h-[calc(100%-110px)]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                  {activeConversation?.messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.messageType === "system" ? (
                        <div className="text-center">
                          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                            {msg.content}
                          </span>
                        </div>
                      ) : (
                        <div className={`flex ${msg.senderId === "currentUser" ? "justify-end" : "justify-start"}`}>
                          {msg.senderId !== "currentUser" && activeConversation.type === "team" && (
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback className="text-xs">
                                {activeConversation.participants?.find((p) => p.id === msg.senderId)?.name.charAt(0) ||
                                  "U"}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {msg.senderId !== "currentUser" && activeConversation.type === "direct" && (
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarImage src={activeConversation.participantAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{activeConversation.participantName.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[75%] rounded-lg px-3 py-2 ${
                              msg.senderId === "currentUser"
                                ? "bg-[#0077B5] text-white rounded-br-none"
                                : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                            }`}
                          >
                            {activeConversation.type === "team" && msg.senderId !== "currentUser" && (
                              <p className="text-xs font-medium mb-1 opacity-70">
                                {activeConversation.participants?.find((p) => p.id === msg.senderId)?.name}
                              </p>
                            )}
                            <p className="text-sm">{msg.content}</p>
                            <div
                              className={`text-xs mt-1 ${msg.senderId === "currentUser" ? "text-blue-100" : "text-gray-500"}`}
                            >
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-3 border-t bg-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="pr-20"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button type="submit" size="icon" className="h-8 w-8 bg-[#0077B5] hover:bg-[#0a66c2]">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100%-56px)] overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-gray-500">No conversations yet</p>
                    <Button variant="link" className="mt-2 text-[#0077B5]" onClick={() => setIsNewChatOpen(true)}>
                      Start a conversation
                    </Button>
                  </div>
                ) : (
                  <div>
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b transition-colors"
                        onClick={() => handleOpenChat(conversation.id)}
                      >
                        {conversation.type === "team" ? (
                          <div className="flex -space-x-1 mr-3">
                            {conversation.participants?.slice(0, 2).map((participant) => (
                              <Avatar key={participant.id} className="h-10 w-10 border-2 border-white">
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        ) : (
                          <div className="relative mr-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={conversation.participantAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{conversation.participantName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {conversation.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-sm truncate">
                              {conversation.type === "team" ? conversation.teamName : conversation.participantName}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {conversation.lastMessage
                                ? new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {conversation.lastMessage?.content || "No messages yet"}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 bg-[#0077B5]">{conversation.unreadCount}</Badge>
                        )}
                      </div>
                    ))}
                    <div className="p-3 text-center">
                      <Button variant="link" className="text-[#0077B5]" onClick={handleViewAllChats}>
                        View all messages
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0077B5] hover:bg-[#0a66c2] text-white rounded-full p-3 shadow-lg"
      >
        <MessageSquare className="h-6 w-6" />
        {totalUnread > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500">{totalUnread}</Badge>
        )}
      </Button>
    </div>
  )
}
