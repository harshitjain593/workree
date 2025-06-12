import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { companyService } from "../services/companyService"
import type { Company } from "@/types/company"

interface CompanyState {
  companies: Company[]
  company: Company | null
  loading: boolean
  error: string | null
}

const initialState: CompanyState = {
  companies: [],
  company: null,
  loading: false,
  error: null,
}

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (filters: any = {}, { rejectWithValue }) => {
    try {
      return await companyService.getCompanies()
    } catch (error) {
      return rejectWithValue("Failed to fetch companies")
    }
  },
)

export const fetchCompanyById = createAsyncThunk(
  "company/fetchCompanyById",
  async (id: string, { rejectWithValue }) => {
    try {
      const company = await companyService.getCompanyById(id)
      if (!company) {
        return rejectWithValue("Company not found")
      }
      return company
    } catch (error) {
      return rejectWithValue("Failed to fetch company")
    }
  },
)

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false
        state.companies = action.payload
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true
        state.error = null
        state.company = null
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false
        state.company = action.payload
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default companySlice.reducer
