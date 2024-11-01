import React from 'react'
import { FlatList, Text, View } from 'react-native'

const TransactionList = ({ transactions, convertDeposit, getElapsedTime }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={transactions}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
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
              Receiver Id:{' '}
              <Text style={{ color: 'white' }}>{item.receiver_account_id}</Text>
            </Text>
          </View>
          <View style={{ paddingBottom: 16 }}>
            <Text style={{ color: '#D8DD00' }}>
              Sender Id:{' '}
              <Text style={{ color: 'white' }}>
                {item.predecessor_account_id}
              </Text>
            </Text>
          </View>
          <View style={{ paddingBottom: 16 }}>
            <Text style={{ color: '#D8DD00' }}>
              Deposit:{' '}
              <Text style={{ color: 'white' }}>
                {convertDeposit(item.actions_agg.deposit)}
              </Text>
            </Text>
          </View>
          <View style={{ paddingBottom: 16 }}>
            <Text style={{ color: '#D8DD00' }}>
              Transaction Fee:{' '}
              <Text style={{ color: 'white' }}>
                {item.outcomes_agg.transaction_fee}
              </Text>
            </Text>
          </View>
          <View style={{ paddingBottom: 16 }}>
            <Text style={{ color: '#D8DD00' }}>
              Date:{' '}
              <Text style={{ color: 'white' }}>
                {getElapsedTime(item.block_timestamp)}
              </Text>
            </Text>
          </View>
        </View>
      )}
    />
  )
}

export default TransactionList
