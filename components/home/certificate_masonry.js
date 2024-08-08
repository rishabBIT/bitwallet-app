import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import i18n from '../../locales/i18n'
import { getCertificates } from '../subcomponents/api/nodeserver'
import { PrimaryButton } from '../subcomponents/button/button'
import Icon from '../subcomponents/icon/icon'
import { Loading } from '../subcomponents/loading/loadingPage'
import { PrimaryText } from '../subcomponents/text/text'

const CertificateMasonry = ({ navigation }) => {
  const [certificates, setCertificates] = useState(null)
  const [isloading, setIsLoading] = useState(false)

  const poppulateCertificates = async () => {
    setIsLoading(true)
    const selectednetwork = await AsyncStorage.getItem('network')

    try {
      const networkType = JSON.parse(selectednetwork).networkType
      if (networkType == 'mainnet') {
        const certs = await getCertificates()

        if (certs.data.certificates.length > 0) {
          const failedCerts =
            JSON.parse(await AsyncStorage.getItem('failedCerts')) || []

          let filteredCertificates

          const failedCertIds = new Set(failedCerts.map((cert) => cert.id))
          filteredCertificates = certs.data.certificates[0].certificates.filter(
            (cert) => !failedCertIds.has(cert.id)
          )

          // console.log('====================================')
          // console.log('filteredCertificates')
          // console.log(filteredCertificates)
          // console.log('====================================')

          let certificates = []

          // let certificates = [
          //   {
          //     is_verified: true,
          //     name: 'Beyond Imagination Technologies',
          //     address:
          //       'M03 Laffa restaurant building, Sheikh Khalifa Bin Zayed St - Opp. Burjuman Mall,',
          //     description:
          //       'We ideate, develop, deploy and maintain blockchain technology solutions for start-ups, enterprises, and government',
          //     website: 'www.beimagine.tech',
          //     wallet: null,
          //     certificates: [
          //       {
          //         id: 15,
          //         image:
          //           'http://15.206.186.148/media/local_certificates/535495.png',
          //         cid: '535495.png',
          //         name: 'My Template',
          //         contract: '',
          //         height: 1810,
          //         width: 1080,
          //       },
          //       {
          //         id: 26,
          //         image:
          //           'http://15.206.186.148/media/local_certificates/36455.png',
          //         cid: '975136.png',
          //         name: 'My Template 1',
          //         contract: '',
          //         height: 540,
          //         width: 720,
          //       },
          //       {
          //         id: 27,
          //         image:
          //           'http://15.206.186.148/media/local_certificates/924612.png',
          //         cid: '924612.png',
          //         name: 'My Template',
          //         contract: '',
          //         height: 1440,
          //         width: 1080,
          //       },
          //       {
          //         id: 28,
          //         image:
          //           'http://15.206.186.148/media/local_certificates/36455.png',
          //         cid: '36455.png',
          //         name: 'My Template',
          //         contract: '',
          //         height: 720,
          //         width: 1280,
          //       },
          //       {
          //         id: 29,
          //         image:
          //           'http://15.206.186.148/media/local_certificates/91919.png',
          //         cid: '91919.png',
          //         name: 'My Template',
          //         contract: '',
          //         height: 810,
          //         width: 1080,
          //       },
          //       {
          //         id: 125,
          //         image:
          //           'http://15.206.186.148/media/local_certificates/995296.png',
          //         cid: '995296.png',
          //         name: 'My Template',
          //         contract: 'bitmemoir.testnet',
          //         height: 810,
          //         width: 1080,
          //       },
          //       {
          //         id: 134,
          //         image:
          //           'http://15.206.186.148/media/local_certificates/52052.png',
          //         cid: 'http://15.206.186.148/media/local_certificates/52052.png',
          //         name: 'My Template',
          //         contract: '',
          //         height: 810,
          //         width: 1080,
          //       },
          //       {
          //         id: 828,
          //         image:
          //           'http://15.206.186.148/media/local_certificates/129278.png',
          //         cid: 'http://15.206.186.148/media/local_certificates/129278.png',
          //         name: 'My Template',
          //         contract: 'contract_id',
          //         height: 1080,
          //         width: 810,
          //       },
          //     ],
          //   },
          // ]

          for (let i = 0; i < certs.data.certificates.length; i++) {
            certificates.push({
              address: certs.data.certificates[i].address,
              certificates: certs.data.certificates[i].certificates,
              description: certs.data.certificates[i].description,
              is_verified: certs.data.certificates[i].is_verified,
              name: certs.data.certificates[i].name,
              wallet: certs.data.certificates[i].wallet,
              website: certs.data.certificates[i].website,
            })
          }

          setCertificates(certificates)
          console.log('====================================')
          console.log('certificates')
          console.log(certificates[0].certificates.length)
          console.log('====================================')
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
      {!certificates && (
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
        // const data = certificates
        certificates.map((issuer, index) => {
          // console.log('====================================')
          // console.log(certificates.length)
          // console.log(issuer.certificates)
          // console.log(index)
          // console.log('====================================')
        })}

      {certificates &&
        // certificates.length > 0 &&
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

export default CertificateMasonry

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
              {issuer.name}
              {/* {issuer.name.substring(0, 23)} */}
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

const CertificateContainer = ({ issuer, navigation }) => {
  const length = issuer.certificates.length
  const itemPerColumn = Math.floor(length / 3)

  const columns = [[], [], []]

  for (let i = 0; i < issuer.certificates.length; i++) {
    const columnIndex = i % 3
    columns[columnIndex].push(issuer.certificates[i])
  }

  // console.log('====================================')
  // console.log(columns[0].length)
  // console.log(columns[1].length)
  // console.log(columns[2].length)
  // console.log('====================================')

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((columnIndex) => (
        <View key={columnIndex} style={styles.column}>
          {columns[columnIndex].map((certificate, index) => (
            <CertificateCard
              key={index}
              cert={certificate}
              navigation={navigation}
              issuer={issuer}
            />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    // paddingHorizontal: 10,
    marginTop: 20,
  },
  column: {
    flex: 1,
    // backgroundColor: 'red',
    marginHorizontal: 5,
    // padding: 10,
    // height: 100,
  },
})

const CertificateCard = ({ cert, navigation, issuer }) => {
  let aspectRatio = '1/1'
  if (cert.width && cert.height) {
    aspectRatio = `${cert.width}/${cert.height}`
  }
  const blurhash =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjE9071LFZzNxjKM0BdvHD4s4xMZGw7QVZQ&usqp=CAU'

  return (
    <View
      // colors={['#FFFFFF', '#F0A9FF', '#57A3D6']}
      // start={{ x: 0, y: 0 }}
      // end={{ x: 0, y: 1 }}
      style={{
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // paddingHorizontal: 10,
        backgroundColor: 'white',
        paddingBottom: 20,
        borderRadius: 5,
        marginVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{
          // width: 112,
          // minHeight: 112,
          aspectRatio: aspectRatio,
          // backgroundColor: '#393644',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          borderColor: 'black',
          // borderBottomWidth: 1,
        }}
        onPress={() =>
          navigation.navigate('Certificate', {
            certData: cert,
            issuerData: issuer,
            aspectRatio: aspectRatio,
          })
        }
      >
        <Image
          style={{
            minWidth: '100%',
            // minHeight: ,
            aspectRatio: aspectRatio,
            // backgroundColor: '#393644',
            borderRadius: 5,
            flex: 1,
          }}
          source={cert.image ? cert.image : blurhash}
          contentFit='fill'
          transition={1000}
        />
        <View style={{ padding: 5, borderColor: 'black' }}>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              textAlign: 'center',
            }}
          >
            {cert.name}
            {/* {cert.name.length > 15 && '...'} */}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
