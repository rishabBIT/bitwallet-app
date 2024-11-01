import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import Icon from '../../subcomponents/icon/icon'
import { PrimaryAccentText } from '../../subcomponents/text/text'

const Network = ({ navigation }) => {
  const [network, setNetwork] = useState('')

  const poppulateNetwork = async () => {
    const selectednetwork = await AsyncStorage.getItem('network')
    if (
      selectednetwork &&
      selectednetwork !== null &&
      selectednetwork !== 'null'
    ) {
      setNetwork(JSON.parse(selectednetwork).networkName)
    } else {
      await AsyncStorage.setItem(
        'network',
        JSON.stringify({ networkType: 'mainnet', networkName: 'Mainnet' })
      )
      setNetwork('Mainnet')
    }
  }

  useEffect(() => {
    poppulateNetwork()
  }, [navigation])

  const selectNetwork = async (newNetwork, newNetworkname) => {
    await AsyncStorage.setItem(
      'network',
      JSON.stringify({ networkType: newNetwork, networkName: newNetworkname })
    )
    navigation.navigate('Home')
  }

  return (
    <Container>
      <View style={{ padding: 20, gap: 20, flex: 1, width: '100%' }}>
        <PrimaryAccentText>{i18n.t('selectNetwork')}</PrimaryAccentText>
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
          onPress={() => selectNetwork('mainnet', 'Mainnet')}
        >
          <PrimaryAccentText align={'left'}>
            {i18n.t('mainnet')}
          </PrimaryAccentText>
          {network === 'Mainnet' && (
            <Icon icon={'check'} height={30} width={30} fill='#3498DB' />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
          onPress={() => selectNetwork('testnet', 'Testnet')}
        >
          <PrimaryAccentText align={'left'}>
            {i18n.t('testnet')}
          </PrimaryAccentText>
          {network === 'Testnet' && (
            <Icon icon={'check'} height={30} width={30} fill='#3498DB' />
          )}
        </TouchableOpacity>
      </View>
    </Container>
  )
}

export default Network
