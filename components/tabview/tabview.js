import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { LinkButton } from '../subcomponents/button/button'
import Container from '../subcomponents/container/container'
import TransactionHistoryIncoming from '../transaction_history/transaction_history_incoming'
import TransactionHistoryOutgoing from '../transaction_history/transaction_history_outgoing'

const initialLayout = { width: Dimensions.get('window').width }

export default function TabViewExample({ navigation }) {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'sent', title: 'Sent' },
    { key: 'received', title: 'Received' },
  ])

  const renderScene = SceneMap({
    sent: TransactionHistoryOutgoing,
    received: TransactionHistoryIncoming,
  })

  return (
    <Container>
      <View style={{ padding: 10 }}>
        <View style={{ width: 80 }}>
          <LinkButton title='< Back' onPress={() => navigation.pop()} />
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={({ route, color }) => (
              <Text style={{ color: 'white', margin: 8 }}>{route.title}</Text>
            )}
            style={{ backgroundColor: '#393644' }}
          />
        )}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  scene: {
    flex: 1,
  },
})
