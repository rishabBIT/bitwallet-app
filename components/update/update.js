import { Linking, View } from 'react-native'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import { PrimaryButton, SecondaryButton } from '../subcomponents/button/button'
import Icon from '../subcomponents/icon/icon'
import {
  PrimaryAccentText,
  PrimaryText,
  WarningText,
} from '../subcomponents/text/text'

const Update = ({ cancel }) => {
  return (
    <Container>
      <View style={{ flex: 1, padding: 20, justifyContent: 'space-around' }}>
        <View style={{ alignItems: 'center' }}>
          <PrimaryAccentText>{i18n.t('updateAvailable')}</PrimaryAccentText>
          <View style={{ paddingBottom: 20 }}></View>
          <Icon icon='update' width={200} height={200} fill='#00FF00' />
          <View style={{ paddingBottom: 20 }}></View>

          <PrimaryText>{i18n.t('updateAvailableTxt')}</PrimaryText>
          <WarningText>{i18n.t('updateAvailableWarningTxt')}</WarningText>
        </View>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <View style={{ flex: 1 }}>
            <PrimaryButton
              title={i18n.t('update')}
              endIcon={'update'}
              onPress={() => {
                try {
                  Linking.openURL('market://details?id=beimagine.tech').catch(
                    (err) => {
                      alert('Please update the app from the App Store.')
                      cancel()
                    }
                  )
                } catch {
                  alert('Please update the app from the App Store.')
                  cancel()
                }
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <SecondaryButton title={i18n.t('cancel')} onPress={cancel} />
          </View>
        </View>
      </View>
    </Container>
  )
}

export default Update
