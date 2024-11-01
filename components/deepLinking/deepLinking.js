import AsyncStorage from '@react-native-async-storage/async-storage'
// import dynamicLinks from '@react-native-firebase/dynamic-links'
import React, { useState } from 'react'
import { Linking, View } from 'react-native'
import i18n from '../../locales/i18n'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../subcomponents/button/button'
import Container from '../../subcomponents/container/container'
import { PrimaryAccentText, PrimaryText } from '../../subcomponents/text/text'
import Pin from '../pin/keypad'

const DeepLinkHandler = ({ app_name, redirectUrl, setDeepLink }) => {
  const [status, setStatus] = useState('')
  const [storedPin, setStoredPin] = useState('')
  const [isPinRequired, setIsPinRequired] = useState(false)

  const handleOnClick = async (accepted) => {
    const publicKey = await AsyncStorage.getItem('publicKey')

    if (publicKey === null || publicKey === undefined) {
      alert('No public key found, try logging into the app')
    }

    // const appUrl = redirectUrl
    // // const appDeepLink = `${appUrl}?action=${accepted}&app=BitWallet&publicKey=${publicKey}`
    // const appDeepLink = await dynamicLinks().buildLink({
    //   link: `login?action=${accepted}&app=BitWallet&publicKey=${publicKey}`,
    //   // domainUriPrefix is created in your Firebase console
    //   domainUriPrefix: 'https://app.eastmojoconnect.com',
    //   // optional setup which updates Firebase analytics campaign
    //   // "banner". This also needs setting up before hand
    //   analytics: {
    //     campaign: 'banner',
    //   },
    //   android: {
    //     packageName: 'com.eastmojo_app',
    //     fallbackUrl:
    //       'https://play.google.com/store/apps/details?id=com.eastmojo_app',
    //   },
    // })

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
    return (
      <Pin title={i18n.t('enterPin')} subtitle={status} submit={enterPin} />
    )

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
                console.log('====================================')
                console.log('accept')
                console.log('====================================')
                // setDeepLink(true)
                checkStatus()
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
