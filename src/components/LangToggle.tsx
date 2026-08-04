import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setLang, type Lang } from '../store/uiSlice'

export default function LangToggle() {
  const { t } = useTranslation('common')
  const lang = useAppSelector((s) => s.ui.lang)
  const dispatch = useAppDispatch()

  function pick(next: Lang) {
    dispatch(setLang(next))
  }

  return (
    <div
      title={t('actions.toggleLanguage')}
      className="flex h-9 items-center rounded-lg border border-border bg-bg-elevated p-0.5 text-xs font-semibold"
    >
      <button
        onClick={() => pick('en')}
        className={`rounded-md px-2 py-1.5 transition ${lang === 'en' ? 'bg-accent text-bg' : 'text-fg-muted hover:text-fg'}`}
      >
        EN
      </button>
      <button
        onClick={() => pick('fr')}
        className={`rounded-md px-2 py-1.5 transition ${lang === 'fr' ? 'bg-accent text-bg' : 'text-fg-muted hover:text-fg'}`}
      >
        FR
      </button>
    </div>
  )
}
