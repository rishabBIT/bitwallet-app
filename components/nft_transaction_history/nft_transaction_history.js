import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { getNFTTransactionHistory } from '../../api/nodeserver'
import i18n from '../../locales/i18n'
import { AppBar } from '../../subcomponents/appbar/appbar'
import Container from '../../subcomponents/container'
import LoadingPage from '../../subcomponents/loading/loadingPage'
import EmptyState from './components/empty_state'
import TransactionItem from './components/transaction_item'

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
    return <EmptyState navigation={navigation} />
  } else {
    return (
      <Container>
        <AppBar
          title={i18n.t('nftTransactions')}
          back={() => navigation.navigate('Home')}
        />
        <View
          style={{ flex: 1, padding: 20, gap: 20, justifyContent: 'center' }}
        >
          {nftTransactionHistory.length !== 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={nftTransactionHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TransactionItem
                  transaction={item}
                  getElapsedTime={getElapsedTime}
                />
              )}
            />
          )}
        </View>
      </Container>
    )
  }
}

export default NFTTransactionHistory
