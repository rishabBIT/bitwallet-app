import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { View } from 'react-native'
import { importkeys, registerDevice } from '../../../api/nodeserver'
import i18n from '../../../locales/i18n'
import { AppBar } from '../../../subcomponents/appbar/appbar'
import { PrimaryButton } from '../../../subcomponents/button/button'
import Container from '../../../subcomponents/container'
import Input from '../../../subcomponents/input/input'
import { Loading } from '../../../subcomponents/loading/loadingPage'
import { ErrorText } from '../../../subcomponents/text/text'
import useNotifications from '../../notifications/notifications'
import ImportAccountInstructions from './subcomponents/instructions'

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
      <AppBar
        title={i18n.t('recoverAccount')}
        back={() => navigation.navigate('Home')}
      />
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 30,
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <ImportAccountInstructions />
        <Input
          label={`${i18n.t('passphrase')}`}
          placeholder={i18n.t('enterPassphrase')}
          value={phrase}
          onChangeText={(e) => setPhrase(e.toString().toLowerCase())}
        />
        <ErrorText>{error}</ErrorText>

        {isloading ? (
          <Loading />
        ) : (
          <PrimaryButton
            title={i18n.t('findMyAccount')}
            onPress={findAccount}
          />
        )}
      </View>
    </Container>
  )
}

export default ImportAccount
