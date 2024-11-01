// LanguageSelector.js
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import i18n, { changeLocale } from '../../../../locales/i18n.js'
import Icon from '../../../../subcomponents/icon/icon.js'

const LanguageSelector = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  return (
    <View>
      <TouchableOpacity onPress={() => setIsMenuVisible(!isMenuVisible)}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Icon height={30} width={30} icon='globe' />
          <Text style={{ color: 'white', fontSize: 20, paddingLeft: 10 }}>
            {i18n.locale === 'es' ? 'Spanish' : 'English'}
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          height: isMenuVisible ? 90 : 0,
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          right: 0,
          top: 70,
          zIndex: -1,
          alignItems: 'center',
          marginRight: 20,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => changeLocale('en')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isMenuVisible && <Icon icon='englishUs' height={20} width={18} />}
            <Text style={styles.text}>English</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeLocale('es')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isMenuVisible && <Icon icon='spanish' height={20} width={18} />}
            <Text style={styles.text}>Spanish</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = {
  text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
}

export default LanguageSelector
