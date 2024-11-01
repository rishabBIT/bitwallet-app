import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { getkeys } from '../../../api/nodeserver'
import { PrimaryButton } from '../../../subcomponents/button/button'
// import Container from '../../subcomponents/container/container'
import Container from '../../../subcomponents/container'
import { Loading } from '../../../subcomponents/loading/loadingPage'

import i18n from '../../../locales/i18n'
import { AppBar } from '../../../subcomponents/appbar/appbar'
import CreateAccountInstructions from './subcomponents/instructions'
import PassphraseDisplay from './subcomponents/phraseDisplay'
import VerifyPhrase from './subcomponents/verifyPhrase'

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
      <AppBar
        title={i18n.t('createAccount')}
        back={() => navigation.navigate('CreateorImport')}
      />

      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <CreateAccountInstructions />

        {isLoading && <Loading />}

        {!isLoading && (
          <PassphraseDisplay
            pasphrase={pasphrase}
            poppulateKeys={poppulateKeys}
          />
        )}

        {!isLoading && (
          <PrimaryButton
            title={i18n.t('continue')}
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
