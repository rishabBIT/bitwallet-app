import { shareAsync } from 'expo'
import { useEffect, useState } from 'react'
import {
  Button,
  Dimensions,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
// import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { importTokens, transferNFT } from '../subcomponents/api/nodeserver'
import { PrimaryButton } from '../subcomponents/button/button'
import LoadingPage from '../subcomponents/loading/loadingPage'
import { PrimaryAccentText, PrimaryText } from '../subcomponents/text/text'

import { ScrollView } from 'react-native'
import Icon from '../subcomponents/icon/icon'

import * as FileSystem from 'expo-file-system'
import { LinearGradient } from 'expo-linear-gradient'
import * as MediaLibrary from 'expo-media-library'
import i18n from '../../locales/i18n'
// import { StorageAccessFramework } from 'expo-file-system'

// import notifee from '@notifee/react-native'

const { width } = Dimensions.get('window')

const Assets = ({ navigation }) => {
  const [tokens, setTokens] = useState([])
  const [isLoading, setIsloading] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false)
  const [isReceipientModalVisible, setReceipientModalVisible] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [contractIdValue, setContractIdValue] = useState('')
  const [receipientInputValue, setReceipientInputValue] = useState('')

  let tokenItem = {}

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible)
  }

  const toggleReceipientModalVisibility = () => {
    setReceipientModalVisible(!isReceipientModalVisible)
  }

  const transferTokens = async (tokenId, contractId, receipient) => {
    try {
      // const receipient =
      //   '674d895a861c548d4777a124603963017e0824edf768e70c9ab28609f090c058'

      setIsloading(true)
      const res = await transferNFT(tokenId, contractId, receipient)

      console.log('====================================')
      console.log('Transfer Tokens')
      console.log(res)
      console.log('====================================')

      const nftData = JSON.parse(await AsyncStorage.getItem('nfts')) || []

      const index = nftData.findIndex((item) => {
        console.log(item.token_id)
        item.token_id === String(tokenId)
      })
      console.log('====================================')
      // console.log(nftData)
      // console.log(tokenId)
      console.log('====================================')
      if (index !== -1) {
        nftData.splice(index, 1)

        await AsyncStorage.setItem('nfts', JSON.stringify(nftData))
        setTokens(nftData)
      }

      ToastAndroid.show('Token transfer successful', ToastAndroid.SHORT)
      console.log(res)
      setIsloading(false)
    } catch (error) {
      console.log(`Error transferNFT : ${error}`)
      setIsloading(false)
    }
  }

  const fetchTokens = async () => {
    setIsloading(true)
    const nftData = JSON.parse(await AsyncStorage.getItem('nfts')) || []

    const isExist = nftData.find((item) => item.token_id === inputValue)

    if (isExist) {
      ToastAndroid.show(
        'This NFT already exists in your wallet',
        ToastAndroid.SHORT
      )

      // const nft = await transferNFT(inputValue)
      console.log(nft)

      setIsloading(false)
    } else {
      const publicKey = await AsyncStorage.getItem('publicKey')
      const selectednetwork = await AsyncStorage.getItem('network')
      const networkType = JSON.parse(selectednetwork).networkType

      const res = await importTokens(inputValue, contractIdValue)
      console.log('UI')
      console.log(res)

      if (!res.data || !res.data.tokens) {
        setIsloading(false)
        ToastAndroid.show("NFT doesn't exist.", ToastAndroid.SHORT)
      } else if (res.data.tokens.owner_id === publicKey) {
        res.data.tokens.network = networkType
        res.data.tokens.contract_id = contractIdValue
        // res.data.tokens.contract_id = 'vickyx.testnet'
        nftData.push(res.data.tokens)

        await AsyncStorage.setItem('nfts', JSON.stringify(nftData))
        setTokens([...tokens, res.data.tokens])

        console.log('====================================')
        console.log(tokens.network)
        console.log('====================================')

        setIsloading(false)
      } else {
        setIsloading(false)
        // AsyncStorage.clear()
        ToastAndroid.show(
          "NFT doesn't belong to this account.",
          ToastAndroid.SHORT
        )
      }
    }
  }

  useEffect(() => {
    fetchTokensFromStorage()
  }, [])

  const fetchTokensFromStorage = async () => {
    const selectednetwork = await AsyncStorage.getItem('network')
    const networkType = JSON.parse(selectednetwork).networkType
    // setIsloading(true)
    // if (networkType == 'mainnet') {
    //   let nftData = []
    //   setTokens(JSON.parse(nftData))
    //   console.log(nftData)
    //   setIsloading(false)
    // } else {
    let nftData = (await AsyncStorage.getItem('nfts')) || []
    setTokens(JSON.parse(nftData))
    // console.log(nftData)
    setIsloading(false)
    // }
  }

  // download nft
  async function downloadNFTImage(url) {
    const filename = 'token.gif'
    const result = await FileSystem.downloadAsync(
      url.toString(),
      FileSystem.documentDirectory + filename
    )

    // Save the downloaded file
    saveFile(result.uri, filename, result.headers['content-type'])
  }

  async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === 'android') {
      const permissions = await MediaLibrary.requestPermissionsAsync(true)

      if (permissions.granted) {
        // onDisplayNotification()
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        })

        await MediaLibrary.saveToLibraryAsync(uri).then(() => {
          ToastAndroid.show('Download complete', ToastAndroid.SHORT)
        })
      } else {
        shareAsync(uri)
      }
    } else {
      shareAsync(uri)
    }
  }

  if (isLoading) return <LoadingPage />

  return (
    <ScrollView style={{ flex: 1, gap: 20, marginVertical: 20 }}>
      <PrimaryAccentText fontColor={'#FFFFFF'}>{i18n.t('tokens')}</PrimaryAccentText>

      {tokens.network === 'testnet' && (
        <View
          style={{
            padding: 50,
          }}
        >
          {/* <LoadingPage /> */}
          <PrimaryText>{i18n.t('tokensText')}</PrimaryText>
        </View>
      )}

      {tokens.length === 0 && (
        <View
          style={{
            padding: 50,
          }}
        >
          {/* <LoadingPage /> */}
          <PrimaryText>{i18n.t('tokensText')}</PrimaryText>
        </View>
      )}
      {tokens.length > 0 &&
        tokens.map(
          (item, index) => (
            (tokenItem = item),
            (
              <TokenTile
                key={index}
                token={item}
                // transferTokens={transferTokens}
                download={downloadNFTImage}
                toggleModalVisibility={toggleReceipientModalVisibility}
                // isModalVisible={isReceipientModalVisible}
                // receipientInputValue={receipientInputValue}
                // setReceipientInputValue={setReceipientInputValue}
                navigator={navigation}
              />
            )
          )
        )}
      <View style={{ padding: 50, flex: 1, gap: 20 }}>
        {isReceipientModalVisible && (
          <ModalSheetReceipientId
            isReceipientModalVisible={isReceipientModalVisible}
            toggleModalVisibility={toggleReceipientModalVisibility}
            setInputValue={setReceipientInputValue}
            inputValue={receipientInputValue}
            transferTokens={transferTokens}
            token={tokenItem}
          />
        )}
        <ModalSheetTokenId
          isModalVisible={isModalVisible}
          toggleModalVisibility={toggleModalVisibility}
          setInputValue={setInputValue}
          inputValue={inputValue}
          contractIdValue={contractIdValue}
          setContractIdValue={setContractIdValue}
          fetchTokens={fetchTokens}
        // token={token}
        />
        <PrimaryButton
          title={i18n.t('importTokens')}
          endIcon={'receive'}
          onPress={toggleModalVisibility}
        />
      </View>
    </ScrollView>
  )
}

