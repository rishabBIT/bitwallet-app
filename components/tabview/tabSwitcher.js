import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import Icon from '../subcomponents/icon/icon'
import TransactionHistoryIncoming from '../transaction_history/transaction_history_incoming'
import TransactionHistoryOutgoing from '../transaction_history/transaction_history_outgoing'

// const Tab1 = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Tab 1 Content</Text>
//     </View>
//   )
// }

// const Tab2 = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Tab 2 Content</Text>
//     </View>
//   )
// }

const TabSwitcher = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    // <View style={{ flex: 1, backgroundColor: 'transparent' }}>
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/new/Background.png')}
        style={styles.backgroundImage}
      >
        <Container>
          <View style={styles.container}>
            <View style={styles.header}>
              <StatusBar style='light' />
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 0,
                  right: 0,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  zIndex: 2,
                }}
              >
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Icon icon={'back'} width={25} height={25} />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingTop: 5,
                    justifyContent: 'center',
                  }}
                >
                  {i18n.t('transactionHistory')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 90,
                backgroundColor: 'transparent',
                justifyContent: 'space-evenly',
              }}
            >
              <TouchableOpacity
                onPress={() => setActiveTab(1)}
                style={{ padding: 10 }}
              >
                <Text
                  style={{
                    fontWeight: activeTab === 1 ? 'bold' : 'normal',
                    color: activeTab === 1 ? '#D8DD00' : 'white',
                    fontSize: 20,
                  }}
                >
                  Sent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab(2)}
                style={{ padding: 10 }}
              >
                <Text
                  style={{
                    fontWeight: activeTab === 2 ? 'bold' : 'normal',
                    color: activeTab === 2 ? '#D8DD00' : 'white',
                    fontSize: 20,
                  }}
                >
                  Received
                </Text>
              </TouchableOpacity>
            </View>
            {activeTab === 1 ? (
              <TransactionHistoryIncoming />
            ) : (
              <TransactionHistoryOutgoing />
            )}
          </View>
        </Container>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    zIndex: 1,
  },
  tabViewContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabBarText: {
    color: '#D8DD00',
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

export default TabSwitcher
