import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import Container from '../../subcomponents/container'
import { getNFTTransactionHistory } from '../subcomponents/api/nodeserver'
import { AppBar } from '../subcomponents/appbar/appbar'
import LoadingPage from '../subcomponents/loading/loadingPage'
import i18n from '../../locales/i18n'

const NFTTransactionHistory = ({ navigation }) => {
  const [nftTransactionHistory, setNftTransactionHistory] = useState([])
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    ; (async () => {
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
    const now = new Date().getTime()
    const timestamp = Math.floor(timestampWithMilliseconds / 1000000)
    const timeDifference = now - timestamp
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
        <AppBar title={i18n.t('nftTransactions')} back={navigation} />
        <View
          style={{ flex: 1, padding: 20, gap: 20, justifyContent: 'center' }}
        >
          <Text style={{ color: 'white', fontSize: 30 }}>{i18n.t('noTransaction')}</Text>
        </View>
      </Container>
    )
  } else {
    return (
      <Container>
        <AppBar title={i18n.t('nftTransactions')} back={navigation} />
        <View
          style={{ flex: 1, padding: 20, gap: 20, justifyContent: 'center' }}
        >
          {nftTransactionHistory.length !== 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={nftTransactionHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 8,
                      padding: 16,
                      margin: 16,
                      // elevation: 3,
                    }}
                  >
                    <View
                      style={{
                        paddingBottom: 16,
                      }}
                    >
                      <Text
                        style={{
                          color: '#D8DD00',
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
                          color: '#D8DD00',
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
                          color: '#D8DD00',
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
                          color: '#D8DD00',
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
                          color: '#D8DD00',
                        }}
                      >
                        Transaction Hash:{' '}
                        <Text style={{ color: 'white' }}>
                          {item.item.transaction_hash}
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

export default NFTTransactionHistory
