import { View } from 'react-native'
import i18n from '../../../../locales/i18n'
import {
  PrimaryAccentText,
  SecondaryText,
} from '../../../../subcomponents/text/text'

const ImportAccountInstructions = () => {
  return (
    <View style={{ gap: 10 }}>
      <View style={{ paddingBottom: 20, paddingTop: 80 }}>
        <PrimaryAccentText fontColor={'#FFFFFF'} fontWeight={'bold'}>
          {i18n.t('recoverAccountTextOne')}
        </PrimaryAccentText>
      </View>
      <SecondaryText>{i18n.t('recoverAccountTextTwo')}</SecondaryText>
    </View>
  )
}

export default ImportAccountInstructions
