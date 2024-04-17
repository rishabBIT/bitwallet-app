import { Image, Text, TouchableOpacity, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../subcomponents/button/button'
// import Container from '../subcomponents/container/container'
import { useState } from 'react'
import i18n from '../../locales/i18n'
import { changeLocale } from '../../locales/i18n.js'
import Container from '../../subcomponents/container'
import Icon from '../subcomponents/icon/icon'
import { PrimaryAccentText, SecondaryText } from '../subcomponents/text/text'

const CreateorImport = ({ navigation }) => {
  const [isMenu, setIsMenu] = useState(false)
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
        <TouchableOpacity
          onPress={() => {
            setIsMenu(!isMenu)
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Icon height={30} width={30} icon='globe' />
            <Text style={{ color: 'white', fontSize: 20, paddingLeft: 10 }}>
              {i18n.locale == 'es' ? 'Spanish' : 'English'}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: isMenu ? 80 : 0,
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            right: 0,
            top: 94,
            zIndex: 9999,
            alignItems: 'center',
            marginRight: 20,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              changeLocale('en')
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isMenu && <Icon icon={'englishUs'} height={20} width={18} />}
              <Text style={styles.text}>English</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              changeLocale('es')
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isMenu && <Icon icon={'spanish'} height={20} width={18} />}
              <Text style={styles.text}>Spanish</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/new/Bitwallet-logo.png')}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
            alignSelf: 'center',
          }}
          resizeMode='contain'
        />

        <PrimaryAccentText>{i18n.t('onboardingText')}</PrimaryAccentText>

        <SecondaryText>{i18n.t('onboardingTextOne')}</SecondaryText>

        <View style={{ height: 50 }} />

        <PrimaryButton
          title={i18n.t('createAccount')}
          onPress={() => navigation.navigate('CreateAccount')}
        />
        <PrimaryAccentText fontSize={16}>{i18n.t('or')}</PrimaryAccentText>
        <SecondaryButton
          title={i18n.t('recoverExistingAccount')}
          onPress={() => navigation.navigate('ImportAccount')}
        />
      </View>
    </Container>
  )
}

const styles = {
  text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
  },
}

export default CreateorImport
