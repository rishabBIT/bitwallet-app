import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CreateAccount from './components/account/createAccount/createAccount'
import CreateorImport from './components/account/createorimport'
import ImportAccount from './components/account/importAccount/importAccount'
import Accountdetails from './components/accountdetails/accountdetails'
import Certificate from './components/certificate/certificate'
import Connection from './components/connection/connection'
import DeepLinkHandler from './components/deepLinking/deepLinking'
import Home from './components/home/home'
import Menu from './components/menu/menu'
import Network from './components/network/network'
import NFTTransactionHistory from './components/nft_transaction_history/nft_transaction_history'
import NoInternet from './components/noInternet/noInternet'
import CreatePin from './components/pin/createPin'
import Pin from './components/pin/keypad'
import ResetAccount from './components/resetAccount/resetAccount'
import Scanner from './components/scanner/scanner'
import SendTransaction from './components/sendTransaction/sendTransaction'
import {
  checkForUpdates,
  updateURLs,
} from './components/subcomponents/api/nodeserver'
import TabViewExample from './components/tabview/tabview'
import TransactionHistoryIncoming from './components/transaction_history/transaction_history_incoming'
import TransactionHistoryOutgoing from './components/transaction_history/transaction_history_outgoing'

import Update from './components/update/update'

import LoadingPage from './components/subcomponents/loading/loadingPage'

const Stack = createNativeStackNavigator()

const linking = {
  prefixes: ['beimagine.tech://'],
  config: {
    initialRouteName: 'Deeplink',
    screens: {
      Deeplink: 'Deeplink',
    },
  },
}

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false)

  const [isPinRequired, setIsPinRequired] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const [status, setStatus] = useState('')
  const [storedPin, setStoredPin] = useState('')
  const [isConnected, setIsConnected] = useState(true)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  const [appName, setAppName] = useState('')
  const [action, setAction] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')

  const [deepLink, setDeepLink] = useState(false)

  // useEffect(() => {
  //   async function loadFonts() {
  //     await Font.loadAsync({
  //       SyneRegular: require('./assets/fonts/Syne-Regular.ttf'),
  //     })
  //     setFontsLoaded(true)
  //   }
  //   loadFonts()
  // }, [])

  useEffect(() => {
    Linking.addEventListener('url', (res) => {
      handleDeepLink(res.url)
    })

    handleDeepLink()
    return () => {
      Linking.removeEventListener('url', handleDeepLink)
    }
  }, [])

  useEffect(() => {
    if (deepLink === false) {
      checkStatus()
      checkConnection()
      setTimeout(checkUpdate, 10000)
    }
  }, [deepLink])

  const getInitialUrl = async () => {
    const initialUrl = await Linking.getInitialURL()

    return initialUrl
  }

  const handleDeepLink = async (initialUrl) => {
    try {
      let action, app, redirectUrl

      if (!initialUrl) {
        initialUrl = await getInitialUrl()
      }

      const paramsArray = initialUrl.split('?')[1].split('&')

      if (paramsArray) {
        paramsArray.forEach((param) => {
          const [key, value] = param.split('=')
          if (key === 'action') {
            action = value
          } else if (key === 'app') {
            app = value
          } else if (key === 'redirectUrl') {
            redirectUrl = value
          }
        })

        console.log('Action:', action)
        console.log('App:', app)
        console.log('Redirect URL:', redirectUrl)

        setDataFn(action, app, redirectUrl)
        setDeepLink(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const setDataFn = async (action, appName, redirectUrl) => {
    setAppName(appName)
    setAction(action)
    setRedirectUrl(redirectUrl)
  }

  const checkUpdate = async () => {
    let update = await checkForUpdates()
    setUpdateAvailable(update)
  }

  const checkStatus = async () => {
    setIsloading(true)
    const pin = await AsyncStorage.getItem('pin')

    if (pin && pin !== null && pin !== 'null' && pin.length === 4) {
      setIsPinRequired(true)
      setStoredPin(pin)
    }
    setIsloading(false)
  }

  const checkConnection = async () => {
    setIsloading(true)
    const isInternet = await updateURLs()
    if (isInternet) setIsConnected(true)
    else setIsConnected(false)
    setIsloading(false)
  }

  const enterPin = (e) => {
    if (storedPin !== e) setStatus('Invalid Pin')
    else setIsPinRequired(false)
  }

  if (deepLink)
    return (
      <DeepLinkHandler
        app_name={appName}
        redirectUrl={redirectUrl}
        setDeepLink={setDeepLink}
      />
    )

  if (isLoading) return <LoadingPage />

  // if (!fontsLoaded) return <LoadingPage />

  // if (error) return console.log(error)

  if (isPinRequired)
    return <Pin title='Enter Pin' subtitle={status} submit={enterPin} />

  if (!isConnected) return <NoInternet retry={checkConnection} />

  if (updateAvailable)
    return <Update cancel={() => setUpdateAvailable(false)} />

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_left',
            }}
            deepLink={deepLink}
          />
          <Stack.Screen
            name='Menu'
            component={Menu}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name='Network'
            component={Network}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name='CreatePin'
            component={CreatePin}
            options={{
              headerShown: false,
              presentation: 'modal',
              // animationTypeForReplace: "push",
              // animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name='CreateorImport'
            component={CreateorImport}
            options={{
              headerShown: false,
              presentation: 'modal',
              // animationTypeForReplace: "push",
              // animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name='CreateAccount'
            component={CreateAccount}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='ImportAccount'
            component={ImportAccount}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='Accountdetails'
            component={Accountdetails}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name='ResetAccount'
            component={ResetAccount}
            options={{
              headerShown: false,
              presentation: 'modal',
              // animationTypeForReplace: "push",
              // animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name='TransactionHistoryOutgoing'
            component={TransactionHistoryOutgoing}
            options={{
              headerShown: false,
              // presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name='TransactionHistoryIncoming'
            component={TransactionHistoryIncoming}
            options={{
              headerShown: false,
              // presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name='TabViewExample'
            component={TabViewExample}
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name='SendTransaction'
            component={SendTransaction}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='Scanner'
            component={Scanner}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='Certificate'
            component={Certificate}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='Connection'
            component={Connection}
            options={{
              headerShown: false,
              presentation: 'modal',
              // animationTypeForReplace: "push",
              // animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name='Deeplink'
            component={DeepLinkHandler}
            initialParams={{ app_name: appName }}
          />
          <Stack.Screen
            name='Pin'
            component={Pin}
            title={'Enter Pin'}
            subtitle={status}
            submit={enterPin}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
            name='NFTTransactionHistory'
            component={NFTTransactionHistory}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
