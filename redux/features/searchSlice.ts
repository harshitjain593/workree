import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userService } from "../services/userService"
import { teamService } from "../services/teamService"
import { companyService } from "../services/companyService"
import type { User } from "@/types/user"
import type { Team } from "@/types/team"
import type { Company } from "@/types/company"

interface SearchState {
  query: string
  results: {
    users: User[]
    teams: Team[]
    companies: Company[]
  }
  loading: boolean
  error: string | null
}

const initialState: SearchState = {
  query: "",
  results: {
    users: [],
    teams: [],
    companies: [],
  },
  loading: false,
  error: null,
}

export const searchAll = createAsyncThunk("search/searchAll", async (query: string, { rejectWithValue }) => {
  try {
    // Perform searches in parallel
    const [users, teams, companies] = await Promise.all([
      userService.searchUsers(query),
      teamService.searchTeams(query),
      companyService.searchCompanies(query),
    ])

    return {
      users: users.slice(0, 5),
      teams: teams.slice(0, 5),
      companies: companies.slice(0, 5),
    }
  } catch (error) {
    return rejectWithValue("Failed to perform search")
  }
})

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    clearSearch: (state) => {
      state.query = ""
      state.results = {
        users: [],
        teams: [],
        companies: [],
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchAll.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setQuery, clearSearch } = searchSlice.actions
export default searchSlice.reducer
