import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import QRCode from 'react-qr-code'
import Container from '../../subcomponents/container'
import { AppBar } from '../subcomponents/appbar/appbar'
import { PrimaryAccentText, PrimaryText } from '../subcomponents/text/text'
import PinInput from './pinInput'
import SeedPhrase from './seedPhrase'
import i18n from '../../locales/i18n'

const AccountdetailsOne = ({ navigation }) => {
  const [account, setAccount] = useState('')
  const [view, setView] = useState(1)

  const poppulateAccount = async () => {
    AsyncStorage.getItem('publicKey')
      .then((res) => {
        setAccount(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    poppulateAccount()
  }, [])

  if (view === 2) return <PinInput setView={setView} />
  if (view === 3) return <SeedPhrase setView={setView} />

  return (
    <Container>
      <AppBar title={i18n.t('accountDetails')} back={navigation} />
      <View
        style={{
          flex: 1,
          padding: 20,
          //   justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <View style={{ gap: 10, marginVertical: 30 }}>
          <PrimaryAccentText
            align={'left'}
            fontColor={'#FFFFFF'}
            fontWeight={'bold'}
          >
            {i18n.t('accountID')}:{' '}
          </PrimaryAccentText>
          <PrimaryText align={'left'}>{account}</PrimaryText>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            marginHorizontal: 30,
            marginVertical: 30,
            // gap: 10,
            borderRadius: 20,
          }}
        >
          <QRCode
            size={212}
            style={{
              height: 'auto',
              maxWidth: 300,
              width: '80%',
            }}
            value={account}
            viewBox={`0 0 256 256`}
            bgColor='#FFFFFF'
            fgColor='#000000'
          />
          <Text
            style={{
              color: '#000000',
              paddingTop: 10,
              fontSize: 16,
              textAlign: 'justify',
            }}
          >
            {i18n.t('scanQRText')}
          </Text>
        </View>

        {/* <PrimaryButton title='Export Passphrase' onPress={() => setView(2)} /> */}
      </View>
    </Container>
  )
}

export default AccountdetailsOne
