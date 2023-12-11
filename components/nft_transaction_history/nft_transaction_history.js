import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { getNFTTransactionHistory } from '../subcomponents/api/nodeserver'
import { LinkButton } from '../subcomponents/button/button'
import Container from '../subcomponents/container/container'
import LoadingPage from '../subcomponents/loading/loadingPage'

const NFTTransactionHistory = ({ navigation }) => {
  const [nftTransactionHistory, setNftTransactionHistory] = useState([])
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsloading(true)
      const publicKey = await AsyncStorage.getItem('publicKey')
      res = await getNFTTransactionHistory(publicKey.toString().trim())
      const incoming = []

      for (const txn of res.data.txns) {
        incoming.push(txn)
      }

      setNftTransactionHistory(incoming)

      setIsloading(false)
    })()
  }, [])

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
  if (nftTransactionHistory.length === 0) {
    return (
      <Container>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 30 }}>No transactions</Text>
        </View>
      </Container>
    )
  } else {
    return (
      <Container>
        <View style={{ padding: 20, gap: 20, marginBottom: 30 }}>
          <View style={{ width: 80 }}>
            <LinkButton title='< Back' onPress={() => navigation.pop()} />
          </View>
          {nftTransactionHistory.length !== 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={nftTransactionHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#393644',
                      borderRadius: 8,
                      padding: 16,
                      margin: 16,
                      elevation: 3,
                    }}
                  >
                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#3498DB',
                        }}
                      >
                        Name:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.nft.name}
                        </Text>
                      </Text>
                    </View>
                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#3498DB',
                        }}
                      >
                        Contract :{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.nft.contract}
                        </Text>
                      </Text>
                    </View>
                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#3498DB',
                        }}
                      >
                        Receiver Id:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.token_new_owner_account_id}
                        </Text>
                      </Text>
                    </View>
                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#3498DB',
                        }}
                      >
                        Event Kind:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.event_kind}
                        </Text>
                      </Text>
                    </View>

                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#3498DB',
                        }}
                      >
                        Transaction Hash:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.transaction_hash}
                        </Text>
                      </Text>
                    </View>

                    {/* <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#3498DB',
                        }}
                      >
                        Transaction Fee:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.outcomes_agg.transaction_fee}
                        </Text>
                      </Text>
                    </View> */}
                    <View style={{ paddingBottom: 16 }}>
                      <Text
                        style={{
                          color: '#3498DB',
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

export default NFTTransactionHistory