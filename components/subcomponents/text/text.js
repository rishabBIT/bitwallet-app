import MaskedView from '@react-native-community/masked-view'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from 'react-native'

export const LargeAccentText = ({ children, align }) => {
  // const [fontsLoaded, error] = useFonts({
  //   Syne: require('../../../assets/fonts/Syne-Regular.ttf'),
  // })
  return (
    <Text
      style={{
        fontSize: 40,
        color: '#3498DB',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}
export const PrimaryAccentText = ({
  children,
  align,
  fontSize,
  fontColor,
  fontWeight,
}) => {
  const [fontsLoaded] = useFonts({
    'Syne-Regular': require('../../../assets/fonts/Syne-Regular.ttf'),
  })
  return (
    <Text
      style={{
        fontWeight: fontWeight ? fontWeight : 'normal',
        // fontFamily: 'Syne-Regular',
        fontSize: fontSize ? fontSize : 24,
        color: fontColor ? fontColor : '#D8DD00',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}
export const SecondaryAccentText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 20,
        color: '#FFD700',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}
export const SuccessText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: '#00FF00',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}
export const ErrorText = ({ children, align, fontSize }) => {
  return (
    <Text
      style={{
        fontSize: fontSize ? fontSize : 14,
        color: '#FF0000',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}
export const InfoText = ({ children, align, fontColor }) => {
  return (
    <Text
      style={{
        fontSize: 16,
        color: fontColor ? fontColor : '#44CCFF',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}
export const WarningText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: '#FFA500',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}
export const PrimaryText = ({
  children,
  align,
  fontColor,
  fontSize,
  fontWeight,
}) => {
  return (
    <Text
      style={{
        fontSize: fontSize ? fontSize : 16,
        color: fontColor ? fontColor : '#FFFFFF',
        textAlign: align ? align : 'center',
        fontWeight: fontWeight ? fontWeight : 'normal',
      }}
    >
      {children}
    </Text>
  )
}
export const SecondaryText = ({ children, align, color }) => {
  return (
    <Text
      style={{
        fontSize: 16,
        color: color ? color : '#ffffff',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}

export const PassPhraseSecondaryText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: '#000',
        textAlign: align ? align : 'center',
      }}
    >
      {children}
    </Text>
  )
}

export const GradientText = ({ colors, ...rest }) => {
  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...rest} style={[rest.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}
