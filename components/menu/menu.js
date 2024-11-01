import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import i18n, { changeLocale } from '../../locales/i18n'
import { AppBar } from '../../subcomponents/appbar/appbar'
import Container from '../../subcomponents/container'
import Icon from '../../subcomponents/icon/icon'

const Menu = ({ navigation }) => {
  const [isMenu, setIsMenu] = useState(false)
  return (
    <Container>
      <AppBar title={i18n.t('menu')} back={() => navigation.navigate('Home')} />
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
            onPress={() =>
              // AsyncStorage.clear()
              navigation.navigate('Accountdetails')
            }
          >
            <Text align={'left'} style={{ fontSize: 20, letterSpacing: 0.2 }}>
              {i18n.t('accountDetails')}
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
              {i18n.t('resetAccount')}
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
            onPress={() => navigation.navigate('TabSwitcher')}
            // onPress={() => navigation.navigate('TabViewExample')}
            // onPress={() => navigation.navigate('TransactionHistoryOutgoing')}
          >
            <Text align={'left'} style={{ fontSize: 20, letterSpacing: 0.2 }}>
              {i18n.t('transactionHistory')}
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
              {i18n.t('nftTransactions')}
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
            onPress={() => navigation.navigate('TermsAndConds')}
          >
            <Text style={{ fontSize: 20, letterSpacing: 0.2 }} align={'left'}>
              {i18n.t('termsConds')}
            </Text>
            <Icon icon={'terms'} height={30} width={30} />
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
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Text style={{ fontSize: 20, letterSpacing: 0.2 }} align={'left'}>
              {i18n.t('privacyPolicy')}
            </Text>
            <Icon icon={'privacy'} height={30} width={30} fill='#000000' />
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
            onPress={() => setIsMenu(!isMenu)}
            // onPress={() => navigation.navigate('TransactionHistoryOutgoing')}
          >
            <Text align={'left'} style={{ fontSize: 20, letterSpacing: 0.2 }}>
              {i18n.t('language')}
            </Text>
            <Icon icon={'globe'} height={30} width={30} fill='#000000' />
          </TouchableOpacity>
          <View
            style={{
              height: isMenu ? 90 : 0,
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              right: 200,
              top: 434,
              zIndex: 9999,
              alignItems: 'center',
              marginRight: 20,
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity onPress={() => changeLocale('en')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {isMenu && <Icon icon={'englishUs'} height={20} width={18} />}
                <Text style={styles.text}>English</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeLocale('es')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {isMenu && <Icon icon={'spanish'} height={20} width={18} />}
                <Text style={styles.text}>Spanish</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  )
}

const styles = {
  text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
  },
}

export default Menu
