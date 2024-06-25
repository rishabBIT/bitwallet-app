import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Clipboard from 'expo-clipboard'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import { AppBar } from '../subcomponents/appbar/appbar'
import { TertiaryButton } from '../subcomponents/button/button'
import {
  PrimaryAccentText,
  SecondaryText,
  WarningText,
} from '../subcomponents/text/text'

const SeedPhrase = ({ setView, navigation }) => {
  const [phrase, setPhrase] = useState('')

  const poppulatePhrase = async () => {
    AsyncStorage.getItem('phrase')
      .then((res) => {
        setPhrase(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    poppulatePhrase()
  }, [])

  return (
    <Container>
      <AppBar title={i18n.t('exportPassphrase')} back={() => setView(1)} />
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
          // justifyContent: 'space-between',
          width: '100%',
          maxWidth: 500,
          gap: 30,
        }}
      >
        {/* <View style={{ width: 80 }}>
          <LinkButton title='< Back' onPress={() => setView(1)} />
        </View> */}
        <PrimaryAccentText>{i18n.t('secretPassphrase')}</PrimaryAccentText>
        <SecondaryText>{i18n.t('clickToCopy')}</SecondaryText>
        <TertiaryButton
          title={phrase}
          onPress={() => Clipboard.setStringAsync(phrase)}
        />
        <WarningText align={'left'}>
          {i18n.t('exportPassphraseTextOne')}
        </WarningText>
        <WarningText align={'left'}>
          {i18n.t('exportPassphraseTextTwo')}
        </WarningText>
      </View>
    </Container>
  )
}

export default SeedPhrase
