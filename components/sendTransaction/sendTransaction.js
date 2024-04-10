import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import Container from '../../subcomponents/container'
import { getbalance, sendNear } from '../subcomponents/api/nodeserver'
import { AppBar } from '../subcomponents/appbar/appbar'
import { PrimaryButton } from '../subcomponents/button/button'
import Input from '../subcomponents/input/input'
import { Loading } from '../subcomponents/loading/loadingPage'
import { SecondaryText } from '../subcomponents/text/text'

const checkAddressValidity = (e) => {
  const lastFiveChars = e.slice(-5)
  const lastEightChars = e.slice(-8)
  return (
    lastFiveChars === '.near' ||
    lastEightChars === '.testnet' ||
    lastEightChars === '.mainnet' ||
    e.length === 64
  )
}

const SendTransaction = ({ navigation }) => {
  const route = useRoute()

  const [balance, setBalance] = useState(0)
  const [displaybalance, setDisplayBalance] = useState('0.00')
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState('')
  const [isAddressValid, setIsAddressValid] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const poppulateInitialData = () => {
    try {
      const { transactionData } = route.params
      setAddress(transactionData.address)
      setIsAddressValid(checkAddressValidity(transactionData.address))
    } catch (e) {
      console.log(e)
    }
  }

  const poppulateBalance = async () => {
    getbalance()
      .then((res) => {
        if (res.status === 'success') {
          const newBalance = parseFloat(res.data.balance)
          setBalance(newBalance)
          const roundedbalance = newBalance.toFixed(4)
          setDisplayBalance(roundedbalance)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    poppulateInitialData()
    poppulateBalance()
  }, [])

  const updateAmount = (e) => {
    if (e > balance) return
    setAmount(e)
  }

  const updateAddress = (e) => {
    setAddress(e)
    const isvalid = checkAddressValidity(e)
    if (isvalid) setIsAddressValid(true)
    else {
      setIsAddressValid(false)
    }
  }

  const send = async () => {
    setIsloading(true)
    await sendNear(address, amount)
      .then((res) => {
        if (res.status === 'failed') {
          alert('Transaction Failed. Please check the data carefully.')
        }
      })
      .catch((err) => console.log(err))
    setIsloading(false)
    navigation.navigate('Home')
  }

  return (
    <Container>
      <AppBar title={'Send NEAR'} back={navigation} />
      <View
        style={{
          flex: 1,
          padding: 20,
          // justifyContent: 'space-between',
          gap: 20,
        }}
      >
        {/* <PrimaryAccentText>Send NEAR</PrimaryAccentText> */}
        <View>
          <Input
            label='Amount'
            type='number'
            keyboardType='numeric'
            value={amount.toString()}
            onChangeText={updateAmount}
          />
          <SecondaryText>Available balance : {displaybalance}</SecondaryText>
        </View>
        <Input
          label='Account ID'
          value={address.toString()}
          onChangeText={updateAddress}
        />
        <SecondaryText>
          The account ID must include a Top Level Account such as .near or
          contain exactly 64 characters
        </SecondaryText>
        {isAddressValid && !isLoading && (
          <PrimaryButton title='Send' endIcon={'send'} onPress={send} />
        )}

        {isLoading && (
          <View style={{ paddingTop: 20 }}>
            <Loading />
          </View>
        )}
      </View>
    </Container>
  )
}

export default SendTransaction
