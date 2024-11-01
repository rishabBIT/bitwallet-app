import { StyleSheet, View } from 'react-native'
import { CertificateCard } from './certificate_card'

export const CertificateContainer = ({ issuer, navigation }) => {
  const length = issuer.certificates.length
  const itemPerColumn = Math.floor(length / 3)

  const columns = [[], [], []]

  for (let i = 0; i < issuer.certificates.length; i++) {
    const columnIndex = i % 3
    columns[columnIndex].push(issuer.certificates[i])
  }

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((columnIndex) => (
        <View key={columnIndex} style={styles.column}>
          {columns[columnIndex].map((certificate, index) => (
            <CertificateCard
              key={index}
              cert={certificate}
              navigation={navigation}
              issuer={issuer}
            />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    // paddingHorizontal: 10,
    marginTop: 20,
  },
  column: {
    flex: 1,
    // backgroundColor: 'red',
    marginHorizontal: 5,
    // padding: 10,
    // height: 100,
  },
})
