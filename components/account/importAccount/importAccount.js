import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { View } from 'react-native'
import Container from '../../../subcomponents/container'
import useNotifications from '../../notifications/notifications'
import { importkeys, registerDevice } from '../../subcomponents/api/nodeserver'
import { AppBar } from '../../subcomponents/appbar/appbar'
import { PrimaryButton } from '../../subcomponents/button/button'
import Input from '../../subcomponents/input/input'
import { Loading } from '../../subcomponents/loading/loadingPage'
import {
  ErrorText,
  PrimaryAccentText,
  SecondaryText,
} from '../../subcomponents/text/text'
import i18n from '../../../locales/i18n'

const ImportAccount = ({ navigation }) => {
  const [phrase, setPhrase] = useState('')
  const [isloading, setisloading] = useState(false)
  const [error, setError] = useState('')
  const { notification, expoPushToken, registerForPushNotificationsAsync } =
    useNotifications()

  const findAccount = async () => {
    setError('')
    const words = phrase.split(' ')

    if (words.length !== 12) {
      setError(i18n.t('passphraseErrorText'))
      return
    }

    setisloading(true)

    await importkeys(phrase)
      .then(async (res) => {
        const keys = res.data.keys
        await AsyncStorage.setItem('phrase', keys.seedPhrase)
        await AsyncStorage.setItem('publicKey', keys.publicKey)
        await AsyncStorage.setItem('secretKey', keys.secretKey)
        try {
          const token = await registerForPushNotificationsAsync()
          await registerDevice(token.data)
        } catch {
          console.log('could not register device---')
        }
        navigation.navigate('Home')
      })
      .catch((err) => console.log(`Error123 : ${err}`))
    setisloading(false)
  }

  return (
    <Container>
      <AppBar title={i18n.t('recoverAccount')} back={navigation} />
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 30,
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <View style={{ gap: 10 }}>
          <View style={{ paddingBottom: 20, paddingTop: 80 }}>
            <PrimaryAccentText fontColor={'#FFFFFF'} fontWeight={'bold'}>
              {i18n.t('recoverAccountTextOne')}
            </PrimaryAccentText>
          </View>
          <SecondaryText>
            {i18n.t('recoverAccountTextTwo')}

          </SecondaryText>
        </View>
        <Input
          label={`${i18n.t('passphrase')} 12 words`}
          placeholder={i18n.t('enterPassphrase')}
          value={phrase}
          onChangeText={(e) => setPhrase(e.toString().toLowerCase())}
        />
        <ErrorText>{error}</ErrorText>

        {isloading ? (
          // <View style={{ padding: 10 }}>
          <Loading />
        ) : (
          // </View>
          <PrimaryButton title={i18n.t('findMyAccount')} onPress={findAccount} />
        )}
      </View>
    </Container>
  )
}

export default ImportAccount
