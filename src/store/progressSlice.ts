import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const STORAGE_KEY = 'soc-lab-exercise-progress'

function loadProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function persist(state: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

interface ProgressState {
  completed: Record<string, boolean>
}

const initialState: ProgressState = {
  completed: loadProgress(),
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    toggleExercise(state, action: PayloadAction<string>) {
      const id = action.payload
      state.completed[id] = !state.completed[id]
      persist(state.completed)
    },
    resetProgress(state) {
      state.completed = {}
      persist(state.completed)
    },
  },
})

export const { toggleExercise, resetProgress } = progressSlice.actions
export default progressSlice.reducer
