import { useNavigation } from '@react-navigation/native'
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { LinkButton } from '../button/button'
import Icon from '../icon/icon'

export const AppBar = ({ title, back }) => {
  const { width } = Dimensions.get('window')

  const navigation = useNavigation()
  return (
    <View>
      <StatusBar backgroundColor={'rgba(0, 0, 0, 0.8)'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          width: width,
          // maxWidth: width,
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
            <Icon icon={'back'} width={24} height={24} />
          </TouchableOpacity>
        )}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
          {title}
        </Text>
      </View>
    </View>
  )
}
