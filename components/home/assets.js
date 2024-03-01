import { useEffect, useState } from 'react'
import {
  Button,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
// import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { importTokens } from '../subcomponents/api/nodeserver'
import { PrimaryButton } from '../subcomponents/button/button'
import LoadingPage from '../subcomponents/loading/loadingPage'
import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
} from '../subcomponents/text/text'

import { ScrollView } from 'react-native'

const { width } = Dimensions.get('window')

const Assets = () => {
  const [tokens, setTokens] = useState([])
  const [isLoading, setIsloading] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [dataLoaded, setDataLoaded] = useState(false)

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible)
  }

  const fetchTokens = async () => {
    setIsloading(true)
    const nftData = JSON.parse(await AsyncStorage.getItem('nfts')) || []

    console.log('====================================')
    console.log('NFT Data')
    console.log(nftData)
    console.log('====================================')

    const isExist = nftData.find((item) => item.token_id === inputValue)

    if (isExist) {
      ToastAndroid.show(
        'This NFT already exists in your wallet',
        ToastAndroid.SHORT
      )
      setIsloading(false)
    } else {
      const publicKey = await AsyncStorage.getItem('publicKey')
      const selectednetwork = await AsyncStorage.getItem('network')
      const networkType = JSON.parse(selectednetwork).networkType

      const res = await importTokens(inputValue)
      // console.log(res)

      if (!res.data || !res.data.tokens) {
        setIsloading(false)
        ToastAndroid.show("NFT doesn't exist.", ToastAndroid.SHORT)
      } else if (res.data.tokens.owner_id === publicKey) {
        res.data.tokens.network = networkType
        // res.data.contractId = nftParams.contractId
        // AsyncStorage.clear()
        nftData.push(res.data.tokens)

        await AsyncStorage.setItem('nfts', JSON.stringify(nftData))
        setTokens([res])
        setIsloading(false)
      } else {
        setIsloading(false)
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
    setIsloading(true)
    let nftData = (await AsyncStorage.getItem('nfts')) || []
    setTokens(JSON.parse(nftData))
    setIsloading(false)
  }

  // useEffect(() => {
  //   console.log(tokens)
  // }, [tokens])

  if (isLoading) return <LoadingPage />
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'space-between',
  //         gap: 50,
  //         padding: 20,
  //       }}
  //     >
  //       <PrimaryAccentText>Assets</PrimaryAccentText>

  // <SafeAreaView>
  //   <Modal
  //     animationType='slide'
  //     transparent
  //     visible={isModalVisible}
  //     presentationStyle='overFullScreen'
  //     onDismiss={toggleModalVisibility}
  //   >
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         backgroundColor: 'rgba(0, 0, 0, 0.2)',
  //       }}
  //     >
  //       <View
  //         style={{
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           position: 'absolute',
  //           top: '50%',
  //           left: '50%',
  //           elevation: 5,
  //           transform: [
  //             { translateX: -(width * 0.4) },
  //             { translateY: -90 },
  //           ],
  //           height: 180,
  //           width: width * 0.8,
  //           backgroundColor: '#fff',
  //           borderRadius: 7,
  //         }}
  //       >
  //         <TouchableOpacity
  //           style={{
  //             position: 'absolute',
  //             top: 8,
  //             right: 8,
  //             zIndex: 1,
  //           }}
  //           onPress={toggleModalVisibility}
  //         >
  //           <Image
  //             source={require('../../assets/close.png')}
  //             style={{ height: 20, width: 20 }}
  //           />
  //         </TouchableOpacity>

  //         <TextInput
  //           placeholder='Enter Token Id'
  //           value={inputValue}
  //           inputMode='numeric'
  //           style={{
  //             width: '80%',
  //             borderRadius: 5,
  //             paddingVertical: 8,
  //             paddingHorizontal: 16,
  //             borderColor: 'rgba(0, 0, 0, 0.2)',
  //             borderWidth: 1,
  //             marginBottom: 8,
  //           }}
  //           onChangeText={(value) => setInputValue(value)}
  //         />

  //         <Button
  //           title='Submit'
  //           onPress={() => {
  //             if (inputValue.length !== 0) {
  //               toggleModalVisibility()
  //               fetchTokens()
  //             } else {
  //               ToastAndroid.show(
  //                 'Token Id cannot be empty',
  //                 ToastAndroid.SHORT
  //               )
  //             }
  //           }}
  //         />
  //       </View>
  //     </View>
  //   </Modal>
  // </SafeAreaView>

  //       {tokens.length !== 0 && (
  //         <FlatList
  //           data={tokens}
  //           renderItem={({ item }) => {
  //             console.log(item)
  //             return (
  //               <View
  //                 style={{
  //                   flex: 1,
  //                   flexDirection: 'column',
  //                   margin: 1,
  //                 }}
  //               >
  //                 <Image
  //                   style={{ height: 300 }}
  //                   source={{
  //                     uri: item.metadata.media,
  //                   }}
  //                 />
  //               </View>
  //             )
  //           }}
  //           numColumns={3}
  //           keyExtractor={(item, index) => String(index)}
  //         />
  //       )}

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           gap: 20,
  //         }}
  //       >
  //         <View style={{ flex: 1 }}>
  //           <PrimaryButton
  //             title='Import Tokens'
  //             onPress={toggleModalVisibility}
  //           />
  //         </View>
  //       </View>
  //       <View />
  //     </View>
  //   )
  // }

  return (
    <ScrollView style={{ flex: 1, gap: 20, marginVertical: 20 }}>
      <PrimaryAccentText>Tokens</PrimaryAccentText>
      {/* {!tokens && (
        <View
          style={{
            padding: 50,
          }}
        >
          <Loading />
        </View>
      )} */}
      {tokens && tokens.length === 0 && (
        <View style={{ padding: 20, flex: 1, gap: 20 }}>
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
                    transform: [
                      { translateX: -(width * 0.4) },
                      { translateY: -90 },
                    ],
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

                  <Button
                    title='Submit'
                    onPress={() => {
                      if (inputValue.length !== 0) {
                        toggleModalVisibility()
                        fetchTokens()
                      } else {
                        ToastAndroid.show(
                          'Token Id cannot be empty',
                          ToastAndroid.SHORT
                        )
                      }
                    }}
                  />
                </View>
              </View>
            </Modal>
          </SafeAreaView>

          <PrimaryText>Your tokens will be shown here.</PrimaryText>
          <PrimaryText>
            Ask your university to send tokens to your wallet address
          </PrimaryText>
          <PrimaryButton
            title='Import tokens'
            endIcon={'receive'}
            onPress={toggleModalVisibility}
          />
        </View>
      )}
      {tokens &&
        tokens.length > 0 &&
        tokens.map((item, index) => <TokenTile token={item} />)}
      <View style={{ padding: 20, flex: 1, gap: 20 }}>
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
                  transform: [
                    { translateX: -(width * 0.4) },
                    { translateY: -90 },
                  ],
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

                <Button
                  title='Submit'
                  onPress={() => {
                    if (inputValue.length !== 0) {
                      toggleModalVisibility()
                      fetchTokens()
                    } else {
                      ToastAndroid.show(
                        'Token Id cannot be empty',
                        ToastAndroid.SHORT
                      )
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
        </SafeAreaView>
        <PrimaryButton
          title='Import tokens'
          endIcon={'receive'}
          onPress={toggleModalVisibility}
        />
      </View>
    </ScrollView>

    // <View>
    //   <FlatList
    //     data={tokens}
    //     renderItem={({ item }) => {
    //       console.log(typeof item)
    //       return <TokenTile token={item} />
    //     }}
    //     keyExtractor={(item) => item.token_id}
    //     contentContainerStyle={{ paddingVertical: 20 }}
    //     // ListEmptyComponent={<EmptyListComponent />}
    //   />

    //   <PrimaryButton title='Import Tokens' onPress={toggleModalVisibility} />
    // </View>
  )
}

const TokenTile = ({ token }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <View>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#393644',
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
        <PrimaryText>{expanded ? '-' : '+'}</PrimaryText>
      </TouchableOpacity>
      {expanded && (
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            gap: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#393644',
          }}
        >
          <TokenContainer token={token} />
          {/* <Image
            style={{
              width: width * 0.4,
              height: 200,
              borderRadius: 5,
            }}
            source={{ uri: token.metadata.media }}
            resizeMode='contain'
          />
          <View style={{ flex: 1 }}>
            <SecondaryText>{token.metadata.description}</SecondaryText>
          </View> */}
        </View>
      )}
    </View>
  )
}

const TokenContainer = ({ token }) => {
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
      {token.map((item, index) => (
        <TokenCard
          token={item}
          key={index}
          // navigation={navigation}
          // issuer={issuer}
        />
      ))}
    </View>
  )
}

const TokenCard = ({ token }) => {
  const blurhash =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjE9071LFZzNxjKM0BdvHD4s4xMZGw7QVZQ&usqp=CAU'

  return (
    <TouchableOpacity
      style={{
        width: 90,
        height: 115,
        backgroundColor: '#393644',
        borderRadius: 5,
      }}
      onPress={() => {}}
    >
      <Image
        style={{
          width: 90,
          height: 67,
          backgroundColor: '#393644',
          borderRadius: 5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        source={token.metadata.media ? token.metadata.media : blurhash}
        contentFit='cover'
        transition={1000}
      />
      <View style={{ padding: 5 }}>
        <SecondaryText>
          {token.metadata.title.substring(0, 15)}
          {token.metadata.title.length > 15 && '...'}
        </SecondaryText>
      </View>
    </TouchableOpacity>
  )
}

export default Assets
