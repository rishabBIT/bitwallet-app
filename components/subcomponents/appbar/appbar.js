import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import { LinkButton } from '../button/button'
import Icon from '../icon/icon'

export const AppBar = ({ title, back }) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: 'transparent',
      }}
    >
      {!back && (
        <View style={{ position: 'absolute', left: 16 }}>
          <LinkButton startIcon={'back'} onPress={back} />
        </View>
      )}
      {back && (
        <TouchableOpacity
          style={{ position: 'absolute', left: 16 }}
          onPress={() => navigation.goBack()}
        >
          <Icon icon={'back'} width={50} height={50} />
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
        {title}
      </Text>
    </View>
  )
}
