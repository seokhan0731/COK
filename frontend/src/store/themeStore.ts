// src/store/themeStore.ts
import { create } from 'zustand'

type ThemeType = 'Light' | 'Dark'

type ThemeStateType = {
  theme: ThemeType
  toggleTheme: () => void
  setTheme: (theme: ThemeType) => void
}

const STORAGE_KEY = 'theme'

const getInitialTheme = (): ThemeType => {
  if (typeof window === 'undefined') return 'Light'
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'Dark' ? 'Dark' : 'Light'
}

const applyTheme = (theme: ThemeType) => {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'Dark')
  localStorage.setItem(STORAGE_KEY, theme)
}

export const useThemeStore = create<ThemeStateType>((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const next: ThemeType = get().theme === 'Dark' ? 'Light' : 'Dark'
    const root = document.documentElement
    root.classList.add('theme-transitioning')
    applyTheme(next)
    set({ theme: next })
    window.setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 300)
  },
  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
}))
