import { shareAsync } from 'expo'
import { useEffect, useState } from 'react'
import { Dimensions, Platform, ToastAndroid, View } from 'react-native'
// import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { importTokens, transferCertificate } from '../../../api/nodeserver'
import { PrimaryButton } from '../../../subcomponents/button/button'
import LoadingPage from '../../../subcomponents/loading/loadingPage'
import {
  PrimaryAccentText,
  PrimaryText,
} from '../../../subcomponents/text/text'

import { ScrollView } from 'react-native'

import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import i18n from '../../../locales/i18n'
import { ModalSheetReceipientId } from './subcomponents/modal_sheet_receipient_id'
import { ModalSheetTokenId } from './subcomponents/modal_sheet_token_id'
import { TokenTile } from './subcomponents/token_tile'

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
      setIsloading(true)
      const res = await transferCertificate(receipient, tokenId)

      if (res.status === 'success') {
        const nftData = JSON.parse(await AsyncStorage.getItem('nfts')) || []

        const index = nftData.findIndex(
          (item) => item.token_id === String(tokenId)
        )

        if (index !== -1) {
          nftData.splice(index, 1)

          await AsyncStorage.setItem('nfts', JSON.stringify(nftData))
          setTokens(nftData)
        }
        ToastAndroid.show('Token transfer successful', ToastAndroid.SHORT)
        setIsloading(false)
      }
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
      setIsloading(false)
    } else {
      try {
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

          setIsloading(false)
        } else {
          setIsloading(false)
          // AsyncStorage.clear()
          ToastAndroid.show(
            "NFT doesn't belong to this account.",
            ToastAndroid.SHORT
          )
        }
      } catch {
        console.log('fetch tokens failed')
      }
    }
  }

  useEffect(() => {
    fetchTokensFromStorage()
  }, [])

  const fetchTokensFromStorage = async () => {
    const selectednetwork = await AsyncStorage.getItem('network')
    const networkType = JSON.parse(selectednetwork).networkType

    let nftData = (await AsyncStorage.getItem('nfts')) || []
    try {
      setTokens(JSON.parse(nftData))
    } catch (e) {
      console.log('Storage tokens fetch failed!!')
      console.log(e)
    }
    setIsloading(false)
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

  if (isLoading)
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
        <LoadingPage />
      </View>
    )

  return (
    <ScrollView style={{ flex: 1, gap: 20, marginVertical: 20 }}>
      <PrimaryAccentText fontColor={'#FFFFFF'}>
        {i18n.t('tokens')}
      </PrimaryAccentText>

      {tokens.network === 'testnet' && (
        <View
          style={{
            padding: 50,
          }}
        >
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
                download={downloadNFTImage}
                toggleModalVisibility={toggleReceipientModalVisibility}
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
        {isModalVisible && (
          <ModalSheetTokenId
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            toggleModalVisibility={toggleModalVisibility}
            setInputValue={setInputValue}
            inputValue={inputValue}
            contractIdValue={contractIdValue}
            setContractIdValue={setContractIdValue}
            fetchTokens={fetchTokens}
            // token={token}
          />
        )}
        <PrimaryButton
          title={i18n.t('importTokens')}
          endIcon={'receive'}
          onPress={toggleModalVisibility}
        />
      </View>
    </ScrollView>
  )
}

export default Assets
