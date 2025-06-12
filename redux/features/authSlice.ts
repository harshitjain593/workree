import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authService, type LoginData, type RegisterData } from "@/lib/api/auth"
import type { PayloadAction } from "@reduxjs/toolkit"

// Define the initial state
interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
    role: string
  } | null
  loading: boolean
  error: string | null
  isClientLoaded: boolean
}

// Initial state for both server and client
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  isClientLoaded: false,
}

// Create async thunk for login
export const login = createAsyncThunk("auth/login", async (data: LoginData, { rejectWithValue }) => {
  try {
    console.log("Login thunk called with:", data)
    const response = await authService.login(data)
    console.log("Login response in thunk:", response)

    if (!response || !response.data || !response.data.accessToken || !response.data.user) {
      throw new Error("Invalid response from server")
    }

    // Store tokens
    localStorage.setItem("accessToken", response.data.accessToken)
    localStorage.setItem("refreshToken", response.data.refreshToken)

    // Store user data
    const userData = {
      id: response.data.user.id,
      name: `${response.data.user.firstName} ${response.data.user.lastName}`,
      email: response.data.user.email,
      role: response.data.user.role.toLowerCase(), // Convert to lowercase for consistency
    }
    localStorage.setItem("userData", JSON.stringify(userData))

    return userData
  } catch (error: any) {
    console.error("Login thunk error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })

    // Return the error message from the API response if available
    const errorMessage = error.response?.data?.message || error.message || "An error occurred during login"
    return rejectWithValue(errorMessage)
  }
})

// Create async thunk for register
export const register = createAsyncThunk("auth/register", async (data: RegisterData, { rejectWithValue }) => {
  try {
    const response = await authService.register(data)

    // Store tokens
    localStorage.setItem("accessToken", response.data.accessToken)
    localStorage.setItem("refreshToken", response.data.refreshToken)

    // Store user data
    const userData = {
      id: response.data.user.id,
      name: `${response.data.user.firstName} ${response.data.user.lastName}`,
      email: response.data.user.email,
      role: response.data.user.role.toLowerCase(),
    }
    localStorage.setItem("userData", JSON.stringify(userData))

    return userData
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "An error occurred during registration")
  }
})

// Async thunk to load auth state from localStorage
export const loadAuthStateFromLocalStorage = createAsyncThunk("auth/loadFromLocalStorage", async (_, { dispatch }) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken")
    const userData = localStorage.getItem("userData")

    if (accessToken && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch(authSlice.actions.setAuthenticated({ user, isAuthenticated: true }))
      } catch (error) {
        // If parsing fails, clear invalid data
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("userData")
        dispatch(authSlice.actions.setAuthenticated({ user: null, isAuthenticated: false }))
      }
    } else {
      // No tokens found, ensure state is not authenticated
      dispatch(authSlice.actions.setAuthenticated({ user: null, isAuthenticated: false }))
    }
  }
  // Mark client loading as complete
  dispatch(authSlice.actions.setClientLoaded())
})

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("userData")
      }

      // Reset state
      state.isAuthenticated = false
      state.user = null
      state.error = null
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    },
    setAuthenticated: (state, action: PayloadAction<{ user: AuthState["user"]; isAuthenticated: boolean }>) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.user = action.payload.user
    },
    setClientLoaded: (state) => {
      state.isClientLoaded = true
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.user = null
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
