import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Message, ChatState } from "@/types/message"
import { chatService } from "../services/chatService"

const initialState: ChatState = {
  conversations: [],
  activeConversation: null,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  onlineUsers: [],
  typingUsers: {},
}

// Fetch conversations
export const fetchConversations = createAsyncThunk("chat/fetchConversations", async (_, { rejectWithValue }) => {
  try {
    const conversations = await chatService.getConversations()
    return conversations
  } catch (error) {
    return rejectWithValue("Failed to fetch conversations")
  }
})

// Fetch messages for a conversation
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const messages = await chatService.getMessages(conversationId)
      return { conversationId, messages }
    } catch (error) {
      return rejectWithValue("Failed to fetch messages")
    }
  },
)

// Send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    {
      conversationId,
      content,
      messageType = "text",
    }: { conversationId: string; content: string; messageType?: "text" | "image" | "file" },
    { rejectWithValue },
  ) => {
    try {
      const message = await chatService.sendMessage(conversationId, content, messageType)
      return { conversationId, message }
    } catch (error) {
      return rejectWithValue("Failed to send message")
    }
  },
)

// Search users
export const searchUsers = createAsyncThunk("chat/searchUsers", async (query: string, { rejectWithValue }) => {
  try {
    const users = await chatService.searchUsers(query)
    return users
  } catch (error) {
    return rejectWithValue("Failed to search users")
  }
})

// Create new conversation
export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async (
    { participantId, type = "direct" }: { participantId: string; type?: "direct" | "team" },
    { rejectWithValue },
  ) => {
    try {
      const conversation = await chatService.createConversation(participantId, type)
      return conversation
    } catch (error) {
      return rejectWithValue("Failed to create conversation")
    }
  },
)

// Create team conversation
export const createTeamConversation = createAsyncThunk(
  "chat/createTeamConversation",
  async ({ teamId, teamName, members }: { teamId: string; teamName: string; members: any[] }, { rejectWithValue }) => {
    try {
      const conversation = await chatService.createTeamConversation(teamId, teamName, members)
      return conversation
    } catch (error) {
      return rejectWithValue("Failed to create team conversation")
    }
  },
)

// Mark messages as read
export const markAsRead = createAsyncThunk("chat/markAsRead", async (conversationId: string, { rejectWithValue }) => {
  try {
    await chatService.markAsRead(conversationId)
    return conversationId
  } catch (error) {
    return rejectWithValue("Failed to mark as read")
  }
})

// Delete conversation
export const deleteConversation = createAsyncThunk(
  "chat/deleteConversation",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      await chatService.deleteConversation(conversationId)
      return conversationId
    } catch (error) {
      return rejectWithValue("Failed to delete conversation")
    }
  },
)

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find((c) => c.id === action.payload)
      if (conversation) {
        state.activeConversation = conversation
        // Mark messages as read
        conversation.messages.forEach((msg) => {
          if (msg.senderId !== "currentUser" && !msg.read) {
            msg.read = true
          }
        })
        conversation.unreadCount = 0
      }
    },
    clearActiveConversation: (state) => {
      state.activeConversation = null
    },
    clearSearchResults: (state) => {
      state.searchResults = []
    },
    addTypingUser: (state, action: PayloadAction<{ conversationId: string; userId: string }>) => {
      const { conversationId, userId } = action.payload
      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = []
      }
      if (!state.typingUsers[conversationId].includes(userId)) {
        state.typingUsers[conversationId].push(userId)
      }
    },
    removeTypingUser: (state, action: PayloadAction<{ conversationId: string; userId: string }>) => {
      const { conversationId, userId } = action.payload
      if (state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = state.typingUsers[conversationId].filter((id) => id !== userId)
      }
    },
    updateOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload
      const conversation = state.conversations.find((c) => c.id === message.conversationId)

      if (conversation) {
        conversation.messages.push(message)
        conversation.lastMessage = message
        conversation.updatedAt = message.timestamp

        // Increment unread count if not active conversation
        if (state.activeConversation?.id !== conversation.id) {
          conversation.unreadCount += 1
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false
        state.conversations = action.payload
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false
        const { conversationId, messages } = action.payload
        const conversation = state.conversations.find((c) => c.id === conversationId)
        if (conversation) {
          conversation.messages = messages
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Send message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { conversationId, message } = action.payload
        const conversation = state.conversations.find((c) => c.id === conversationId)
        if (conversation) {
          conversation.messages.push(message)
          conversation.lastMessage = message
          conversation.updatedAt = message.timestamp
        }
        if (state.activeConversation?.id === conversationId) {
          state.activeConversation.messages.push(message)
          state.activeConversation.lastMessage = message
          state.activeConversation.updatedAt = message.timestamp
        }
      })

      // Search users
      .addCase(searchUsers.pending, (state) => {
        state.searchLoading = true
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.payload as string
      })

      // Create conversation
      .addCase(createConversation.fulfilled, (state, action) => {
        const newConversation = action.payload
        state.conversations.unshift(newConversation)
        state.activeConversation = newConversation
      })

      // Create team conversation
      .addCase(createTeamConversation.fulfilled, (state, action) => {
        const teamConversation = action.payload
        state.conversations.unshift(teamConversation)
      })

      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const conversationId = action.payload
        const conversation = state.conversations.find((c) => c.id === conversationId)
        if (conversation) {
          conversation.unreadCount = 0
          conversation.messages.forEach((msg) => {
            if (msg.senderId !== "currentUser") {
              msg.read = true
            }
          })
        }
      })

      // Delete conversation
      .addCase(deleteConversation.fulfilled, (state, action) => {
        const conversationId = action.payload
        state.conversations = state.conversations.filter((c) => c.id !== conversationId)
        if (state.activeConversation?.id === conversationId) {
          state.activeConversation = null
        }
      })
  },
})

export const {
  setActiveConversation,
  clearActiveConversation,
  clearSearchResults,
  addTypingUser,
  removeTypingUser,
  updateOnlineUsers,
  receiveMessage,
} = chatSlice.actions

export default chatSlice.reducer
