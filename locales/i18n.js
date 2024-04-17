import { I18n } from 'i18n-js'
import en from './en'
import es from './es'

import AsyncStorage from '@react-native-async-storage/async-storage'

const i18n = new I18n()
i18n.translations = {
  en,
  es,
}

// Set the default language
const setDefaultLocale = async () => {
  try {
    const locale = await AsyncStorage.getItem('locale')
    // i18n.locale = 'es';
    i18n.locale = locale ? locale : 'en'
  } catch (error) {
    console.error('Error setting default locale:', error)
  }
}

setDefaultLocale()

export const changeLocale = async (locale) => {
  if (Object.keys(i18n.translations).includes(locale)) {
    try {
      await AsyncStorage.setItem('locale', locale)
      i18n.locale = locale
      // Restart()

      // i18n.locale = 'es';
      return true
    } catch (error) {
      console.error('Error setting locale:', error)
      return false
    }
  } else {
    console.warn(`Locale '${locale}' is not supported.`)
    return false
  }
}

export default i18n
