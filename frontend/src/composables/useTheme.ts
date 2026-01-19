import { ref, onMounted } from 'vue'

type Theme = 'light' | 'dark' | 'system'

const theme = ref<Theme>('system')
const isDark = ref(false)

export function useTheme() {
  const STORAGE_KEY = 'theme-preference'

  function getSystemTheme(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  function updateDOM(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    isDark.value = dark
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    localStorage.setItem(STORAGE_KEY, newTheme)

    if (newTheme === 'system') {
      updateDOM(getSystemTheme())
    } else {
      updateDOM(newTheme === 'dark')
    }
  }

  function toggleTheme() {
    if (theme.value === 'light') {
      setTheme('dark')
    } else if (theme.value === 'dark') {
      setTheme('light')
    } else {
      // system -> toggle based on current state
      setTheme(isDark.value ? 'light' : 'dark')
    }
  }

  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null

    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setTheme(stored)
    } else {
      setTheme('system')
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (theme.value === 'system') {
        updateDOM(e.matches)
      }
    })
  }

  onMounted(() => {
    initTheme()
  })

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    initTheme,
  }
}
