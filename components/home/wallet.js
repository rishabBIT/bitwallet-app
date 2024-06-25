import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Clipboard from 'expo-clipboard'
import { useEffect, useState } from 'react'
import { Dimensions, Share, StyleSheet, Text, View } from 'react-native'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import useNotifications from '../notifications/notifications'
import { getbalance, retryFailedCerts } from '../subcomponents/api/nodeserver'
import { LinkButton, PrimaryButton } from '../subcomponents/button/button'
import { Loading } from '../subcomponents/loading/loadingPage'
import { GradientText } from '../subcomponents/text/text'

const Wallet = ({ navigation }) => {
  const [address, setAddress] = useState('')
  const [loading, setIsLoading] = useState(false)
  const [displayAddress, setDisplayAddress] = useState('')
  const [balance, setBalance] = useState(0)
  const [displaybalance, setDisplayBalance] = useState('0.00')
  const { notification, expoPushToken, registerForPushNotificationsAsync } =
    useNotifications(navigation)

  const poppulateAddress = async () => {
    try {
      const publicKey = await AsyncStorage.getItem('publicKey')
      const trimmedPublicKey = publicKey
      setAddress(trimmedPublicKey)
      const shortenedAddress =
        trimmedPublicKey.slice(0, 4) + '...' + trimmedPublicKey.slice(-4) + ' '
      setDisplayAddress(shortenedAddress)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    poppulateAddress()
    poppulateBalance()
    retryFailedCerts()
  }, [])

  const poppulateBalance = async () => {
    setIsLoading(true)
    getbalance()
      .then((res) => {
        if (res.status === 'success') {
          const newBalance = parseFloat(res.data.balance)

          setBalance(newBalance)
          const roundedbalance = newBalance.toFixed(2)

          setDisplayBalance(roundedbalance)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  if (loading)
    return (
      <Container>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            width: Dimensions.get('window').width,
          }}
        >
          <Loading />
        </View>
      </Container>
    )

  return (
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <View style={{ alignItems: 'center', paddingBottom: 20 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '500' }}>
          {i18n.t('account')}
          {/* Account */}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          // gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LinkButton
          color={'#FFFFFF'}
          // endIconColor={'#FFD700'}
          title={displayAddress}
          endIcon={'copy'}
          onPress={() => Clipboard.setStringAsync(address)}
        />

        <LinkButton
          endIconColor={'#FFFFFF'}
          title=''
          endIcon={'share'}
          onPress={() => Share.share({ message: address })}
        />
      </View>
      <View style={{ alignItems: 'center', paddingTop: 50, paddingBottom: 30 }}>
        <GradientText colors={['#BD00FF', '#00B2FF']} style={styles.text}>
          {displaybalance}
        </GradientText>
        <Text style={{ color: '#FFFFFF', fontSize: 36 }}>{i18n.t('near')}</Text>
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.transparentContainer}>
          <PrimaryButton
            title={i18n.t('send')}
            height={14}
            width={14}
            endIcon={'send_one'}
            onPress={() => {
              navigation.navigate('SendTransaction')
              // Toast.show('Hello')
            }}
          />
          <PrimaryButton
            title={i18n.t('receive')}
            height={14}
            width={14}
            endIcon={'receive'}
            onPress={async () => {
              // changeLocale("es")
              navigation.navigate('AccountdetailsOne')
              // AsyncStorage.clear()
            }}
          />
        </View>
      </View>
      {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 65,
    fontWeight: 'bold',
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
  },
  transparentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default Wallet
