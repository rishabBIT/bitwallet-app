import { I18n } from 'i18n-js'
import en from './en'
import es from './es'

import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Updates from 'expo-updates'

const i18n = new I18n()
i18n.translations = {
  en,
  es,
}

// Set the default language
const setDefaultLocale = async () => {
  try {
    i18n.locale = 'en'
    const locale = await AsyncStorage.getItem('locale')
    // i18n.locale = 'es';
    console.log(locale)
    if (locale === 'en' || locale === 'es') {
      i18n.locale = locale ? locale : 'en'
    }
  } catch (error) {
    i18n.locale = 'en'
    console.error('Error setting default locale:', error)
  }
}

setDefaultLocale()

export const changeLocale = async (locale) => {
  // const navigation = useNavigation()
  if (Object.keys(i18n.translations).includes(locale)) {
    try {
      await AsyncStorage.setItem('locale', locale)
      i18n.locale = locale

      reloadApp()

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

const reloadApp = async () => {
  await Updates.reloadAsync()
}

export default i18n
