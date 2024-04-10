import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { getkeys } from '../../subcomponents/api/nodeserver'
import { PrimaryButton } from '../../subcomponents/button/button'
// import Container from '../../subcomponents/container/container'
import Container from '../../../subcomponents/container'
import { Loading } from '../../subcomponents/loading/loadingPage'

import { AppBar } from '../../subcomponents/appbar/appbar'
import { PrimaryAccentText, SecondaryText } from '../../subcomponents/text/text'
import PassphraseDisplay from './phraseDisplay'
import VerifyPhrase from './verifyPhrase'

const CreateAccount = ({ navigation, back }) => {
  const [pasphrase, setPassphrase] = useState(null)
  const [keys, setKeys] = useState(null)
  const [isLoading, setIsloading] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    poppulateKeys()
  }, [])

  const poppulateKeys = async () => {
    setIsloading(true)
    const response = await getkeys()
    if (response.status === 'success') {
      setPassphrase(response.data.keys.seedPhrase)
      setKeys(response.data.keys)
      setIsloading(false)
    }
  }

  if (isVerifying)
    return (
      <VerifyPhrase
        pasphrase={pasphrase}
        keys={keys}
        back={() => setIsVerifying(false)}
        navigation={navigation}
      />
    )

  return (
    <Container>
      <AppBar title={'Create Account'} back={navigation} />

      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <View style={{ gap: 10 }}>
          <PrimaryAccentText fontColor={'#FFFFFF'} fontWeight={'bold'}>
            Setup Your Secure Passphrase
          </PrimaryAccentText>
          <View style={{ paddingBottom: 10 }}></View>
          <SecondaryText>
            Write down the following words in order and keep them somewhere
            safe.
          </SecondaryText>
          <SecondaryText color={'#D8DD00'}>
            Anyone with access to the passphrase will also have access to your
            account!
          </SecondaryText>
          <SecondaryText>
            You will be asked to verify your passphrase next.
          </SecondaryText>
        </View>

        {isLoading && <Loading />}

        {!isLoading && (
          <PassphraseDisplay
            pasphrase={pasphrase}
            poppulateKeys={poppulateKeys}
          />
        )}

        {!isLoading && (
          <PrimaryButton
            title='Continue'
            onPress={() => {
              setIsVerifying(true)
            }}
          />
        )}
      </View>
    </Container>
  )
}

export default CreateAccount
