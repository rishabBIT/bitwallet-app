import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native'
import { getCertificates } from '../subcomponents/api/nodeserver'
import { PrimaryButton } from '../subcomponents/button/button'
import Icon from '../subcomponents/icon/icon'
import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
} from '../subcomponents/text/text'

const Certificate = ({ navigation }) => {
  const [certificates, setCertificates] = useState(null)

  const poppulateCertificates = async () => {
    const selectednetwork = await AsyncStorage.getItem('network')
    const networkType = JSON.parse(selectednetwork).networkType
    // try {
    //   let certs = await AsyncStorage.getItem('certificates')
    //   setCertificates(JSON.parse(certs))
    // } catch {
    //   console.log('no certs in storage')
    // }
    try {
      if (networkType == 'mainnet') {
        const certs = await getCertificates()
        setCertificates(certs.data.certificates)
      } else {
      }
      // AsyncStorage.setItem(
      //   'certificates',
      //   JSON.stringify(certs.data.certificates)
      // )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    poppulateCertificates()
  }, [])

  return (
    <ScrollView style={{ flex: 1, gap: 20, marginVertical: 20 }}>
      <PrimaryAccentText>Certificates</PrimaryAccentText>
      {!certificates && (
        // <View
        //   style={{
        //     padding: 50,
        //   }}
        // >
        //   <Loading />
        // </View>
        <View style={{ padding: 20, flex: 1, gap: 20 }}>
          <PrimaryText>Your certificates will be shown here.</PrimaryText>
          <PrimaryText>
            Ask your university to send certificates to your wallet address
          </PrimaryText>
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
          <PrimaryText>Your certificates will be shown here.</PrimaryText>
          <PrimaryText>
            Ask your university to send certificates to your wallet address
          </PrimaryText>
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
