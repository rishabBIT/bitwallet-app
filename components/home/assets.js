import { useState } from 'react'
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { importTokens } from '../subcomponents/api/nodeserver'
import { PrimaryButton } from '../subcomponents/button/button'
import LoadingPage from '../subcomponents/loading/loadingPage'
import { PrimaryAccentText } from '../subcomponents/text/text'

const { width } = Dimensions.get('window')

const Assets = () => {
  const [tokens, setTokens] = useState([])
  const [isLoading, setIsloading] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible)
  }

  const fetchTokens = async () => {
    setIsloading(true)
    const res = await importTokens(inputValue)
    if (res.data.tokens !== null) {
      setTokens([res])
    }
    setIsloading(false)
  }

  if (isLoading) return <LoadingPage />
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        gap: 50,
        padding: 20,
      }}
    >
      <PrimaryAccentText>Assets</PrimaryAccentText>

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

      {tokens.length !== 0 && (
        <FlatList
          data={tokens}
          renderItem={({ item }) => {
            console.log(item)
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                }}
              >
                <Image
                  style={{ height: 300 }}
                  source={{
                    uri: item.data.tokens.metadata.media,
                  }}
                />
              </View>
            )
          }}
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      )}

      <View
        style={{
          flexDirection: 'row',
          gap: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <PrimaryButton
            title='Import Tokens'
            onPress={toggleModalVisibility}
          />
        </View>
      </View>
      <View />
    </View>
  )
}

export default Assets
