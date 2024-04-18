import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import Pin from './keypad'
import i18n from '../../locales/i18n'

const CreatePin = ({ navigation }) => {
  const [step, setStep] = useState(1)
  const [pin, setPin] = useState('')

  handleSubmit = async (e) => {
    if (step === 1) {
      setPin(e)
      setStep(2)
    } else {
      if (pin !== e) {
        alert('Pin did not match.')
        setPin('')
        setStep(1)
      } else {
        try {
          await AsyncStorage.setItem('pin', pin)
          navigation.navigate('Home')
        } catch (e) {
          alert(JSON.stringify(e))
        }
      }
    }
  }

  if (step === 1) {
    return (
      <Pin
        submit={handleSubmit}
        title={i18n.t('createPin')}
        subtitle={i18n.t('createPinText')}
      />
    )
  } else {
    return (
      <Pin
        submit={handleSubmit}
        title={i18n.t('confirmPin')}
        subtitle={i18n.t('confirmPinText')}
      />
    )
  }
}

export default CreatePin
