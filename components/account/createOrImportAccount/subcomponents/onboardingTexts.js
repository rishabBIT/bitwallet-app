import { View } from 'react-native'
import i18n from '../../../../locales/i18n'
import {
  PrimaryAccentText,
  SecondaryText,
} from '../../../../subcomponents/text/text'

const OnboardingTexts = () => {
  return (
    <View>
      <PrimaryAccentText>{i18n.t('onboardingText')}</PrimaryAccentText>

      <SecondaryText>{i18n.t('onboardingTextOne')}</SecondaryText>
    </View>
  )
}

export default OnboardingTexts
