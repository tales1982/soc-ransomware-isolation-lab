import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'
export type Lang = 'en' | 'fr' | 'pt'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('soc-lab-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialLang(): Lang {
  const stored = localStorage.getItem('soc-lab-lang')
  if (stored === 'en' || stored === 'fr' || stored === 'pt') return stored
  const nav = navigator.language?.slice(0, 2)
  if (nav === 'fr') return 'fr'
  if (nav === 'pt') return 'pt'
  return 'en'
}

interface UiState {
  theme: Theme
  lang: Lang
  sidebarOpen: boolean
}

const initialState: UiState = {
  theme: getInitialTheme(),
  lang: getInitialLang(),
  sidebarOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('soc-lab-theme', state.theme)
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
      localStorage.setItem('soc-lab-theme', state.theme)
    },
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload
      localStorage.setItem('soc-lab-lang', state.lang)
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    closeSidebar(state) {
      state.sidebarOpen = false
    },
  },
})

export const { toggleTheme, setTheme, setLang, toggleSidebar, closeSidebar } = uiSlice.actions
export default uiSlice.reducer
