import { View } from 'react-native'
import Container from '../../subcomponents/container'
import { SecondaryButton } from '../subcomponents/button/button'
import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
  WarningText,
} from '../subcomponents/text/text'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Pin from '../pin/keypad'
import { deleteDevice } from '../subcomponents/api/nodeserver'
import { PrimaryButton } from '../subcomponents/button/button'
import LoadingPage from '../subcomponents/loading/loadingPage'

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
      // await AsyncStorage.clear()
      navigation.navigate('Home')
      setIsloading(false)
    }
  }

  useEffect(() => {
    poppulatePin()
  }, [])

  if (isLoading) return <LoadingPage />

  if (isPin)
    return <Pin title={'Enter Pin'} subtitle={status} submit={submitPin} />

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
        <PrimaryAccentText>Reset Account</PrimaryAccentText>
        <PrimaryText>
          Delete all data and account information from the app and start over
        </PrimaryText>
        <WarningText>
          Warning: Account once deleted can not be recovered. Make sure you have
          copied your secret passphrase before resetting.
        </WarningText>
        <View>
          <SecondaryText>Secret phrase can be copied from:</SecondaryText>
          <SecondaryText>
            Menu {'>'} Account-Details {'>'} Export Passphrase{' '}
          </SecondaryText>
        </View>
        <PrimaryButton
          title='Reset Account'
          endIcon={'refresh'}
          onPress={() => setIsPin(true)}
        />
        <SecondaryButton
          title='Cancel X'
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </Container>
  )
}

export default ResetAccount