const TokenTile = ({ token, download, toggleModalVisibility, navigator }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigator.navigate('TokenDetails', {
          tokenData: token,
          navigation: navigator,
        })
      }
    >
      <LinearGradient
        colors={['#71BBFF', '#E26CFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          // marginBottom: 10,
          marginTop: 10,
          backgroundColor: '#393644',
          width: width - 30,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            source={{ uri: token.metadata.media }}
          />
          <PrimaryText>
            {token.metadata.title.substring(0, 23)}
            {token.metadata.title.length > 23 && '...'}
          </PrimaryText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 16,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              //
              toggleModalVisibility()
            }}
          >
            <Icon icon={'send'} width={20} height={20} fill='#FFF' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await download(token.metadata.media)
            }}
          >
            <Icon icon={'download'} width={18} height={20} fill='#FFF' />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const ModalSheetTokenId = ({
  isModalVisible,
  toggleModalVisibility,
  setInputValue,
  inputValue,
  contractIdValue,
  setContractIdValue,
  fetchTokens,
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
              height: 230,
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
              placeholder='Enter Token Id'
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

            <TextInput
              placeholder='Enter Contract Id'
              value={contractIdValue}
              inputMode='text'
              style={{
                width: '80%',
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={(value) => setContractIdValue(value)}
            />

            <Button
              title='Submit'
              onPress={async () => {
                if (inputValue.length !== 0 && contractIdValue.length !== 0) {
                  toggleModalVisibility()
                  await fetchTokens()
                } else {
                  ToastAndroid.show(
                    'both fields are mandatory',
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

const ModalSheetReceipientId = ({
  isModalVisible,
  toggleModalVisibility,
  setInputValue,
  inputValue,
  transferTokens,
  token,
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
                  console.log('====================================')
                  console.log(token.token_id, token.contract_id, inputValue)
                  console.log('====================================')
                  await transferTokens(
                    token.token_id,
                    token.contract_id,
                    inputValue
                  )
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

export default Assets
