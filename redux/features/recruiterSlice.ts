import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Profile } from "./profileSlice"

interface FilterOptions {
  skills: string[]
  noticePeriod: string[]
  companies: string[]
  availability: string[]
}

interface RecruiterState {
  candidates: Profile[]
  filteredCandidates: Profile[]
  filters: FilterOptions
  loading: boolean
  error: string | null
}

const initialState: RecruiterState = {
  candidates: [],
  filteredCandidates: [],
  filters: {
    skills: [],
    noticePeriod: [],
    companies: [],
    availability: [],
  },
  loading: false,
  error: null,
}

// Fetch candidates
export const fetchCandidates = createAsyncThunk("recruiter/fetchCandidates", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    const response = await fetch("/mock/profiles.json")
    const profiles = await response.json()

    return profiles
  } catch (error) {
    return rejectWithValue("Failed to fetch candidates")
  }
})

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      }

      // Apply filters
      state.filteredCandidates = state.candidates.filter((candidate) => {
        // Filter by skills
        if (state.filters.skills.length > 0) {
          const hasSkill = candidate.skills.some((skill) => state.filters.skills.includes(skill.name))
          if (!hasSkill) return false
        }

        // Filter by notice period
        if (state.filters.noticePeriod.length > 0) {
          if (!state.filters.noticePeriod.includes(candidate.noticePeriod)) {
            return false
          }
        }

        // Filter by company
        if (state.filters.companies.length > 0) {
          if (!state.filters.companies.includes(candidate.currentCompany)) {
            return false
          }
        }

        // Filter by availability
        if (state.filters.availability.length > 0) {
          const hasAvailability = candidate.availability.days.some((day) => state.filters.availability.includes(day))
          if (!hasAvailability) return false
        }

        return true
      })
    },
    clearFilters: (state) => {
      state.filters = {
        skills: [],
        noticePeriod: [],
        companies: [],
        availability: [],
      }
      state.filteredCandidates = state.candidates
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false
        state.candidates = action.payload
        state.filteredCandidates = action.payload
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setFilters, clearFilters } = recruiterSlice.actions
export default recruiterSlice.reducer
