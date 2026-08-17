import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from './hooks/redux'
import Layout from './components/Layout'
import Home from './pages/Home'
import Installation from './pages/Installation'
import Technologies from './pages/Technologies'
import Wazuh from './pages/Wazuh'
import Rules from './pages/Rules'
import TheHive from './pages/TheHive'
import Cortex from './pages/Cortex'
import Automation from './pages/Automation'
import Vulnerabilities from './pages/Vulnerabilities'
import Exercises from './pages/Exercises'
import About from './pages/About'

function App() {
  const theme = useAppSelector((s) => s.ui.theme)
  const lang = useAppSelector((s) => s.ui.lang)
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
    document.documentElement.lang = lang
  }, [lang, i18n])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/installation" element={<Installation />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/wazuh" element={<Wazuh />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/thehive" element={<TheHive />} />
        <Route path="/cortex" element={<Cortex />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  )
}

export default App
