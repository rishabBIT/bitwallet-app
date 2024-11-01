import React, { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import { useState } from 'react'
import { Dimensions, Linking, ToastAndroid, View } from 'react-native'
import i18n from '../../locales/i18n'
import { AppBar } from '../../subcomponents/appbar/appbar'
import Container from '../../subcomponents/container'
import LoadingPage from '../../subcomponents/loading/loadingPage'
import {
  CertificateInfo,
  VerificationStatus,
} from './subcomponents/certificate_info'
import MenuOptions from './subcomponents/menu'
import { ModalSheetReceipientId } from './subcomponents/receipient_id_modal_sheet'

const { width } = Dimensions.get('window')

const Certificate = ({ navigation, props }) => {
  const { certData, issuerData, aspectRatio } = props
  const [isSharingAvailable, setIsSharingAvailable] = useState(false)
  const [isReceipientModalVisible, setReceipientModalVisible] = useState(false)

  const [isMenu, setIsMenu] = useState(false)
  const [contractIdValue, setContractIdValue] = useState('')
  const [receipientInputValue, setReceipientInputValue] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const toggleReceipientModalVisibility = () => {
    setReceipientModalVisible(!isReceipientModalVisible)
  }

  useEffect(() => {
    Sharing.isAvailableAsync().then((available) => {
      if (available) {
        setIsSharingAvailable(true)
      } else {
        setIsSharingAvailable(false)
      }
    })
  }, [])

  async function downloadImage(uri) {
    try {
      const downloadedFile = await FileSystem.downloadAsync(
        uri,
        FileSystem.documentDirectory + 'certificate.png'
      )

      const permission = await MediaLibrary.requestPermissionsAsync()
      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri)
      const album = await MediaLibrary.getAlbumAsync('Certificates')
      alert('Image is saved in your photo gallery.')
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Certificates', asset, false)
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
      }
    } catch (e) {
      Linking.openURL(uri)
    }
  }

  async function shareImage(uri) {
    const downloadedFile = await FileSystem.downloadAsync(
      uri,
      FileSystem.documentDirectory + 'certificate.png'
    )

    Sharing.shareAsync(downloadedFile.uri)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(JSON.stringify(err))
      })
  }

  const toggleMenu = () => {
    setIsMenu(!isMenu)
  }

  const transferCertificate = async () => {
    setIsLoading(true)
    const res = await transferCertificate(receipientInputValue, certData.id)

    if (res === undefined) {
      const failedCerts =
        JSON.parse(await AsyncStorage.getItem('failedCerts')) || []

      certData.receipientInputValue = receipientInputValue

      failedCerts.push(certData)

      await AsyncStorage.setItem('failedCerts', JSON.stringify(failedCerts))

      ToastAndroid.show('Certificate transfer failed', ToastAndroid.SHORT)
      setIsLoading(false)
    } else if (res.status == 'success') {
      ToastAndroid.show('Certificate transfered', ToastAndroid.SHORT)
      setIsLoading(false)
      // navigation.navigate('Home')
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  const blurhash =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjE9071LFZzNxjKM0BdvHD4s4xMZGw7QVZQ&usqp=CAU'

  return (
    <Container>
      <AppBar
        title={i18n.t('certificates')}
        back={() => navigation.navigate('Home')}
      />
      <View
        style={{
          flex: 1,
          padding: 20,
          gap: 20,
          width: width,
          zIndex: 1,
          position: 'relative',
        }}
      >
        <MenuOptions
          onShare={() => shareImage(certData.image)}
          onTransfer={toggleReceipientModalVisibility}
          onDownload={() => downloadImage(certData.image)}
          onDelete={() => console.log('Delete clicked')}
          isMenu={isMenu}
        />

        <VerificationStatus
          isVerified={issuerData.is_verified}
          isMenu={isMenu}
          toggleMenu={toggleMenu}
        />

        <Image
          style={{
            flex: 1,
            width: '100%',
            borderRadius: 10,
            aspectRatio: aspectRatio,
            alignSelf: 'center',
          }}
          source={certData.image ? certData.image : blurhash}
          contentFit='fill'
          transition={1000}
        />
        <CertificateInfo certData={certData} issuerData={issuerData} />

        {isReceipientModalVisible && (
          <ModalSheetReceipientId
            isReceipientModalVisible={isReceipientModalVisible}
            toggleModalVisibility={toggleReceipientModalVisibility}
            setInputValue={setReceipientInputValue}
            inputValue={receipientInputValue}
            transferCertificate={async () => {
              await transferCertificate()
            }}
          />
        )}
      </View>
    </Container>
  )
}
const styles = {
  text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
  },
}

export default Certificate
