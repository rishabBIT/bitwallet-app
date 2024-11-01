import { LinearGradient } from 'expo-linear-gradient'
import { Image, TouchableOpacity, View } from 'react-native'
import Icon from '../../../../subcomponents/icon/icon'
import { PrimaryText } from '../../../../subcomponents/text/text'

export const TokenTile = ({
  token,
  download,
  toggleModalVisibility,
  navigator,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigator.navigate('TokenDetails', {
          tokenData: token,
          navigation: navigator,
        })
      }
    >
      <LinearGradient
        colors={['#71BBFF', '#E26CFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          // marginBottom: 10,
          marginTop: 10,
          backgroundColor: '#393644',
          width: width - 30,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            source={{ uri: token.metadata.media }}
          />
          <PrimaryText>
            {token.metadata.title.substring(0, 23)}
            {token.metadata.title.length > 23 && '...'}
          </PrimaryText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 16,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              //
              toggleModalVisibility()
            }}
          >
            <Icon icon={'send'} width={20} height={20} fill='#FFF' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await download(token.metadata.media)
            }}
          >
            <Icon icon={'download'} width={18} height={20} fill='#FFF' />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}
