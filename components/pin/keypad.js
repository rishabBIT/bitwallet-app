import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Container from '../../subcomponents/container'
import { KeypadButton } from '../subcomponents/button/button'
import { PrimaryAccentText, SecondaryText } from '../subcomponents/text/text'

const Pin = ({ submit, title, subtitle }) => {
  const [enteredPin, setEnteredPin] = useState('')
  const [displayPin, setDisplayPin] = useState('○ ○ ○ ○')

  const handlePress = (e) => {
    if (enteredPin.length === 3) {
      submit(enteredPin + e)
      setDisplayPin('○ ○ ○ ○')
      setEnteredPin('')
    } else {
      setEnteredPin((prev) => prev + e)
      setDisplayPin((prev) => {
        const updatedPin = prev.split(' ')
        updatedPin[enteredPin.length] = '●'
        return updatedPin.join(' ')
      })
    }
  }

  return (
    <Container>
      <View style={styles.container}>
        <PrimaryAccentText fontColor={'#FFFFFF'} fontWeight={'bold'}>
          {title}
        </PrimaryAccentText>
        <SecondaryText>{subtitle}</SecondaryText>
        <View style={styles.pinContainer}>
          {displayPin.split(' ').map((circle, index) => (
            <View style={styles.circle} key={index}>
              <PrimaryAccentText style={styles.circleText}>
                {circle}
              </PrimaryAccentText>
            </View>
          ))}
        </View>
        <Keypad handlePress={handlePress} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
  },
  circle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleText: {
    fontSize: 20,
    lineHeight: 40,
    width: 40,
    textAlign: 'center',
  },
})

export default Pin

const Keypad = ({ handlePress }) => (
  <View style={{ width: '100%', gap: 20 }}>
    <KeypadRow numbers={[1, 2, 3]} handlePress={handlePress} />
    <KeypadRow numbers={[4, 5, 6]} handlePress={handlePress} />
    <KeypadRow numbers={[7, 8, 9]} handlePress={handlePress} />
    <KeypadRow numbers={[0]} handlePress={handlePress} />
  </View>
)

const KeypadRow = ({ numbers, handlePress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: numbers.length > 1 ? 'space-between' : 'center',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        maxWidth: '320',
      }}
    >
      {numbers.map((num, index) => (
        <KeypadButton
          number={num}
          key={'keypad-' + num + index}
          onPress={() => handlePress(num.toString())}
        />
      ))}
    </View>
  )
}
