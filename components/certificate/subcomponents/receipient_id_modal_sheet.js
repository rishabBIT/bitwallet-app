import React from 'react'

import { Image } from 'expo-image'
import {
  Button,
  Dimensions,
  Modal,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

export const ModalSheetReceipientId = ({
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
                source={require('../../../assets/close.png')}
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
