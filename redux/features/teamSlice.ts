import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { teamService } from "../services/teamService"
import type { Team } from "@/types/team"

interface TeamState {
  teams: Team[]
  team: Team | null
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: TeamState = {
  teams: [],
  team: null,
  loading: false,
  error: null,
  success: false,
}

export const fetchTeams = createAsyncThunk("team/fetchTeams", async (_, { rejectWithValue }) => {
  try {
    return await teamService.getTeams()
  } catch (error) {
    return rejectWithValue("Failed to fetch teams")
  }
})

export const fetchTeamById = createAsyncThunk("team/fetchTeamById", async (id: string, { rejectWithValue }) => {
  try {
    const team = await teamService.getTeamById(id)
    if (!team) {
      return rejectWithValue("Team not found")
    }
    return team
  } catch (error) {
    return rejectWithValue("Failed to fetch team")
  }
})

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (teamData: Omit<Team, "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      return await teamService.createTeam(teamData)
    } catch (error) {
      return rejectWithValue("Failed to create team")
    }
  },
)

export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async ({ id, teamData }: { id: string; teamData: Partial<Team> }, { rejectWithValue }) => {
    try {
      return await teamService.updateTeam(id, teamData)
    } catch (error) {
      return rejectWithValue("Failed to update team")
    }
  },
)

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    resetTeamState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false
        state.teams = action.payload
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchTeamById.pending, (state) => {
        state.loading = true
        state.error = null
        state.team = null
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        state.loading = false
        state.team = action.payload
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createTeam.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.teams = [action.payload, ...state.teams]
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
      .addCase(updateTeam.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.team = action.payload
        state.teams = state.teams.map((team) => (team.id === action.payload.id ? action.payload : team))
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
  },
})

export const { resetTeamState } = teamSlice.actions
export default teamSlice.reducer
