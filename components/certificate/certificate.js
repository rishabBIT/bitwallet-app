import { useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'

import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import { useRef, useState } from 'react'
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
import Container from '../../subcomponents/container'
import { transferCertificate } from '../subcomponents/api/nodeserver'
import { AppBar } from '../subcomponents/appbar/appbar'
import Icon from '../subcomponents/icon/icon'
import { ErrorText, PrimaryText } from '../subcomponents/text/text'

const { width } = Dimensions.get('window')

const Certificate = ({ navigation }) => {
  const route = useRoute()
  const { certData, issuerData } = route.params
  const [isSharingAvailable, setIsSharingAvailable] = useState(false)
  const [isReceipientModalVisible, setReceipientModalVisible] = useState(false)

  const [isMenu, setIsMenu] = useState(false)
  const [contractIdValue, setContractIdValue] = useState('')
  const [receipientInputValue, setReceipientInputValue] = useState('')

  let tokenItem = {}

  const toggleReceipientModalVisibility = () => {
    setReceipientModalVisible(!isReceipientModalVisible)
  }

  const menuRef = useRef(null)

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

  const blurhash =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjE9071LFZzNxjKM0BdvHD4s4xMZGw7QVZQ&usqp=CAU'

  return (
    <Container>
      <AppBar title={'Certificate'} back={navigation} />
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
              <Text style={styles.text}>Share</Text>
              {isMenu && (
                <Icon icon={'share'} fill={'#000000'} height={20} width={18} />
              )}
            </View>
          </TouchableOpacity>
          {/* <View
            style={{ height: 1, width: '100%', backgroundColor: '#CCCCCC' }}
          /> */}
          <TouchableOpacity onPress={() => toggleReceipientModalVisibility()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>Transfer</Text>
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
          {/* <View style={styles.separator} /> */}
          <TouchableOpacity onPress={() => downloadImage(certData.image)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>Download</Text>
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
                Delete
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
              <Text style={{ color: '#00FF00', fontSize: 24 }}>Verified</Text>
              <Icon icon='verified' width={20} height={20} />
            </View>
          ) : (
            <ErrorText fontSize={24}>Not Verified</ErrorText>
          )}

          {/* Popup Menu */}
          {/* <View style={{ zIndex: 9999, height: 100 }}> */}
          {/* <MenuProvider>
            <Menu
              ref={menuRef}
              // rendererProps={{ anchorStyle: { zIndex: 9999 } }}
            >
              <MenuTrigger
                customStyles={{
                  triggerOuterWrapper: {
                    // position: 'absolute',
                    // top: -50,
                    right: 20,
                  },
                }}
              >
                <Icon height={30} width={30} icon='menu' />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    position: 'absolute',
                    right: 20,
                    top: 60,
                    zIndex: 9999,
                  },
                }}
              >
                <MenuOption onSelect={() => alert('Option 1')}>
                  <Text>Option 1</Text>
                </MenuOption>
                <MenuOption onSelect={() => alert('Option 2')}>
                  <Text>Option 2</Text>
                </MenuOption>
                <MenuOption onSelect={() => alert('Option 3')}>
                  <Text>Option 3</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </MenuProvider> */}
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

        {/* <View>
            <SimpleMenu />
          </View> */}
        {/* <LinkButton
            title='Delete'
            endIcon={'delete'}
            // onPress={}
          /> */}

        <Image
          style={{
            flex: 1,
            // backgroundColor: '#393644',
            borderRadius: 10,
            // zIndex: -1,
          }}
          source={certData.image ? certData.image : blurhash}
          contentFit='contain'
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
        {/* <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <PrimaryButton
              title=''
              endIcon={'download'}
              onPress={() => downloadImage(certData.image)}
            />
          </View>
          {isSharingAvailable && (
            <View style={{ flex: 1 }}>
              <PrimaryButton
                title=''
                endIcon={'share'}
                onPress={() => shareImage(certData.image)}
              />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <PrimaryButton
              title=''
              endIcon={'send'}
              onPress={() => {
                console.log(certData.id)
                // transferCertificate()}
                toggleReceipientModalVisibility()
              }}
            />
          </View> */}
        {/* </View> */}
        {isReceipientModalVisible && (
          <ModalSheetReceipientId
            isReceipientModalVisible={isReceipientModalVisible}
            toggleModalVisibility={toggleReceipientModalVisibility}
            setInputValue={setReceipientInputValue}
            inputValue={receipientInputValue}
            transferCertificate={() => {
              console.log(certData)
              transferCertificate(receipientInputValue, certData.id)
              ToastAndroid.show('Certificate transfered', ToastAndroid.SHORT)
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
