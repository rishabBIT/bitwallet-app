// SimpleMenu.js
import { StyleSheet, View } from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu'
import Icon from '../subcomponents/icon/icon'

const SimpleMenu = () => {
  return (
    <MenuProvider style={styles.menuProvider}>
      <Menu>
        <MenuTrigger>
          <View style={styles.menuTrigger}>
            <Icon height={30} width={30} icon='menu' />
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text='Save' />
          <MenuOption onSelect={() => alert(`Delete`)} text='Delete' />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  )
}

const styles = StyleSheet.create({
  menuProvider: {
    flex: 1,
  },
  menuTrigger: {
    padding: 10,
  },
})

export default SimpleMenu
