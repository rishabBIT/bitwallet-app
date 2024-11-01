import { View } from 'react-native'
import { SecondaryButton } from '../../subcomponents/button/button'
import Container from '../../subcomponents/container'
import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
  WarningText,
} from '../../subcomponents/text/text'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { deleteDevice } from '../../api/nodeserver'
import i18n from '../../locales/i18n'
import { PrimaryButton } from '../../subcomponents/button/button'
import LoadingPage from '../../subcomponents/loading/loadingPage'
import Pin from '../pin/keypad'

const ResetAccount = ({ navigation }) => {
  const [isPin, setIsPin] = useState(false)
  const [pin, setPin] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsloading] = useState(false)

  const poppulatePin = async () => {
    AsyncStorage.getItem('pin')
      .then((res) => {
        setPin(res)
      })
      .catch((err) => console.log(err))
  }

  const submitPin = async (e) => {
    setStatus('')
    if (e !== pin) {
      setStatus('Invalid Pin')
    } else {
      setIsloading(true)
      try {
        const result = await deleteDevice()
      } catch (e) {
        console.log(e)
      }
      await AsyncStorage.clear()
      navigation.navigate('CreateorImport')
      navigation.popToTop()
      setIsloading(false)
    }
  }

  useEffect(() => {
    poppulatePin()
  }, [])

  if (isLoading) return <LoadingPage />

  if (isPin)
    return (
      <Pin title={i18n.t('enterPin')} subtitle={status} submit={submitPin} />
    )

  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 20,
          gap: 20,
          justifyContent: 'center',
        }}
      >
        <PrimaryAccentText>{i18n.t('resetAccount')}</PrimaryAccentText>
        <PrimaryText>{i18n.t('resetAccounTextOne')}</PrimaryText>
        <WarningText>{i18n.t('resetAccounTextTwo')}</WarningText>
        <View>
          <SecondaryText>{i18n.t('resetAccounTextThree')}</SecondaryText>
        </View>
        <PrimaryButton
          title={i18n.t('resetAccount')}
          endIcon={'refresh'}
          onPress={() => setIsPin(true)}
        />
        <SecondaryButton
          title={i18n.t('cancel')}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </Container>
  )
}

export default ResetAccount
