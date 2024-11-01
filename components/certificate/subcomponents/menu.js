import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import i18n from '../../../locales/i18n'
import Icon from '../../../subcomponents/icon/icon'

const MenuOptions = ({ onShare, onTransfer, onDownload, onDelete, isMenu }) => {
  return (
    <View
      style={{
        height: isMenu ? 180 : 0,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        right: 0,
        top: 82,
        zIndex: 9999,
        alignItems: 'center',
        marginRight: 20,
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity onPress={onShare}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.text}>{i18n.t('share')}</Text>
          {isMenu && (
            <Icon icon={'share'} fill={'#000000'} height={20} width={18} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onTransfer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.text}>{i18n.t('transfer')}</Text>
          {isMenu && (
            <Icon
              icon={'transfer_black'}
              fill={'#000000'}
              height={20}
              width={18}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDownload}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.text}>{i18n.t('download')}</Text>
          {isMenu && (
            <Icon
              icon={'download_one'}
              fill={'#000000'}
              height={20}
              width={18}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              fontSize: 16,
              color: 'red',
            }}
          >
            {i18n.t('delete')}
          </Text>
          {isMenu && <Icon icon={'bin'} fill={'red'} height={20} width={18} />}
        </View>
      </TouchableOpacity>
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

export default MenuOptions
