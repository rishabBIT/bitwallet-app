import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Button, Dimensions, FlatList, Text, View } from 'react-native'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import { getTransactionHistory } from '../subcomponents/api/nodeserver'
import { Loading } from '../subcomponents/loading/loadingPage'

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
        console.log(res.data.txns)

        const incoming = []

        for (const txn of res.data.txns) {
          // console.log('====================================')
          // console.log(txn.receiver_account_id)
          // console.log(txn.predecessor_account_id)
          // console.log('====================================')
          if (
            // txn.receiver_account_id ===  &&
            txn.predecessor_account_id !== publicKey.toString().trim()
          ) {
            // console.log('====================================')
            // console.log('IF STATEMENT')
            // console.log('====================================')
            incoming.push(txn)
          } else {
            console.log(txn.receiver_account_id)
            console.log(publicKey.toString().trim())
            console.log(txn.predecessor_account_id)
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
          }}
        >
          <Text style={{ color: 'white', fontSize: 30 }}>
            {i18n.t('noTransaction')}
          </Text>
          <Button
            title={'Click'}
            onPress={() => {
              console.log(incomingHistory)
            }}
          />
        </View>
      </Container>
    )
  } else {
    return (
      <Container>
        <View style={{ padding: 20, gap: 20 }}>
          {/* <View style={{ width: 80 }}>
          <LinkButton title='< Back' onPress={() => navigation.pop()} />
        </View> */}
          {incomingHistory.length !== 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={incomingHistory}
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

export default TransactionHistoryIncoming
