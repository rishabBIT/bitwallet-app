import { Image } from 'expo-image'
import { Text, TouchableOpacity, View } from 'react-native'

export const CertificateCard = ({ cert, navigation, issuer }) => {
  let aspectRatio = '1/1'
  if (cert.width && cert.height) {
    aspectRatio = `${cert.width}/${cert.height}`
  }
  const blurhash =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjE9071LFZzNxjKM0BdvHD4s4xMZGw7QVZQ&usqp=CAU'

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingBottom: 20,
        borderRadius: 5,
        marginVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{
          aspectRatio: aspectRatio,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          borderColor: 'black',
        }}
        onPress={() =>
          navigation.navigate('Certificate', {
            certData: cert,
            issuerData: issuer,
            aspectRatio: aspectRatio,
          })
        }
      >
        <Image
          style={{
            minWidth: '100%',
            // minHeight: ,
            aspectRatio: aspectRatio,
            // backgroundColor: '#393644',
            borderRadius: 5,
            flex: 1,
          }}
          source={cert.image ? cert.image : blurhash}
          contentFit='fill'
          transition={1000}
        />
        <View style={{ padding: 5, borderColor: 'black' }}>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              textAlign: 'center',
            }}
          >
            {cert.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
