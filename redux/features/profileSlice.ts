import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Skill {
  id: string
  name: string
}

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  url?: string
}

interface Availability {
  days: string[]
  timeSlots: string[]
}

interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  description: string
}

interface Education {
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string | null
}

interface Certification {
  name: string
  issuer: string
  date: string
}

interface Language {
  language: string
  proficiency: string
}

export interface Profile {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  location?: string
  headline?: string
  about?: string
  currentCompany?: string
  noticePeriod?: string
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
  languages: Language[]
  availability: Availability
  resumeUrl?: string
  projects: Project[]
  createdAt: string
  updatedAt: string
}

interface ProfileState {
  profile: Profile | null
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  success: false,
}

// Create profile
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (profileData: Omit<Profile, "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock data
      const newProfile = {
        ...profileData,
        id: `profile-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // In a real app, we would save to the server
      // For now, we'll just return the new profile
      return newProfile
    } catch (error) {
      return rejectWithValue("Failed to create profile")
    }
  },
)

// Get profile
export const getProfile = createAsyncThunk("profile/getProfile", async (userId: string, { rejectWithValue }) => {
  try {
    // Simulate API call
    const response = await fetch("/mock/profiles.json")
    const profiles = await response.json()

    // Find profile for the user
    const profile = profiles.find((p: Profile) => p.userId === userId)

    if (!profile) {
      return rejectWithValue("Profile not found")
    }

    return profile
  } catch (error) {
    return rejectWithValue("Failed to fetch profile")
  }
})

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.success = true
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetProfileState } = profileSlice.actions
export default profileSlice.reducer
