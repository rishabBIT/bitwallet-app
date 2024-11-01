import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import Icon from '../../../../subcomponents/icon/icon'
import { PrimaryText } from '../../../../subcomponents/text/text'
import { CertificateContainer } from './certificate_container'

export const CertificateTile = ({ issuer, navigation }) => {
  const { width } = Dimensions.get('window')
  const [expanded, setExpanded] = useState(false)
  return (
    <View
      style={{
        width: width,
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'transparent',
          borderRadius: 20,
        }}
      >
        <LinearGradient
          colors={['#71BBFF', '#E26CFF']}
          start={[0, 0]}
          end={[1, 0]}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <PrimaryText fontColor={'#000000'} fontSize={16}>
              {issuer.name}
              {issuer.name.length > 23 && '...'}
            </PrimaryText>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              {issuer.is_verified && (
                <Icon icon='verified' width={20} height={20} />
              )}
              <PrimaryText>{expanded ? '-' : '+'}</PrimaryText>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {expanded && (
        <CertificateContainer issuer={issuer} navigation={navigation} />
      )}
    </View>
  )
}
