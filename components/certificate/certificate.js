import React, { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import { useState } from 'react'
import {
  Button,
  Dimensions,
  Linking,
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import { transferCertificate } from '../subcomponents/api/nodeserver'
import { AppBar } from '../subcomponents/appbar/appbar'
import Icon from '../subcomponents/icon/icon'
import LoadingPage from '../subcomponents/loading/loadingPage'
import { ErrorText, PrimaryText } from '../subcomponents/text/text'

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
        <View
          style={{
            height: isMenu ? 180 : 0,
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            right: 0,
            top: 82,
            zIndex: 9999,
            alignItems: 'center',
            marginRight: 20,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => shareImage(certData.image)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>{i18n.t('share')}</Text>
              {isMenu && (
                <Icon icon={'share'} fill={'#000000'} height={20} width={18} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleReceipientModalVisibility()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>{i18n.t('transfer')}</Text>
              {isMenu && (
                <Icon
                  icon={'transfer_black'}
                  fill={'#000000'}
                  height={20}
                  width={18}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => downloadImage(certData.image)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>{i18n.t('download')}</Text>
              {isMenu && (
                <Icon
                  icon={'download_one'}
                  fill={'#000000'}
                  height={20}
                  width={18}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Third option clicked')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontSize: 16,
                  color: 'red',
                }}
              >
                {i18n.t('delete')}
              </Text>
              {isMenu && (
                <Icon icon={'bin'} fill={'red'} height={20} width={18} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        {/* <PrimaryAccentText>{certData?.name}</PrimaryAccentText> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // paddingBottom: 160,
          }}
        >
          {issuerData.is_verified ? (
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
                source={require('../../assets/close.png')}
                style={{ height: 30, width: 30 }}
              />
            )}
          </TouchableOpacity>
        </View>

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
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: 14,
            borderRadius: 20,
            borderColor: '#FFFFFF',
            borderWidth: 0.3,
          }}
        >
          <View style={{ paddingBottom: 6 }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Certificate ID:{' '}
              <Text style={{ color: 'white', fontWeight: 'normal' }}>
                {certData.id}
              </Text>
            </Text>
          </View>

          <View style={{ paddingBottom: 6 }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              CID:{' '}
              <Text style={{ color: 'white', fontWeight: 'normal' }}>
                {certData.cid}
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: 14,
            borderRadius: 20,
            borderColor: '#FFFFFF',
            borderWidth: 0.3,
          }}
        >
          <View style={{ paddingBottom: 6 }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Issued By:{' '}
            </Text>
          </View>

          <PrimaryText align={'left'} fontWeight={'bold'}>
            {issuerData.name}
          </PrimaryText>
          <PrimaryText align={'left'}>{issuerData.address}</PrimaryText>
          <PrimaryText align={'left'}>{issuerData.website}</PrimaryText>
          <PrimaryText align={'left'}>{issuerData.wallet}</PrimaryText>
        </View>

        {isReceipientModalVisible && (
          <ModalSheetReceipientId
            isReceipientModalVisible={isReceipientModalVisible}
            toggleModalVisibility={toggleReceipientModalVisibility}
            setInputValue={setReceipientInputValue}
            inputValue={receipientInputValue}
            transferCertificate={async () => {
              setIsLoading(true)
              const res = await transferCertificate(
                receipientInputValue,
                certData.id
              )

              if (res === undefined) {
                const failedCerts =
                  JSON.parse(await AsyncStorage.getItem('failedCerts')) || []

                certData.receipientInputValue = receipientInputValue

                failedCerts.push(certData)

                // console.log('====================================')
                // console.log(failedCerts)
                // console.log('====================================')

                await AsyncStorage.setItem(
                  'failedCerts',
                  JSON.stringify(failedCerts)
                )

                ToastAndroid.show(
                  'Certificate transfer failed',
                  ToastAndroid.SHORT
                )
                setIsLoading(false)
              } else if (res.status == 'success') {
                ToastAndroid.show('Certificate transfered', ToastAndroid.SHORT)
                setIsLoading(false)
                // navigation.navigate('Home')
              }
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

const ModalSheetReceipientId = ({
  isModalVisible,
  toggleModalVisibility,
  setInputValue,
  inputValue,
  transferCertificate,
}) => {
  return (
    <SafeAreaView>
      <Modal
        animationType='slide'
        transparent
        visible={isModalVisible}
        presentationStyle='overFullScreen'
        onDismiss={toggleModalVisibility}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              elevation: 5,
              transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
              height: 180,
              width: width * 0.8,
              backgroundColor: '#fff',
              borderRadius: 7,
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1,
              }}
              onPress={toggleModalVisibility}
            >
              <Image
                source={require('../../assets/close.png')}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>

            <TextInput
              placeholder='Enter receipient id'
              value={inputValue}
              inputMode='numeric'
              style={{
                width: '80%',
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={(value) => setInputValue(value)}
            />

            <Button
              title='Submit'
              onPress={async () => {
                if (inputValue.length !== 0) {
                  toggleModalVisibility()
                  transferCertificate()
                } else {
                  ToastAndroid.show(
                    'Receipient Id cannot be empty',
                    ToastAndroid.SHORT
                  )
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Certificate
