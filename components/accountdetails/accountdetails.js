import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import QRCode from 'react-qr-code'
import { LinkButton, PrimaryButton } from '../subcomponents/button/button'
import Container from '../subcomponents/container/container'
import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
} from '../subcomponents/text/text'
import PinInput from './pinInput'
import SeedPhrase from './seedPhrase'

const Accountdetails = ({ navigation }) => {
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
      <View style={{ padding: 20, gap: 20 }}>
        <View style={{ width: 80 }}>
          <LinkButton
            title='< Back'
            onPress={() => navigation.navigate('Home')}
          />
        </View>

        <PrimaryAccentText>Account Details</PrimaryAccentText>

        <PrimaryText align={'left'}>Account Id: </PrimaryText>
        <PrimaryText align={'left'}>{account}</PrimaryText>
        <View
          style={{
            padding: 10,
            backgroundColor: '#393644',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: 300, width: '100%' }}
            value={account}
            viewBox={`0 0 256 256`}
            bgColor='#393644'
            fgColor='#3498DB'
          />
          <SecondaryText>
            Scan the qr code to send NEAR, tokens or NFTs.
          </SecondaryText>
        </View>
        <PrimaryButton title='Export Passphrase' onPress={() => setView(2)} />
      </View>
    </Container>
  )
}

export default Accountdetails
