import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import Container from '../../subcomponents/container'
import LoadingPage from '../subcomponents/loading/loadingPage'
import Assets from './assets'
import Certificate from './certificate'
import Footer from './footer'
import Navbar from './navbar'
import Wallet from './wallet'

const Home = ({ navigation }) => {
  const [isLoading, setIsloading] = useState(true)
  const [status, setStatus] = useState(null)
  const [view, setView] = useState('wallet')

  useEffect(() => {
    setIsloading(true)
    const handleNavigation = navigation.addListener('focus', () => {
      checkStatus()
    })

    return handleNavigation
  }, [navigation])

  const checkStatus = async () => {
    setIsloading(true)
    let status = { pin: false, phrase: false }

    try {
      const pin = await AsyncStorage.getItem('pin')
      if (pin && pin !== null && pin !== 'null' && pin.length === 4) {
        status.pin = true
      }
      const phrase = await AsyncStorage.getItem('phrase')
      if (phrase && phrase !== null && phrase !== 'null') {
        status.phrase = true
      }
      setStatus(status)
      setIsloading(false)
    } catch (e) {
      console.log(e)
      alert(JSON.stringify(e))
    }
  }

  if (isLoading) return <LoadingPage />

  if (!status.pin) {
    navigation.navigate('CreatePin')
  }
  if (!status.phrase) {
    navigation.navigate('CreateorImport')
  }

  return (
    <Container>
      <Navbar navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {view === 'wallet' && <Wallet navigation={navigation} />}
        {view === 'certificate' && <Certificate navigation={navigation} />}
        {view === 'assets' && <Assets navigation={navigation} />}
      </View>
      <Footer view={view} setView={setView} />
    </Container>
  )
}

export default Home
