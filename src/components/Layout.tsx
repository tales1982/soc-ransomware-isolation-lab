import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { toggleSidebar, closeSidebar } from '../store/uiSlice'

export default function Layout({ children }: { children: ReactNode }) {
  const { t } = useTranslation('common')
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(closeSidebar())
    window.scrollTo(0, 0)
  }, [location.pathname, dispatch])

  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="mx-auto flex max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border md:block">
          <Sidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => dispatch(closeSidebar())}
            />
            <aside className="absolute left-0 top-0 h-full w-72 bg-bg shadow-xl">
              <Sidebar />
            </aside>
          </div>
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-bg/80 px-4 py-3 backdrop-blur md:justify-end">
            <button
              onClick={() => dispatch(toggleSidebar())}
              aria-label={t('actions.openMenu')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg-muted md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <LangToggle />
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 px-4 py-8 md:px-10 md:py-12">
            <div className="mx-auto max-w-4xl">{children}</div>
          </main>

          <footer className="border-t border-border px-4 py-6 text-center text-xs text-fg-muted md:px-10">
            <p>{t('footer.builtWith')}</p>
            <p className="mt-1">{t('footer.rights')}</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
