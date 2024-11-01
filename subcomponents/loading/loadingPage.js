import { useEffect, useState } from 'react'
import { View } from 'react-native'
import Container from '../container'

const LoadingPage = () => {
  return (
    <Container>
      <Loading />
    </Container>
  )
}

export default LoadingPage

const Dot = ({ isActive }) => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: isActive ? '#3498DB' : 'rgba(204, 204, 204, 0.5)',
      borderRadius: 50,
    }}
  />
)

export const Loading = () => {
  const [loadingState, setLoadingState] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingState((prev) => {
        if (prev === 3) return 0
        else return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20,
      }}
    >
      <Dot isActive={loadingState > 0} />
      <Dot isActive={loadingState > 1} />
      <Dot isActive={loadingState > 2} />
    </View>
  )
}
