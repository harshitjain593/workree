"use client"

import type React from "react"
import { useEffect } from 'react';
import { Provider } from "react-redux"
import { store } from "./store"
import { loadAuthStateFromLocalStorage } from './features/authSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(loadAuthStateFromLocalStorage());
  }, []);

  return <Provider store={store}>{children}</Provider>
}
