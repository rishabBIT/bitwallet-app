import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { getTransactionHistory } from '../../api/nodeserver'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import { Loading } from '../../subcomponents/loading/loadingPage'
import TransactionList from './subcomponents/transaction_list'

const TransactionHistoryIncoming = ({ navigation }) => {
  const [history, setHistory] = useState([])
  const [incomingHistory, setIncomingHistory] = useState([])
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setIsloading(true)
        const publicKey = await AsyncStorage.getItem('publicKey')
        res = await getTransactionHistory(publicKey.toString().trim())
        setHistory(res.data.txns)
        // console.log(res.data.txns)

        const incoming = []

        for (const txn of res.data.txns) {
          if (txn.predecessor_account_id !== publicKey.toString().trim()) {
            incoming.push(txn)
          } else {
          }
        }

        setIncomingHistory(incoming)
        setIsloading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const convertDeposit = (amount) => {
    const trxnAmount = amount / 10 ** 24

    return `${
      String(trxnAmount).length > 8
        ? Number(trxnAmount?.toString()?.slice(0, 5))
        : trxnAmount
    } NEAR`
  }

  const getElapsedTime = (timestampWithMilliseconds) => {
    const now = new Date().getTime() // Current time in milliseconds
    const timestamp = Math.floor(timestampWithMilliseconds / 1000000) // Convert to seconds
    const timeDifference = now - timestamp // Time difference in milliseconds
    const seconds = Math.floor(timeDifference / 1000)
    if (seconds < 0) {
      return `a few seconds ago`
    }

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60 && seconds > 0) {
      return `${minutes}min ago`
    }
    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
      return `${hours}h ago`
    }
    const days = Math.floor(hours / 24)
    if (days < 7) {
      return `${days}d ago`
    }
    const weeks = Math.floor(days / 7)
    return `${weeks}w ago`
  }

  if (isLoading)
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
  if (incomingHistory.length === 0) {
    return (
      <Container>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width,
          }}
        >
          <Text style={{ color: 'white', fontSize: 30 }}>
            {i18n.t('noTransaction')}
          </Text>
        </View>
      </Container>
    )
  } else {
    return (
      <Container>
        <View style={{ padding: 20, gap: 20 }}>
          {incomingHistory.length !== 0 && (
            <TransactionList
              transactions={incomingHistory}
              convertDeposit={convertDeposit}
              getElapsedTime={getElapsedTime}
            />
          )}
        </View>
      </Container>
    )
  }
}

export default TransactionHistoryIncoming
