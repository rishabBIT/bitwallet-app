import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import i18n from '../../locales/i18n'
import { PrimaryAccentText } from '../../subcomponents/text/text'
import FailedCertificate from '../home/failedCertificates'
import CertificateMasonry from '../home/masonry_certificate/certificate_masonry'

const TabSwitcherCertificates = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    // <View style={{ flex: 1, backgroundColor: 'transparent' }}>
    <ImageBackground
      source={require('../../assets/new/Background.png')}
      style={styles.backgroundImage}
    >
      <PrimaryAccentText>{i18n.t('certificates')}</PrimaryAccentText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          paddingHorizontal: 20,
          backgroundColor: 'transparent',
          justifyContent: 'space-evenly',
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          style={{
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'white',
          }}
        >
          <Text
            style={{
              fontWeight: activeTab === 1 ? 'bold' : 'normal',
              color: activeTab === 1 ? '#D8DD00' : 'white',
              fontSize: 20,
            }}
          >
            In wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(2)}
          style={{
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'white',
          }}
        >
          <Text
            style={{
              fontWeight: activeTab === 2 ? 'bold' : 'normal',
              color: activeTab === 2 ? '#D8DD00' : 'white',
              fontSize: 20,
            }}
          >
            Pending
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === 1 ? (
        <CertificateMasonry navigation={navigation} />
      ) : (
        <FailedCertificate navigation={navigation} />
      )}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
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

export default TabSwitcherCertificates
