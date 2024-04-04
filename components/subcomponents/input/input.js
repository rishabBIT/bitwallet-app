import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

const Input = ({ label, ...restProps }) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <View style={{ gap: 10 }}>
      {label && (
        <Text style={{ fontSize: 20, color: '#D8DD00' }}>{label}:</Text>
      )}
      <TextInput
        style={{
          backgroundColor: '#FFFFFF',
          // backgroundColor: isFocused ? '#FFFFFF' : 'rgba(204, 204, 204, 0.5)',
          padding: 20,
          borderWidth: 2,
          borderColor: '#44CCFF',
          borderRadius: 20,
          fontSize: 16,
          color: '#FFFFFF',
          // color: isFocused ? '#393644' : '#FFFFFF',
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
    </View>
  )
}

export default Input
