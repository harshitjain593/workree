import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { jobService } from "../services/jobService"
import type { Job } from "@/types/job"

interface JobState {
  jobs: Job[]
  featuredJobs: Job[]
  job: Job | null
  loading: boolean
  error: string | null
  success: boolean
  totalJobs: number
  currentPage: number
  totalPages: number
}

const initialState: JobState = {
  jobs: [],
  featuredJobs: [],
  job: null,
  loading: false,
  error: null,
  success: false,
  totalJobs: 0,
  currentPage: 1,
  totalPages: 1,
}

export const fetchJobs = createAsyncThunk("job/fetchJobs", async (filters: any = {}, { rejectWithValue }) => {
  try {
    return await jobService.searchJobs(filters)
  } catch (error) {
    return rejectWithValue("Failed to fetch jobs")
  }
})

export const fetchFeaturedJobs = createAsyncThunk("job/fetchFeaturedJobs", async (limit = 6, { rejectWithValue }) => {
  try {
    return await jobService.getFeaturedJobs(limit)
  } catch (error) {
    return rejectWithValue("Failed to fetch featured jobs")
  }
})

export const fetchJobById = createAsyncThunk("job/fetchJobById", async (id: string, { rejectWithValue }) => {
  try {
    const job = await jobService.getJobById(id)
    if (!job) {
      return rejectWithValue("Job not found")
    }
    return job
  } catch (error) {
    return rejectWithValue("Failed to fetch job")
  }
})

export const createJob = createAsyncThunk("job/createJob", async (jobData: Partial<Job>, { rejectWithValue }) => {
  try {
    return await jobService.createJob(jobData)
  } catch (error) {
    return rejectWithValue("Failed to create job")
  }
})

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    resetJobState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload.jobs
        state.totalJobs = action.payload.total
        state.currentPage = action.payload.page
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchFeaturedJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedJobs.fulfilled, (state, action) => {
        state.loading = false
        state.featuredJobs = action.payload
      })
      .addCase(fetchFeaturedJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true
        state.error = null
        state.job = null
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false
        state.job = action.payload
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createJob.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        // Add the new job to the jobs array if it exists
        if (state.jobs.length > 0) {
          state.jobs = [action.payload, ...state.jobs]
        }
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
  },
})

export const { resetJobState } = jobSlice.actions
export default jobSlice.reducer
