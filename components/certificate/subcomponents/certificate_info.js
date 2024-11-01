import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import i18n from '../../../locales/i18n'
import Icon from '../../../subcomponents/icon/icon'
import { ErrorText, PrimaryText } from '../../../subcomponents/text/text'

const CertificateInfo = ({ certData, issuerData }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: 14,
          borderRadius: 20,
          borderColor: '#FFFFFF',
          borderWidth: 0.3,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>
          Certificate ID:{' '}
          <Text style={{ color: 'white', fontWeight: 'normal' }}>
            {certData.id}
          </Text>
        </Text>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>
          CID:{' '}
          <Text style={{ color: 'white', fontWeight: 'normal' }}>
            {certData.cid}
          </Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: 14,
          borderRadius: 20,
          borderWidth: 0.3,
          borderColor: '#FFFFFF',
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>
          Issued By:
        </Text>
        <PrimaryText align={'left'} fontWeight={'bold'}>
          {issuerData.name}
        </PrimaryText>
        <PrimaryText align={'left'}>{issuerData.address}</PrimaryText>
        <PrimaryText align={'left'}>{issuerData.website}</PrimaryText>
        <PrimaryText align={'left'}>{issuerData.wallet}</PrimaryText>
      </View>
    </>
  )
}

const VerificationStatus = ({ isVerified, isMenu, toggleMenu }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingBottom: 160,
      }}
    >
      {isVerified ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#00FF00', fontSize: 24 }}>
            {i18n.t('verified')}
          </Text>
          <Icon icon='verified' width={20} height={20} />
        </View>
      ) : (
        <ErrorText fontSize={24}>{i18n.t('notVerified')}</ErrorText>
      )}

      <TouchableOpacity onPress={() => toggleMenu()}>
        {isMenu === false ? (
          <Icon height={30} width={30} icon='menu' />
        ) : (
          <Image
            source={require('../../../assets/close.png')}
            style={{ height: 30, width: 30 }}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

export { CertificateInfo, VerificationStatus }
