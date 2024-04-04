import { Text, TouchableOpacity } from 'react-native'
import Icon from '../icon/icon'

export const PrimaryButton = ({ title, onPress, startIcon, endIcon }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#D8DD00',
        borderRadius: 40,
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        // borderWidth: 2,
        // borderColor: '#3498DB',
      }}
      onPress={onPress}
    >
      {startIcon && (
        <Icon icon={startIcon} width={20} height={20} fill='#ffffff' />
      )}

      <Text
        style={{
          color: '#000000',
          fontSize: 16,
          letterSpacing: 1.0,
          paddingRight: 10,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
      {endIcon && <Icon icon={endIcon} width={20} height={20} fill='#000000' />}
    </TouchableOpacity>
  )
}
export const SecondaryButton = ({ title, onPress, startIcon, endIcon }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#FFFFFF',
        // backgroundColor: '#CCCCCC',
        borderRadius: 40,
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#CCCCCC',
      }}
      onPress={onPress}
    >
      {startIcon && (
        <Icon icon={startIcon} width={20} height={20} fill='#393644' />
      )}

      <Text
        style={{
          color: '#393644',
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      {endIcon && <Icon icon={endIcon} width={20} height={20} fill='#393644' />}
    </TouchableOpacity>
  )
}
export const TertiaryButton = ({ title, onPress, startIcon, endIcon }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'transparent',
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      {startIcon && (
        <Icon icon={startIcon} width={20} height={20} fill='#ffffff' />
      )}

      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      {endIcon && <Icon icon={endIcon} width={20} height={20} fill='#ffffff' />}
    </TouchableOpacity>
  )
}
export const LinkButton = ({ title, onPress, startIcon, endIcon }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      {startIcon && (
        <Icon icon={startIcon} width={50} height={50} fill='#FFFFFF' />
      )}

      <Text
        style={{
          color: '#FFD700',
          fontSize: 20,
        }}
      >
        {title}
      </Text>
      {endIcon && <Icon icon={endIcon} width={20} height={20} fill='#FFD700' />}
    </TouchableOpacity>
  )
}

export const IconButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'transparent',
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Icon icon={icon} width={48} height={48} fill='#ffffff' />
    </TouchableOpacity>
  )
}

export const KeypadButton = ({ number, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF',
        width: 80,
        height: 80,
        borderWidth: 0.8,
        borderRadius: 40,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 24,
        }}
      >
        {number}
      </Text>
    </TouchableOpacity>
  )
}
