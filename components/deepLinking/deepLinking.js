import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Linking, View } from 'react-native'
import Pin from '../pin/keypad'
import { PrimaryButton, SecondaryButton } from '../subcomponents/button/button'
import Container from '../subcomponents/container/container'
import { PrimaryAccentText, PrimaryText } from '../subcomponents/text/text'

const DeepLinkHandler = ({ app_name, redirectUrl, setDeepLink }) => {
  const [status, setStatus] = useState('')
  const [storedPin, setStoredPin] = useState('')
  const [isPinRequired, setIsPinRequired] = useState(false)

  const handleOnClick = async (accepted) => {
    const publicKey = await AsyncStorage.getItem('publicKey')

    if (publicKey === null || publicKey === undefined) {
      alert('No public key found, try logging into the app')
    }

    const appUrl = redirectUrl
    const appDeepLink = `${appUrl}?action=${accepted}&app=BitWallet&publicKey=${publicKey}`

    Linking.openURL(appDeepLink)
      .then(() => {
        console.log(`Opened successfully to ${appDeepLink}`)
      })
      .catch((err) => {
        console.error('Failed to open ', err)
      })

    setDeepLink(false)
  }

  const enterPin = (e) => {
    if (storedPin !== e) {
      setStatus('Invalid Pin')
    } else {
      setIsPinRequired(false)
      handleOnClick('true')
    }
  }

  const checkStatus = async () => {
    const pin = await AsyncStorage.getItem('pin')
    if (pin && pin !== null && pin !== 'null' && pin.length === 4) {
      setIsPinRequired(true)
      setStoredPin(pin)
    }
  }

  if (isPinRequired)
    return <Pin title='Enter Pin' subtitle={status} submit={enterPin} />

  return (
    <Container>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <PrimaryAccentText>{app_name}</PrimaryAccentText>

          <PrimaryText>
            {app_name} needs your permission to log you in.
          </PrimaryText>
        </View>
        <View style={{ flexDirection: 'row', gap: 20, paddingTop: 30 }}>
          <View style={{ flex: 1 }}>
            <PrimaryButton
              title='Accept'
              onPress={() => {
                checkStatus()
                // setDeepLink(true)
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <SecondaryButton
              title='Decline'
              onPress={() => {
                // handleOnClick('false')
                setDeepLink(false)
              }}
            />
          </View>
        </View>
      </View>
    </Container>
  )
}

export default DeepLinkHandler

