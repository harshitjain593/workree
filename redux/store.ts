import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/authSlice"
import jobSlice from "./features/jobSlice"
import profileSlice from "./features/profileSlice"
import companySlice from "./features/companySlice"
import searchSlice from "./features/searchSlice"
import teamSlice from "./features/teamSlice"
import chatSlice from "./features/chatSlice"
import connectionSlice from "./features/connectionSlice"
import recruiterSlice from "./features/recruiterSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    jobs: jobSlice,
    profile: profileSlice,
    companies: companySlice,
    search: searchSlice,
    teams: teamSlice,
    chat: chatSlice,
    connections: connectionSlice,
    recruiter: recruiterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
      thunk: {
        extraArgument: { rejectWithValue: (value: any) => value },
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
