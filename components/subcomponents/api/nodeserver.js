import AsyncStorage from '@react-native-async-storage/async-storage'

const Current_Version = '2.0.3'

export const updateURLs = async () => {
  try {
    const response = await fetch(
      'https://navrajbit.github.io/walletconfig.json'
    )
    const data = await response.json()
    console.log('---', data)
    AsyncStorage.setItem('cert-backend', data['cert-backend'])
    AsyncStorage.setItem('ws-backend', data['ws-backend'])
    AsyncStorage.setItem(
      'cert-urls',
      JSON.stringify({ certURLs: data['cert-urls'] })
    )
    AsyncStorage.setItem('node-backend', data['node-backend'])
    AsyncStorage.setItem('version', data['version'])
    return true
  } catch (e) {
    console.error('error here :', e)
    return false
  }
}

export const checkForUpdates = async () => {
  let updateAvailable = false

  try {
    let version = await AsyncStorage.getItem('version')
    if (version !== null && version !== Current_Version) {
      updateAvailable = true
    }
  } catch {
    console.log('Could not check for updates ---- ')
  }

  return updateAvailable
}

export const getkeys = async () => {
  let API_URL = await AsyncStorage.getItem('node-backend')
  if (API_URL === null || API_URL === 'null') {
    await updateURLs()
    API_URL = await AsyncStorage.getItem('node-backend')
  }
  const endpoint = 'getkeys'
  const url = API_URL + endpoint
  console.log(url)
  const result = { status: 'failed' }
  try {
    const response = await fetch(url).then((res) => res.json())
    console.log(response)
    result.status = 'success'
    result.data = response
  } catch (e) {
    console.log(e)
  }
  return result
}

export const getbalance = async () => {
  const API_URL = await AsyncStorage.getItem('node-backend')
  const publicKey = await AsyncStorage.getItem('publicKey')
  const privateKey = await AsyncStorage.getItem('secretKey')
  const selectednetwork = await AsyncStorage.getItem('network')
  const networkType = JSON.parse(selectednetwork).networkType

  console.log(publicKey, privateKey, selectednetwork, networkType)

  const endpoint = 'getbalance'
  const url = API_URL + endpoint
  const result = { status: 'failed' }
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: publicKey,
        networkType: networkType,
        privateKey,
      }),
    }
    const response = await fetch(url, requestOptions).then((res) => res.json())
    console.log(response)
    result.status = 'success'
    result.data = response
  } catch (e) {
    console.log(e)
  }
  return result
}

export const sendNear = async (address, amount) => {
  const API_URL = await AsyncStorage.getItem('node-backend')
  const publicKey = await AsyncStorage.getItem('publicKey')
  const privateKey = await AsyncStorage.getItem('secretKey')
  const selectednetwork = await AsyncStorage.getItem('network')
  const networkType = JSON.parse(selectednetwork).networkType
  const endpoint = 'sendNear'
  const url = API_URL + endpoint
  const result = { status: 'failed' }
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: publicKey,
        networkType: networkType,
        privateKey: privateKey,
        address: address,
        amount: amount,
      }),
    }
    const response = await fetch(url, requestOptions).then((res) => res.json())
    result.status = 'success'
    result.data = response
  } catch (e) {
    console.log(e)
  }
  return result
}

export const importkeys = async (phrase) => {
  let API_URL = await AsyncStorage.getItem('node-backend')
  if (API_URL === null || API_URL === 'null') {
    await updateURLs()
    API_URL = await AsyncStorage.getItem('node-backend')
  }
  const endpoint = 'importkeys'
  const url = API_URL + endpoint
  // const url = 'http://192.168.29.182:3000/api/' + endpoint
  console.log(url)
  const result = { status: 'failed' }
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seedPhrase: phrase,
      }),
    }

    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        result.status = 'success'
        result.data = response
      })
  } catch (e) {
    console.log(`import keys : ${e}`)
  }
  return result
}

