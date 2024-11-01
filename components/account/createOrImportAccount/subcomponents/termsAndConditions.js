import { Text, TouchableOpacity, View } from 'react-native'
import i18n from '../../../../locales/i18n'

const TermsAndConds = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('TermsAndConds')}>
        <Text style={styles.link}>{i18n.t('termsConds')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  link: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'underline',
  },
}
export default TermsAndConds
