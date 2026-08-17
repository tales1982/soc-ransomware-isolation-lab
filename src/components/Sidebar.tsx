import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../hooks/redux'
import { closeSidebar } from '../store/uiSlice'

const navItems = [
  { to: '/', key: 'home', end: true },
  { to: '/installation', key: 'installation' },
  { to: '/technologies', key: 'technologies' },
  { to: '/wazuh', key: 'wazuh' },
  { to: '/rules', key: 'rules' },
  { to: '/ports', key: 'ports' },
  { to: '/thehive', key: 'thehive' },
  { to: '/cortex', key: 'cortex' },
  { to: '/automation', key: 'automation' },
  { to: '/vulnerabilities', key: 'vulnerabilities' },
  { to: '/exercises', key: 'exercises' },
  { to: '/about', key: 'about' },
]

export default function Sidebar() {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()

  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-4">
      <div className="mb-4 px-2">
        <div className="text-lg font-extrabold tracking-tight text-fg">
          <span className="text-accent">{'>'}</span> {t('site.title')}
        </div>
        <div className="text-xs text-fg-muted">{t('site.subtitle')}</div>
      </div>
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          to={item.to}
          end={item.end}
          onClick={() => dispatch(closeSidebar())}
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-accent/15 text-accent'
                : 'text-fg-muted hover:bg-bg-elevated hover:text-fg'
            }`
          }
        >
          {t(`nav.${item.key}`)}
        </NavLink>
      ))}
    </nav>
  )
}
