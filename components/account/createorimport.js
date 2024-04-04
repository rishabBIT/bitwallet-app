import { Image, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../subcomponents/button/button'
// import Container from '../subcomponents/container/container'
import Container from '../../subcomponents/container'
import { PrimaryAccentText, SecondaryText } from '../subcomponents/text/text'

const CreateorImport = ({ navigation }) => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <Image
          source={require('../../assets/new/Bitwallet-logo.png')}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
            alignSelf: 'center',
          }}
          resizeMode='contain'
        />

        <PrimaryAccentText>Welcome to Bit-Wallet</PrimaryAccentText>

        <SecondaryText>
          Secure, non-custodial, crypto wallet. Your personal repository of
          verified certificates and documents
        </SecondaryText>

        <View style={{ height: 50 }} />

        <PrimaryButton
          title='Create Account'
          onPress={() => navigation.navigate('CreateAccount')}
        />
        <PrimaryAccentText fontSize={16}>OR</PrimaryAccentText>
        <SecondaryButton
          title='Recover Existing Account'
          onPress={() => navigation.navigate('ImportAccount')}
        />
      </View>
    </Container>
  )
}

export default CreateorImport
