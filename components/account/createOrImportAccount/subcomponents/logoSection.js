import { Image } from 'react-native'

const LogoSection = () => {
  return (
    <Image
      source={require('../../../../assets/new/Bitwallet-logo.png')}
      style={{
        width: 200,
        height: 200,
        marginBottom: 20,
        alignSelf: 'center',
      }}
      resizeMode='contain'
    />
  )
}

export default LogoSection
