import React from 'react'
import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Icon from '../subcomponents/icon/icon'
import TransactionHistoryIncoming from '../transaction_history/transaction_history_incoming'
import TransactionHistoryOutgoing from '../transaction_history/transaction_history_outgoing'

const initialLayout = { width: Dimensions.get('window').width }

const TabViewExample = ({ navigation }) => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'sent', title: 'Sent' },
    { key: 'received', title: 'Received' },
  ])

  const renderScene = SceneMap({
    sent: TransactionHistoryOutgoing,
    received: TransactionHistoryIncoming,
  })

  const initialLayout = { width: 0, height: 0 }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/new/Background.png')}
        style={styles.backgroundImage}
      >
        <Container>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={{ position: 'absolute', left: 16 }}
                onPress={() => navigation.goBack()}
              >
                {/* <LinkButton title='< Back' onPress={() => navigation.pop()} /> */}
                <Icon icon={'back'} width={50} height={50} />
              </TouchableOpacity>
            </View>
            <View style={styles.tabViewContainer}>
              <TabView
                navigationState={{ index, routes }}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    renderLabel={({ route, color }) => (
                      <Text style={styles.tabBarText}>{route.title}</Text>
                    )}
                    style={styles.tabBar}
                  />
                )}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={styles.tabView}
              />
            </View>
          </View>
        </Container>
      </ImageBackground>
    </SafeAreaView>
  )
}

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 25 : 45,
    left: 10,
    zIndex: 1,
  },
  tabViewContainer: {
    flex: 1,
    marginTop: 50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabBarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabView: {
    flex: 1,
  },
})

export default TabViewExample
