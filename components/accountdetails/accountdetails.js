import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import QRCode from 'react-qr-code'
import Container from '../../subcomponents/container'
import { AppBar } from '../subcomponents/appbar/appbar'
import { PrimaryButton } from '../subcomponents/button/button'
import { PrimaryAccentText, PrimaryText } from '../subcomponents/text/text'
import PinInput from './pinInput'
import SeedPhrase from './seedPhrase'

const Accountdetails = ({ navigation, isExport = false }) => {
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
      <AppBar title={'Account Details'} back={navigation} />
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <View style={{ gap: 10 }}>
          <PrimaryAccentText
            align={'left'}
            fontColor={'#FFFFFF'}
            fontWeight={'bold'}
          >
            Account ID:{' '}
          </PrimaryAccentText>
          <PrimaryText align={'left'}>{account}</PrimaryText>
        </View>
        <View
          style={{
            padding: 30,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            marginHorizontal: 40,
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
              paddingTop: 24,
              fontSize: 16,
              textAlign: 'justify',
            }}
          >
            Scan the qr code to send NEAR, tokens or NFTs.
          </Text>
        </View>

        <PrimaryButton title='Export Passphrase' onPress={() => setView(2)} />
      </View>
    </Container>
  )
}

export default Accountdetails
