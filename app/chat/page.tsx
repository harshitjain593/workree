"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  ChevronLeft,
  Plus,
  Users,
  Trash2,
  Archive,
  Pin,
  Paperclip,
  Smile,
  ImageIcon,
} from "lucide-react"

// Mock data for conversations
const mockConversations = [
  {
    id: "conv1",
    name: "John Doe",
    type: "direct" as const,
    avatar: "/placeholder.svg?height=40&width=40",
    participants: [
      {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
    ],
    lastMessage: {
      id: "msg1",
      content: "Hi there! I saw your profile and I think you would be a great fit for our company.",
      timestamp: "2023-05-01T10:30:00Z",
      senderId: "user1",
      senderName: "John Doe",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      messageType: "text" as const,
      read: true,
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg1",
        content: "Hi there! I saw your profile and I think you would be a great fit for our company.",
        timestamp: "2023-05-01T10:30:00Z",
        senderId: "user1",
        senderName: "John Doe",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        messageType: "text" as const,
        read: true,
      },
      {
        id: "msg2",
        content: "Thank you! I appreciate your interest. What position are you hiring for?",
        timestamp: "2023-05-01T10:35:00Z",
        senderId: "currentUser",
        senderName: "You",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        messageType: "text" as const,
        read: true,
      },
    ],
  },
  {
    id: "conv2",
    name: "Development Team",
    type: "team" as const,
    avatar: "/placeholder.svg?height=40&width=40",
    participants: [
      {
        id: "user2",
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      {
        id: "user3",
        name: "Bob Wilson",
        email: "bob@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
    ],
    lastMessage: {
      id: "msg3",
      content: "Welcome to the Development Team chat!",
      timestamp: "2023-05-02T14:15:00Z",
      senderId: "system",
      senderName: "System",
      senderAvatar: "",
      messageType: "system" as const,
      read: false,
    },
    unreadCount: 2,
    messages: [
      {
        id: "msg3",
        content: "Welcome to the Development Team chat!",
        timestamp: "2023-05-02T14:15:00Z",
        senderId: "system",
        senderName: "System",
        senderAvatar: "",
        messageType: "system" as const,
        read: false,
      },
    ],
  },
]

// Mock users for search
const mockUsers = [
  {
    id: "user4",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "user5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
  },
  {
    id: "user6",
    name: "Diana Prince",
    email: "diana@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
]

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Local state instead of Redux to avoid complications
  const [conversations, setConversations] = useState(mockConversations)
  const [activeConversation, setActiveConversation] = useState<(typeof mockConversations)[0] | null>(null)
  const [searchResults, setSearchResults] = useState(mockUsers)
  const [onlineUsers] = useState(["user1", "user4", "user6"])
  const [typingUsers] = useState<Record<string, string[]>>({})

  const [messageText, setMessageText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const [showConversations, setShowConversations] = useState(true)
  const [showNewChatDialog, setShowNewChatDialog] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [loading] = useState(false)
  const [searchLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  // Use useCallback to prevent infinite re-renders
  const handleResize = useCallback(() => {
    setIsMobileView(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    // Check if mobile view on mount
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  useEffect(() => {
    // Check if there's a candidateId in the URL to start a conversation
    const candidateId = searchParams.get("candidateId")
    if (candidateId) {
      // Find or create conversation with this user
      const existingConv = conversations.find((conv) => conv.participants.some((p) => p.id === candidateId))
      if (existingConv) {
        setActiveConversation(existingConv)
      }
    }
  }, [searchParams, conversations])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation?.messages])

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find((conv) => conv.id === conversationId)
    if (conversation) {
      setActiveConversation(conversation)

      // Mark as read
      setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)))
    }

    if (isMobileView) {
      setShowConversations(false)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!messageText.trim() || !activeConversation) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      content: messageText,
      timestamp: new Date().toISOString(),
      senderId: "currentUser",
      senderName: "You",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      messageType: "text" as const,
      read: false,
    }

    // Update active conversation
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage],
      lastMessage: newMessage,
    }

    setActiveConversation(updatedConversation)

    // Update conversations list
    setConversations((prev) => prev.map((conv) => (conv.id === activeConversation.id ? updatedConversation : conv)))

    setMessageText("")
    setIsTyping(false)
  }

  const handleTyping = (value: string) => {
    setMessageText(value)

    if (!isTyping && value.trim()) {
      setIsTyping(true)
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const handleUserSearch = (query: string) => {
    setUserSearchQuery(query)
    if (query.trim()) {
      const filtered = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(filtered)
    } else {
      setSearchResults(mockUsers)
    }
  }

  const handleStartConversation = (user: (typeof mockUsers)[0]) => {
    // Check if conversation already exists
    const existingConv = conversations.find((conv) => conv.participants.some((p) => p.id === user.id))

    if (existingConv) {
      setActiveConversation(existingConv)
    } else {
      // Create new conversation
      const newConversation = {
        id: `conv-${Date.now()}`,
        name: user.name,
        type: "direct" as const,
        avatar: user.avatar,
        participants: [user],
        lastMessage: null,
        unreadCount: 0,
        messages: [],
      }

      setConversations((prev) => [newConversation, ...prev])
      setActiveConversation(newConversation)
    }

    setShowNewChatDialog(false)
    setUserSearchQuery("")
    setSearchResults(mockUsers)
  }

  const handleDeleteConversation = (conversationId: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== conversationId))
    if (activeConversation?.id === conversationId) {
      setActiveConversation(null)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const getOnlineStatus = (userId: string) => {
    return onlineUsers.includes(userId)
  }

  const getTypingUsers = (conversationId: string) => {
    return typingUsers[conversationId] || []
  }

  // Filter conversations by search term
  const filteredConversations = searchTerm
    ? conversations.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.participants.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : conversations

  return (
    <div className="container mx-auto px-0 md:px-4 py-0 md:py-8 h-[calc(100vh-4rem)]">
      <div className="flex h-full bg-white rounded-lg overflow-hidden shadow-sm border">
        {/* Conversations sidebar */}
        {(showConversations || !isMobileView) && (
          <div className="w-full md:w-1/3 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Messages</h2>
                <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#0077B5] hover:bg-[#005885]">
                      <Plus className="h-4 w-4 mr-1" />
                      New Chat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Start New Conversation</DialogTitle>
                      <DialogDescription>Search for people to start a conversation with.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search people..."
                          value={userSearchQuery}
                          onChange={(e) => handleUserSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      {searchLoading && (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0077B5] mx-auto"></div>
                        </div>
                      )}

                      {searchResults.length > 0 && (
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {searchResults.map((user) => (
                            <Card
                              key={user.id}
                              className="cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => handleStartConversation(user)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    {user.isOnline && (
                                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{user.name}</h4>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {userSearchQuery && !searchLoading && searchResults.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          No users found matching "{userSearchQuery}"
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4 animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No conversations found</p>
                </div>
              ) : (
                <ul>
                  {filteredConversations.map((conversation) => (
                    <li
                      key={conversation.id}
                      className={`border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        activeConversation?.id === conversation.id ? "bg-gray-100" : ""
                      }`}
                      onClick={() => handleSelectConversation(conversation.id)}
                    >
                      <div className="p-4 flex items-start space-x-3">
                        <div className="relative">
                          {conversation.type === "team" ? (
                            <div className="h-12 w-12 bg-[#0077B5] rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                          ) : (
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}

                          {conversation.type === "direct" && conversation.participants.length > 0 && (
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                getOnlineStatus(conversation.participants[0].id) ? "bg-green-500" : "bg-gray-400"
                              }`}
                            ></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium truncate flex items-center gap-2">
                              {conversation.name}
                              {conversation.type === "team" && (
                                <Badge variant="outline" className="text-xs">
                                  Team
                                </Badge>
                              )}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {conversation.lastMessage ? formatTime(conversation.lastMessage.timestamp) : ""}
                              </span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Pin className="h-4 w-4 mr-2" />
                                    Pin conversation
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDeleteConversation(conversation.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate flex-1">
                              {conversation.lastMessage?.messageType === "system" ? (
                                <span className="italic">{conversation.lastMessage.content}</span>
                              ) : (
                                conversation.lastMessage?.content || "No messages yet"
                              )}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="ml-2 bg-[#0077B5] text-white">{conversation.unreadCount}</Badge>
                            )}
                          </div>

                          {conversation.type === "team" && (
                            <div className="flex -space-x-2 mt-2">
                              {conversation.participants.slice(0, 3).map((participant) => (
                                <Avatar key={participant.id} className="h-6 w-6 border-2 border-white">
                                  <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">
                                    {participant.name.substring(0, 1)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {conversation.participants.length > 3 && (
                                <div className="h-6 w-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                                  <span className="text-xs text-gray-600">+{conversation.participants.length - 3}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Chat area */}
        <div className={`${isMobileView && showConversations ? "hidden" : "flex"} flex-col flex-1`}>
          {activeConversation ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between bg-white">
                <div className="flex items-center space-x-3">
                  {isMobileView && (
                    <Button variant="ghost" size="icon" onClick={() => setShowConversations(true)} className="mr-1">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  )}

                  {activeConversation.type === "team" ? (
                    <div className="h-10 w-10 bg-[#0077B5] rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={activeConversation.avatar || "/placeholder.svg"}
                        alt={activeConversation.name}
                      />
                      <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}

                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {activeConversation.name}
                      {activeConversation.type === "team" && (
                        <Badge variant="outline" className="text-xs">
                          Team
                        </Badge>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {activeConversation.type === "team"
                        ? `${activeConversation.participants.length} members`
                        : getOnlineStatus(activeConversation.participants[0]?.id)
                          ? "Online"
                          : "Offline"}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {activeConversation.type === "direct" && (
                    <>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {activeConversation.messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        {activeConversation.type === "team" ? (
                          <Users className="h-8 w-8 text-gray-400" />
                        ) : (
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <h3 className="font-medium mb-2">{activeConversation.name}</h3>
                      <p>
                        {activeConversation.type === "team"
                          ? "This is the beginning of your team conversation."
                          : "This is the beginning of your conversation."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {activeConversation.messages.map((message, index) => {
                      const isCurrentUser = message.senderId === "currentUser"
                      const isSystemMessage = message.messageType === "system"
                      const showDate =
                        index === 0 ||
                        formatDate(message.timestamp) !== formatDate(activeConversation.messages[index - 1].timestamp)

                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="text-center my-4">
                              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                                {formatDate(message.timestamp)}
                              </span>
                            </div>
                          )}

                          {isSystemMessage ? (
                            <div className="text-center my-2">
                              <span className="text-sm text-gray-500 italic bg-gray-100 px-3 py-1 rounded-full">
                                {message.content}
                              </span>
                            </div>
                          ) : (
                            <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                              {!isCurrentUser && activeConversation.type === "team" && (
                                <Avatar className="h-8 w-8 mr-2 mt-1">
                                  <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                                  <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}

                              <div
                                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                                  isCurrentUser
                                    ? "bg-[#0077B5] text-white rounded-br-none"
                                    : "bg-white text-gray-800 rounded-bl-none shadow-sm border"
                                }`}
                              >
                                {!isCurrentUser && activeConversation.type === "team" && (
                                  <p className="text-xs font-medium mb-1 opacity-70">{message.senderName}</p>
                                )}
                                <p>{message.content}</p>
                                <div className={`text-xs mt-1 ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}>
                                  {formatTime(message.timestamp)}
                                  {isCurrentUser && message.read && <span className="ml-1">✓</span>}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {/* Typing indicator */}
                    {getTypingUsers(activeConversation.id).length > 0 && (
                      <div className="flex justify-start">
                        <div className="bg-gray-200 rounded-lg px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Message input */}
              <div className="p-4 border-t bg-white">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Textarea
                      value={messageText}
                      onChange={(e) => handleTyping(e.target.value)}
                      placeholder="Type a message..."
                      className="resize-none pr-24"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(e)
                        }
                      }}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-gray-500">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-gray-500">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-gray-500">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" disabled={!messageText.trim()} className="bg-[#0077B5] hover:bg-[#005885]">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 bg-gray-50">
              <div className="text-center max-w-md">
                <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                <p className="mb-4">Choose a conversation from the list or start a new one.</p>
                {isMobileView && (
                  <Button onClick={() => setShowConversations(true)} className="bg-[#0077B5] hover:bg-[#005885]">
                    View Conversations
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
