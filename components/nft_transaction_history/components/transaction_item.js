import React from 'react'
import { Text, View } from 'react-native'

const TransactionItem = ({ transaction, getElapsedTime }) => {
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
        <Text style={{ color: '#D8DD00' }}>
          Name: <Text style={{ color: 'white' }}>{transaction.nft.name}</Text>
        </Text>
      </View>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{ color: '#D8DD00' }}>
          Contract:{' '}
          <Text style={{ color: 'white' }}>{transaction.nft.contract}</Text>
        </Text>
      </View>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{ color: '#D8DD00' }}>
          Event Kind:{' '}
          <Text style={{ color: 'white' }}>{transaction.cause}</Text>
        </Text>
      </View>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{ color: '#D8DD00' }}>
          Transaction Hash:{' '}
          <Text style={{ color: 'white' }}>{transaction.transaction_hash}</Text>
        </Text>
      </View>
      <View style={{ paddingBottom: 16 }}>
        <Text style={{ color: '#D8DD00' }}>
          Date:{' '}
          <Text style={{ color: 'white' }}>
            {getElapsedTime(transaction.block_timestamp)}
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default TransactionItem
