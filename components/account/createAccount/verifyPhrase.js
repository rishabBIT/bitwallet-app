import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import useNotifications from '../../notifications/notifications'
import { registerDevice } from '../../subcomponents/api/nodeserver'
import { LinkButton, PrimaryButton } from '../../subcomponents/button/button'
import Container from '../../subcomponents/container/container'
import Input from '../../subcomponents/input/input'
import { Loading } from '../../subcomponents/loading/loadingPage'
import {
  ErrorText,
  PrimaryAccentText,
  SecondaryText,
} from '../../subcomponents/text/text'

const VerifyPhrase = ({ pasphrase, keys, back, navigation }) => {
  const [word, setWord] = useState('')
  const [targetIndex, setTargetIndex] = useState(0)
  const [targetWord, setTargetWord] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { notification, expoPushToken, registerForPushNotificationsAsync } =
    useNotifications()

  function getWordsFromSentence(sentence) {
    const words = sentence.split(' ')
    console.log('====================================')
    console.log(`Words : ${words}`)
    console.log('====================================')
    return words
  }

  function getRandomNumber() {
    const randomNumber = Math.random()
    const scaledNumber = Math.floor(randomNumber * 12) + 1
    return scaledNumber
  }

  useEffect(() => {
    const index = getRandomNumber()
    const wordsArray = getWordsFromSentence(pasphrase)
    setTargetIndex(index)
    setTargetWord(wordsArray[index - 1])
    console.log('WORD---------------------------')
    console.log(wordsArray[index - 1])
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    if (word === '') {
      setError(`Please enter word #${targetIndex}`)
      setLoading(false)
      return
    }
    if (word !== targetWord) {
      console.log(targetWord)
      console.log(word)
      setError('Words did not match. Please go back to start over.')
      setLoading(false)
      return
    }
    await AsyncStorage.setItem('phrase', keys.seedPhrase)
    await AsyncStorage.setItem('publicKey', keys.publicKey)
    await AsyncStorage.setItem('secretKey', keys.secretKey)
    try {
      const token = await registerForPushNotificationsAsync()
      await registerDevice(token.data)
    } catch {
      console.log('could not register device---')
    }
    navigation.navigate('Home')
    setLoading(false)
  }

  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <View style={{ width: 60 }}>
          <LinkButton title='< Back' onPress={back} />
        </View>

        <View style={{ gap: 10 }}>
          <PrimaryAccentText>Verify Passphrase</PrimaryAccentText>
          <SecondaryText>
            Enter the following word from your recovery phrase to complete the
            setup process.
          </SecondaryText>
        </View>
        <View>
          <Input
            label={`Enter word number ${targetIndex}`}
            placeholder='Enter word...'
            value={word}
            onChangeText={(e) => setWord(e.toString().toLowerCase())}
          />
          <ErrorText>{error}</ErrorText>
        </View>

        {loading ? (
          <Loading />
        ) : (
          <PrimaryButton
            title='Verify and Complete'
            onPress={() => {
              handleSubmit()
              getWordsFromSentence(pasphrase)
            }}
          />
        )}
      </View>
    </Container>
  )
}

export default VerifyPhrase
