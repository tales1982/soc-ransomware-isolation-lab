import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enInstall from './locales/en/install.json'
import enTech from './locales/en/tech.json'
import enWazuh from './locales/en/wazuh.json'
import enRules from './locales/en/rules.json'
import enThehive from './locales/en/thehive.json'
import enCortex from './locales/en/cortex.json'
import enAutomation from './locales/en/automation.json'
import enCve from './locales/en/cve.json'
import enExercises from './locales/en/exercises.json'
import enAbout from './locales/en/about.json'

import frCommon from './locales/fr/common.json'
import frHome from './locales/fr/home.json'
import frInstall from './locales/fr/install.json'
import frTech from './locales/fr/tech.json'
import frWazuh from './locales/fr/wazuh.json'
import frRules from './locales/fr/rules.json'
import frThehive from './locales/fr/thehive.json'
import frCortex from './locales/fr/cortex.json'
import frAutomation from './locales/fr/automation.json'
import frCve from './locales/fr/cve.json'
import frExercises from './locales/fr/exercises.json'
import frAbout from './locales/fr/about.json'

import ptCommon from './locales/pt/common.json'
import ptHome from './locales/pt/home.json'
import ptInstall from './locales/pt/install.json'
import ptTech from './locales/pt/tech.json'
import ptWazuh from './locales/pt/wazuh.json'
import ptRules from './locales/pt/rules.json'
import ptThehive from './locales/pt/thehive.json'
import ptCortex from './locales/pt/cortex.json'
import ptAutomation from './locales/pt/automation.json'
import ptCve from './locales/pt/cve.json'
import ptExercises from './locales/pt/exercises.json'
import ptAbout from './locales/pt/about.json'

export const defaultNS = 'common'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common', 'home', 'install', 'tech', 'wazuh', 'rules', 'thehive', 'cortex', 'automation', 'cve', 'exercises', 'about'],
    defaultNS,
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        install: enInstall,
        tech: enTech,
        wazuh: enWazuh,
        rules: enRules,
        thehive: enThehive,
        cortex: enCortex,
        automation: enAutomation,
        cve: enCve,
        exercises: enExercises,
        about: enAbout,
      },
      fr: {
        common: frCommon,
        home: frHome,
        install: frInstall,
        tech: frTech,
        wazuh: frWazuh,
        rules: frRules,
        thehive: frThehive,
        cortex: frCortex,
        automation: frAutomation,
        cve: frCve,
        exercises: frExercises,
        about: frAbout,
      },
      pt: {
        common: ptCommon,
        home: ptHome,
        install: ptInstall,
        tech: ptTech,
        wazuh: ptWazuh,
        rules: ptRules,
        thehive: ptThehive,
        cortex: ptCortex,
        automation: ptAutomation,
        cve: ptCve,
        exercises: ptExercises,
        about: ptAbout,
      },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'soc-lab-lang',
      caches: ['localStorage'],
    },
  })

export default i18n
