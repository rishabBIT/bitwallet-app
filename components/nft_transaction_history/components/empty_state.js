import React from 'react'
import { Text, View } from 'react-native'
import i18n from '../../../locales/i18n'
import { AppBar } from '../../../subcomponents/appbar/appbar'
import Container from '../../../subcomponents/container'

const EmptyState = ({ navigation }) => {
  return (
    <Container>
      <AppBar
        title={i18n.t('nftTransactions')}
        back={() => navigation.navigate('Home')}
      />
      <View style={{ flex: 1, padding: 20, gap: 20, justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 30 }}>
          {i18n.t('noTransaction')}
        </Text>
      </View>
    </Container>
  )
}

export default EmptyState
