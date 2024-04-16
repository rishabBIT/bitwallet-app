import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import Container from '../../subcomponents/container'
import { getTransactionHistory } from '../subcomponents/api/nodeserver'
import LoadingPage from '../subcomponents/loading/loadingPage'
import i18n from '../../locales/i18n'

const TransactionHistoryOutgoing = ({ navigation }) => {
  const [history, setHistory] = useState([])
  const [outgoingHistory, setOutgoingHistory] = useState([])
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setIsloading(true)
      const publicKey = await AsyncStorage.getItem('publicKey')
      res = await getTransactionHistory(publicKey.toString().trim())
      setHistory(res.data.txns)
      const outgoing = []

      for (const txn of res.data.txns) {
        if (
          txn.receiver_account_id !== publicKey.toString().trim() &&
          txn.predecessor_account_id !== 'system'
        ) {
          outgoing.push(txn)
        }
      }

      setOutgoingHistory(outgoing)

      setIsloading(false)
    })()
  }, [])

  const convertDeposit = (amount) => {
    const trxnAmount = amount / 10 ** 24

    return `${String(trxnAmount).length > 8
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

  if (isLoading) return <LoadingPage />
  if (outgoingHistory.length === 0) {
    return (
      // <Container>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>{i18n.t('noTransaction')}</Text>
      </View>
      // </Container>
    )
  } else {
    return (
      <Container>
        <View style={{ padding: 20, gap: 20 }}>
          {outgoingHistory.length !== 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={outgoingHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 8,
                      padding: 16,
                      margin: 16,
                    }}
                  >
                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#D8DD00',
                        }}
                      >
                        Receiver Id:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.receiver_account_id}
                        </Text>
                      </Text>
                    </View>

                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#D8DD00',
                        }}
                      >
                        Sender Id:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.predecessor_account_id}
                        </Text>
                      </Text>
                    </View>

                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#D8DD00',
                        }}
                      >
                        Deposit:{' '}
                        <Text style={{ color: 'white' }}>
                          {convertDeposit(item.item.actions_agg.deposit)}
                        </Text>
                      </Text>
                    </View>

                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#D8DD00',
                        }}
                      >
                        Transaction Fee:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.outcomes_agg.transaction_fee}
                        </Text>
                      </Text>
                    </View>

                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#D8DD00',
                        }}
                      >
                        Date :{' '}
                        <Text style={{ color: 'white' }}>
                          {getElapsedTime(item.item.block_timestamp)}
                        </Text>
                      </Text>
                    </View>
                  </View>
                )
              }}
            />
          )}
        </View>
      </Container>
    )
  }
}

export default TransactionHistoryOutgoing
