import {
  Button,
  Image,
  Modal,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
// import Snackbar from 'react-native-snackbar'

export const ModalSheetTokenId = ({
  isModalVisible,
  setModalVisible,
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
              // onPress={() => {
              //   setModalVisible(false)
              // }}
            >
              <Image
                source={require('../../../../assets/close.png')}
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
