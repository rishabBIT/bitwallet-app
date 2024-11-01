import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { getCertificates } from '../../../api/nodeserver'
import i18n from '../../../locales/i18n'
import { PrimaryButton } from '../../../subcomponents/button/button'
import { Loading } from '../../../subcomponents/loading/loadingPage'
import { PrimaryText } from '../../../subcomponents/text/text'
import { CertificateTile } from './subcomponents/certificate_tile'

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

          let certificates = []

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

      {certificates && certificates.map((issuer, index) => {})}

      {certificates &&
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
