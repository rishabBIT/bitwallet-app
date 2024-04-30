import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import { AppBar } from '../subcomponents/appbar/appbar'

export const TermsAndConds = ({ navigation }) => {
  return (
    <Container>
      <SafeAreaView>
        <AppBar
          title={i18n.t('termsConds')}
          back={() => navigation.navigate('Home')}
        />
        <ScrollView
          style={{
            flex: 1,
            // padding: 20,
            paddingHorizontal: 20,
            paddingVertical: 30,
            gap: 20,
            //   justifyContent: 'center',
          }}
        >
          {/* <Text
            style={{
              fontWeight: 'bold',
              fontSize: 40,
              color: 'white',
              paddingBottom: 36,
            }}
          >
            {i18n.t('termsConds')}
          </Text> */}

          <ParaText>{i18n.t('termsPara1')}</ParaText>
          <HeaderText>{i18n.t('termHead2')}</HeaderText>
          <ParaText>{i18n.t('termsPara2')}</ParaText>
          <HeaderText>{i18n.t('termsHead3')}</HeaderText>
          <ParaText>{i18n.t('termsPara3')}</ParaText>
          <HeaderText>{i18n.t('termsHead4')}</HeaderText>
          <ParaText>{i18n.t('termsPara4')}</ParaText>
          <HeaderText>{i18n.t('termsHead5')}</HeaderText>
          <ParaText>{i18n.t('termsPara5')}</ParaText>
          <HeaderText>{i18n.t('termsHead6')}</HeaderText>
          <ParaText>{i18n.t('termsPara6')}</ParaText>
          <HeaderText>{i18n.t('termsHead7')}</HeaderText>
          <ParaText>{i18n.t('termsPara7')}</ParaText>
          <HeaderText>{i18n.t('termsHead8')}</HeaderText>
          <ParaText>{i18n.t('termsPara8')}</ParaText>
          <HeaderText>{i18n.t('termsHead9')}</HeaderText>
          <ParaText>{i18n.t('termsPara9')}</ParaText>
          <HeaderText>{i18n.t('termsHead10')}</HeaderText>
          <ParaText>{i18n.t('termsPara10')}</ParaText>
          <HeaderText>{i18n.t('termsHead11')}</HeaderText>
          <ParaText>{i18n.t('termsPara11')}</ParaText>
          <HeaderText>{i18n.t('termsHead12')}</HeaderText>
          <ParaText>{i18n.t('termsPara12')}</ParaText>
          <HeaderText>{i18n.t('termsHead13')}</HeaderText>
          <ParaText>{i18n.t('termsPara13')}</ParaText>
          <HeaderText>{i18n.t('termsHead14')}</HeaderText>
          <ParaText>{i18n.t('termsPara14')}</ParaText>
          <HeaderText>{i18n.t('termsHead15')}</HeaderText>
          <ParaText>{i18n.t('termsPara15')}</ParaText>
        </ScrollView>
      </SafeAreaView>
    </Container>
  )
}

const HeaderText = ({ children }) => {
  return (
    <Text
      style={{
        fontWeight: '600',
        fontSize: 28,
        color: 'white',
        paddingBottom: 10,
      }}
    >
      {children}
    </Text>
  )
}

const ParaText = ({ children }) => {
  return (
    <Text
      style={{
        fontWeight: 'normal',
        fontSize: 16,
        color: 'white',
        textAlign: 'justify',
        paddingBottom: 20,
      }}
    >
      {children}
    </Text>
  )
}
