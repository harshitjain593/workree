import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { connectionService } from "../services/connectionService"

interface ConnectionState {
  pendingConnections: Record<string, boolean>
  loading: boolean
  error: string | null
  success: boolean
  message: string | null
}

const initialState: ConnectionState = {
  pendingConnections: {},
  loading: false,
  error: null,
  success: false,
  message: null,
}

export const sendConnectionRequest = createAsyncThunk(
  "connection/sendRequest",
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await connectionService.sendConnectionRequest(userId)
      if (!result.success) {
        return rejectWithValue(result.message)
      }
      return { userId, message: result.message }
    } catch (error) {
      return rejectWithValue("Failed to send connection request")
    }
  },
)

export const checkConnectionStatus = createAsyncThunk(
  "connection/checkStatus",
  async (userId: string, { rejectWithValue }) => {
    try {
      const isPending = await connectionService.isConnectionPending(userId)
      return { userId, isPending }
    } catch (error) {
      return rejectWithValue("Failed to check connection status")
    }
  },
)

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    resetConnectionState: (state) => {
      state.success = false
      state.error = null
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendConnectionRequest.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
        state.message = null
      })
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload.message
        state.pendingConnections[action.payload.userId] = true
      })
      .addCase(sendConnectionRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
      .addCase(checkConnectionStatus.fulfilled, (state, action) => {
        state.pendingConnections[action.payload.userId] = action.payload.isPending
      })
  },
})

export const { resetConnectionState } = connectionSlice.actions
export default connectionSlice.reducer
