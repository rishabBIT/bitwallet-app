import { View } from 'react-native'
import { IconButton } from '../subcomponents/button/button'
const Footer = ({ view, setView }) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >

      <View style={{flex: 1}}>

      <IconButton
        icon={view === 'wallet' ? 'wallet_selected' : 'wallet'}
        onPress={() => setView('wallet')}
        />
        </View>

      <View style={{flex: 1}}>
      <IconButton
        icon={view === 'certificate' ? 'certificate_selected' : 'certificate'}
        onPress={() => setView('certificate')}
      />
      </View>

      <View style={{flex: 1}}>
      <IconButton
        icon={view === 'assets' ? 'token_selected' : 'token'}
        onPress={() => setView('assets')}
      />
      </View>
    </View>
  )
}

export default Footer
