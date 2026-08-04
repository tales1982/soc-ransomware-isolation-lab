import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { toggleTheme } from '../store/uiSlice'

export default function ThemeToggle() {
  const { t } = useTranslation('common')
  const theme = useAppSelector((s) => s.ui.theme)
  const dispatch = useAppDispatch()

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      title={t('actions.toggleTheme')}
      aria-label={t('actions.toggleTheme')}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-elevated text-fg-muted transition hover:text-accent hover:border-accent"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
