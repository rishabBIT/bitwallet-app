import { View } from 'react-native'
import i18n from '../../../../locales/i18n'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../subcomponents/button/button'
import { PrimaryAccentText } from '../../../../subcomponents/text/text'

const ActionButtons = ({ navigation }) => {
  return (
    <View>
      <PrimaryButton
        title={i18n.t('createAccount')}
        onPress={() => navigation.navigate('CreateAccount')}
      />
      <View style={{ height: 10 }} />
      <PrimaryAccentText fontSize={16}>{i18n.t('or')}</PrimaryAccentText>
      <View style={{ height: 10 }} />
      <SecondaryButton
        title={i18n.t('recoverExistingAccount')}
        onPress={() => navigation.navigate('ImportAccount')}
      />
    </View>
  )
}

export default ActionButtons
