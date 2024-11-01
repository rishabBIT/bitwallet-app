import { View } from 'react-native'
import i18n from '../../../../locales/i18n'
import {
  PrimaryAccentText,
  SecondaryText,
} from '../../../../subcomponents/text/text'

const CreateAccountInstructions = () => {
  return (
    <View style={{ gap: 10 }}>
      <PrimaryAccentText fontColor={'#FFFFFF'} fontWeight={'bold'}>
        {i18n.t('setupPassphrase')}
      </PrimaryAccentText>
      <View style={{ paddingBottom: 10 }}></View>
      <SecondaryText>{i18n.t('createAccountTextOne')}</SecondaryText>
      <SecondaryText color={'#D8DD00'}>
        {i18n.t('createAccountTextTwo')}
      </SecondaryText>
      <SecondaryText>{i18n.t('createAccountTextThree')}</SecondaryText>
    </View>
  )
}

export default CreateAccountInstructions
