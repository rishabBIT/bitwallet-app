import { Text, TouchableOpacity, View } from 'react-native'
import Container from '../../subcomponents/container'
import { AppBar } from '../subcomponents/appbar/appbar'
import Icon from '../subcomponents/icon/icon'

const Menu = ({ navigation }) => {
  return (
    <Container>
      <AppBar title={'Menu'} back={navigation} />
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 10,
          // justifyContent: 'space-between',
          width: '100%',
          maxWidth: 500,
          gap: 30,
        }}
      >
        <View
          style={{
            gap: 20,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: '#D8DD00',
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
            onPress={() => navigation.navigate('Accountdetails')}
          >
            <Text align={'left'} style={{ fontSize: 20, letterSpacing: 0.2 }}>
              Account Details
            </Text>
            <Icon icon={'account'} height={30} width={30} fill='#000000' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: '#D8DD00',
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
            onPress={() => navigation.navigate('ResetAccount')}
          >
            <Text style={{ fontSize: 20, letterSpacing: 0.2 }} align={'left'}>
              Reset Account
            </Text>
            <Icon icon={'refresh'} height={30} width={30} fill='#000000' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: '#D8DD00',
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
            onPress={() => navigation.navigate('TabViewExample')}
            // onPress={() => navigation.navigate('TransactionHistoryOutgoing')}
          >
            <Text align={'left'} style={{ fontSize: 20, letterSpacing: 0.2 }}>
              Transaction History
            </Text>
            <Icon icon={'history'} height={30} width={30} fill='#000000' />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: '#D8DD00',
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
            onPress={() => navigation.navigate('NFTTransactionHistory')}
            // onPress={() => navigation.navigate('TransactionHistoryOutgoing')}
          >
            <Text align={'left'} style={{ fontSize: 20, letterSpacing: 0.2 }}>
              NFT Transactions
            </Text>
            <Icon icon={'history'} height={30} width={30} fill='#000000' />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  )
}

export default Menu