export const getCertificates = async () => {
  const API_URL = await AsyncStorage.getItem('cert-backend')
  const publicKey = await AsyncStorage.getItem('publicKey')
  const endpoint = 'getCertificate'
  const url = `${API_URL}certificate/${endpoint}/?wallet=${publicKey}`
  // const url =
  //   "http://192.168.1.6:8000/api/v2/certificate/getCertificate/?wallet=" +
  //   publicKey;
  console.log(url)
  const result = { status: 'failed' }
  try {
    const response = await fetch(url).then((res) => res.json())
    result.status = 'success'
    result.data = response
  } catch (e) {
    console.log('Cert Error', e)
  }
  return result
}

export const registerDevice = async (token) => {
  const API_URL = await AsyncStorage.getItem('cert-backend')
  const publicKey = await AsyncStorage.getItem('publicKey')
  try {
    const deviceId = await AsyncStorage.getItem('device-id')
    if (deviceId !== null) {
      console.log('Device ID exists:', deviceId)
      return false
    }
  } catch {
    console.log('No device id')
  }
  const url = `${API_URL}wallet/create/`
  console.log(token)
  const result = { status: 'failed', data: null }
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet: publicKey,
        token: token,
        is_active: true,
      }),
    }
    const response = await fetch(url, requestOptions).then((res) => res.json())
    console.log(response)
    result.status = 'success'
    result.data = response
  } catch (e) {
    console.log('Cert Error', e)
  }
  return result
}

export const deleteDevice = async () => {
  const API_URL = await AsyncStorage.getItem('cert-backend')
  if (deviceId === null) {
    console.log('Device ID does not exists:', deviceId)
    return false
  }
  const url = `${API_URL}wallet/device/${deviceId}/`
  const result = { status: 'failed' }
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, requestOptions).then((res) => res.json())
    result.status = 'success'
    result.data = response
  } catch (e) {
    console.log('Cert Error', e)
  }
  return result
}

export const getTransactionHistory = async (accountId) => {
  const endpoint = 'txns'
  const testNetUrl = `https://api-testnet.nearblocks.io/v1/account/${accountId}/${endpoint}`
  const mainNetUl = `https://api.nearblocks.io/v1/account/${accountId}/${endpoint}`
  console.log(testNetUrl)
  const result = { status: 'failed' }
  try {
    const requestOptions = {
      method: 'GET',
    }

    await fetch(testNetUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        result.status = 'success'
        result.data = response
      })
  } catch (e) {
    console.log(`import keys : ${e}`)
  }
  return result
}

export const getNFTTransactionHistory = async (accountId) => {
  const testNetUrl = `https://api-testnet.nearblocks.io/v1/account/${accountId}/nft-txns`
  const mainNetUrl = `https://api.nearblocks.io/v1/account/${accountId}/nft-txns`
  const API_KEY = process.env.API_KEY

  const result = { status: 'failed' }
  try {
    const headers = {
      Authorization: `Bearer ${API_KEY}`,
    }

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    await fetch(mainNetUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        result.status = 'success'
        result.data = response
      })
  } catch (e) {
    console.log(`import keys : ${e}`)
  }
  return result
}

export const importTokens = async (tokenId) => {
  let API_URL = await AsyncStorage.getItem('node-backend')
  if (API_URL === null || API_URL === 'null') {
    await updateURLs()
    API_URL = await AsyncStorage.getItem('node-backend')
  }
  const publicKey = await AsyncStorage.getItem('publicKey')
  const privateKey = await AsyncStorage.getItem('secretKey')
  const selectednetwork = await AsyncStorage.getItem('network')
  const networkType = JSON.parse(selectednetwork).networkType
  const endpoint = 'importTokens'
  const testNetUrl = API_URL + endpoint
  const result = { status: 'failed' }

  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: publicKey,
        networkType: networkType,
        privateKey: privateKey,
        contractId:
          'b807a5695fcaf793206ed7fd1b06c03efe2b81e759c58e4155e31a8c3410fa3e',
        tokenId: tokenId.toString(),
        // tokenId: '25',
      }),
    }

    await fetch(testNetUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        result.status = 'success'
        result.data = response
      })
  } catch (e) {
    console.log(`import keys : ${e}`)
  }
  return result
}
