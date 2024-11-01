import { View } from 'react-native'
import Container from '../../../subcomponents/container.js'
import ActionButtons from './subcomponents/actionButtons.js'
import LanguageSelector from './subcomponents/languageSelector.js'
import LogoSection from './subcomponents/logoSection.js'
import OnboardingTexts from './subcomponents/onboardingTexts.js'
import TermsAndConds from './subcomponents/termsAndConditions.js'

const CreateorImport = ({ navigation }) => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <LanguageSelector />
        <LogoSection />
        <OnboardingTexts />
        <View style={{ height: 50 }} />
        <ActionButtons navigation={navigation} />
        <TermsAndConds navigation={navigation} />
      </View>
    </Container>
  )
}

export default CreateorImport
