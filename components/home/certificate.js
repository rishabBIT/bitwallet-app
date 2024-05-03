import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native'
import i18n from '../../locales/i18n'
import { getCertificates } from '../subcomponents/api/nodeserver'
import { PrimaryButton } from '../subcomponents/button/button'
import Icon from '../subcomponents/icon/icon'
import { Loading } from '../subcomponents/loading/loadingPage'
import { PrimaryText, SecondaryText } from '../subcomponents/text/text'

const Certificate = ({ navigation }) => {
  const [certificates, setCertificates] = useState(null)
  const [isloading, setIsLoading] = useState(false)

  const poppulateCertificates = async () => {
    setIsLoading(true)
    const selectednetwork = await AsyncStorage.getItem('network')

    try {
      const networkType = JSON.parse(selectednetwork).networkType
      if (networkType == 'mainnet') {
        const certs = await getCertificates()

        console.log('====================================')
        console.log('certs')
        console.log(certs)
        console.log('====================================')

        if (certs.data.certificates.length > 0) {
          const failedCerts =
            JSON.parse(await AsyncStorage.getItem('failedCerts')) || []

          let filteredCertificates

          const failedCertIds = new Set(failedCerts.map((cert) => cert.id))
          filteredCertificates = certs.data.certificates[0].certificates.filter(
            (cert) => !failedCertIds.has(cert.id)
          )

          let certificates = [
            {
              address: certs.data.certificates[0].address,
              certificates: filteredCertificates,
              description: certs.data.certificates[0].description,
              is_verified: certs.data.certificates[0].is_verified,
              name: certs.data.certificates[0].name,
              wallet: certs.data.certificates[0].wallet,
              website: certs.data.certificates[0].website,
            },
          ]

          setCertificates(certificates)
          // setCertificates(certs.data.certificates)
          setIsLoading(false)
        } else {
          setIsLoading(false)
          setCertificates(null)
        }
      } else {
        setIsLoading(false)
        setCertificates(null)
      }
    } catch (e) {
      setIsLoading(false)
      console.log(e)
    }
  }

  //  [
  //    {
  //      address: 'Haridwar, Uttarakhand',
  //      certificates: [
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //        [Object],
  //      ],
  //      description:
  //        'Fully decentralised bridge to swap tokens between two chains.',
  //      is_verified: true,
  //      name: 'Bit Testing Team',
  //      wallet:
  //        '674d895a861c548d4777a124603963017e0824edf768e70c9ab28609f090c058',
  //      website: 'https://bitmemoir.com/kyc',
  //    },
  //  ]

  useEffect(() => {
    poppulateCertificates()
  }, [])

  if (isloading)
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          width: Dimensions.get('window').width,
        }}
      >
        <Loading />
      </View>
    )

  return (
    <ScrollView style={{ flex: 1, gap: 20, marginVertical: 20 }}>
      {/* <PrimaryAccentText>{i18n.t('certificates')}</PrimaryAccentText> */}
      {/* {isloading && (
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width,
          }}
        >
          <Loading />
        </View>
      )} */}
      {!certificates && (
        <View style={{ padding: 20, flex: 1, gap: 20 }}>
          <PrimaryText>{i18n.t('certificateTextOne')}</PrimaryText>
          <PrimaryText>{i18n.t('certificateTextTwo')}</PrimaryText>
          <View style={{ paddingTop: 80 }}>
            <PrimaryButton
              title='Receive Certificates'
              endIcon={'receive'}
              // onPress={() => AsyncStorage.clear()}
              onPress={() => navigation.navigate('AccountdetailsOne')}
            />
          </View>
        </View>
      )}

      {certificates && certificates.length === 0 && (
        <View style={{ padding: 20, flex: 1, gap: 20 }}>
          <PrimaryText>{i18n.t('certificateTextOne')}</PrimaryText>
          <PrimaryText>{i18n.t('certificateTextTwo')}</PrimaryText>
          <View style={{ paddingTop: 80 }}>
            <PrimaryButton
              title={i18n.t('receiveCertificates')}
              endIcon={'receive'}
              // onPress={() => AsyncStorage.clear()}
              onPress={() => navigation.navigate('AccountdetailsOne')}
            />
          </View>
        </View>
      )}
      {certificates &&
        certificates.length > 0 &&
        certificates.map((issuer, index) => (
          <CertificateTile
            issuer={issuer}
            key={issuer.name + index}
            navigation={navigation}
          />
        ))}
    </ScrollView>
  )
}

export default Certificate

const CertificateTile = ({ issuer, navigation }) => {
  const { width } = Dimensions.get('window')
  const [expanded, setExpanded] = useState(false)
  return (
    <View
      // colors={['#71BBFF', '#E26CFF']}
      // start={[0, 0]}
      // end={[1, 0]}
      style={{
        width: width,
        borderRadius: 20,
        overflow: 'hidden', // Necessary for borderRadius to work in LinearGradient
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
              {issuer.name.substring(0, 23)}
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

    // <View>
    //   <TouchableOpacity
    //     onPress={() => setExpanded(!expanded)}
    //     style={{
    //       flexDirection: 'row',
    //       justifyContent: 'space-between',
    //       alignItems: 'center',
    //       padding: 10,
    //       backgroundColor: '#393644',
    //     }}
    //   >
    //     <View
    //       style={{
    //         padding: 10,
    //         flexDirection: 'row',
    //         gap: 10,
    //         flexWrap: 'wrap',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         maxWidth: 800,
    //       }}
    //     >
    //       {/* <View
    //       style={{
    //         flexDirection: 'row',
    //         // justifyContent: 'space-between',
    //         gap: 10,
    //       }} */}
    //       {/* > */}
    //       <PrimaryText>
    //         {issuer.name.substring(0, 23)}
    //         {issuer.name.length > 23 && '...'}
    //       </PrimaryText>
    //       {issuer.is_verified && (
    //         <Icon icon='verified' width={20} height={20} />
    //       )}
    //     </View>
    //     <PrimaryText>{expanded ? '-' : '+'}</PrimaryText>
    //   </TouchableOpacity>
    //   {expanded && (
    //     <CertificateContainer issuer={issuer} navigation={navigation} />
    //   )}
    // </View>
  )
}

const CertificateContainer = ({ issuer, navigation }) => {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {issuer.certificates.map((cert, index) => (
        <CertificateCard
          cert={cert}
          key={cert.cid + index}
          navigation={navigation}
          issuer={issuer}
        />
      ))}
    </View>
  )
}

const CertificateCard = ({ cert, navigation, issuer }) => {
  const blurhash =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjE9071LFZzNxjKM0BdvHD4s4xMZGw7QVZQ&usqp=CAU'

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F0A9FF', '#57A3D6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // paddingHorizontal: 10,
        // paddingVertical: 20,
        borderRadius: 10,
      }}
    >
      <TouchableOpacity
        style={{
          width: 112,
          height: 115,
          // backgroundColor: '#393644',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() =>
          navigation.navigate('Certificate', {
            certData: cert,
            issuerData: issuer,
          })
        }
      >
        <Image
          style={{
            width: 90,
            height: 67,
            backgroundColor: '#393644',
            borderRadius: 5,
          }}
          source={cert.image ? cert.image : blurhash}
          contentFit='cover'
          transition={1000}
        />
        <View style={{ padding: 5 }}>
          <SecondaryText color={'#000000'}>
            {cert.name.substring(0, 15)}
            {cert.name.length > 15 && '...'}
          </SecondaryText>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  )
}
