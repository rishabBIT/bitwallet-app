import { Linking, View } from 'react-native'
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
          <PrimaryAccentText>Update Available</PrimaryAccentText>
          <Icon icon='update' width={200} height={200} fill='#00FF00' />

          <PrimaryText>A new version of Bit-Wallet is available</PrimaryText>
          <WarningText>Update now for latest features !!</WarningText>
        </View>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <View style={{ flex: 1 }}>
            <PrimaryButton
              title='Update'
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
            <SecondaryButton title='Cancel X' onPress={cancel} />
          </View>
        </View>
      </View>
    </Container>
  )
}

export default Update
