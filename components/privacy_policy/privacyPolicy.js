import { ScrollView, StyleSheet, Text, View } from 'react-native'
import i18n from '../../locales/i18n'
import Container from '../../subcomponents/container'
import { AppBar } from '../subcomponents/appbar/appbar'

export const PrivacyPolicy = ({ navigation }) => {
  return (
    <Container>
      <View>
        <AppBar
          title={i18n.t('privacyPolicy')}
          back={() => navigation.navigate('Home')}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
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

          <MultiText
            text1={i18n.t('privTxt1')}
            text2={i18n.t('privTxt2')}
            text3={i18n.t('privTxt3')}
          />
          <MultiText
            text1={i18n.t('privTxt4')}
            text2={i18n.t('privTxt5')}
            text3={i18n.t('privTxt6')}
          />

          <HeaderText children={i18n.t('privTxt7')} />
          <ParaText children={i18n.t('privTxt8')} />

          <HeaderText children={i18n.t('privTxt9')} />
          <ParaTextNoPadding children={i18n.t('privTxt10')} />
          <ParaText children={i18n.t('privTxt11')} />

          <ParaTextNoPadding children={i18n.t('privTxt12')} />
          <ParaTextNoPadding children={i18n.t('privTxt13')} />
          <ParaTextNoPadding children={i18n.t('privTxt14')} />
          <ParaTextNoPadding children={i18n.t('privTxt15')} />
          <ParaText children={i18n.t('privTxt16')} />

          <MultiText text1={i18n.t('privTxt17')} text2={i18n.t('privTxt18')} />

          <ParaText children={i18n.t('privTxt19')} />

          <View>
            <Text style={styles.heading}>{i18n.t('privTxt20')}</Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>{i18n.t('privTxt21')}</Text>
              <Text style={styles.listItem}>{i18n.t('privTxt22')}</Text>
              <Text style={styles.listItem}>{i18n.t('privTxt23')}</Text>
              <Text style={styles.listItem}>{i18n.t('privTxt24')}</Text>
              <Text style={styles.listItem}>{i18n.t('privTxt25')}</Text>
              <Text style={styles.listItem}>{i18n.t('privTxt26')}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.heading}>{i18n.t('privTxt27')}</Text>
            <ParaTextNoPadding children={i18n.t('privTxt28')} />
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• {i18n.t('privTxt29')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt30')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt31')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt32')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt33')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt34')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt35')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt36')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt37')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt38')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt39')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt40')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt41')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt42')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt43')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt44')}</Text>
              <Text style={styles.listItem}>• {i18n.t('privTxt45')}</Text>
            </View>
          </View>
          <ParaText children={i18n.t('privTxt46')} />
          <ParaText children={i18n.t('privTxt47')} />

          <ParaTextBold children={i18n.t('privTxt48')} />
          <ParaTextBold children={i18n.t('privTxt50')} />
          <ParaTextBold children={i18n.t('privTxt51')} />
          <ParaTextBold children={i18n.t('privTxt52')} />
          <ParaTextBold children={i18n.t('privTxt54')} />

          <HeaderText children={i18n.t('privTxt56')} />
          <ParaTextNoPadding children={i18n.t('privTxt57')} />
          <BoldNormalText
            text1={i18n.t('privTxt58')}
            text2={i18n.t('privTxt59')}
          />
          <BoldNormalText
            text1={i18n.t('privTxt60')}
            text2={i18n.t('privTxt61')}
          />
          <BoldNormalText
            text1={i18n.t('privTxt62')}
            text2={i18n.t('privTxt63')}
          />
          <BoldNormalText
            text1={i18n.t('privTxt64')}
            text2={i18n.t('privTxt65')}
          />
          <BoldNormalText
            text1={i18n.t('privTxt67')}
            text2={i18n.t('privTxt68')}
          />
          <BoldNormalText
            text1={i18n.t('privTxt69')}
            text2={i18n.t('privTxt70')}
          />

          <ParaText children={i18n.t('privTxt71')} />

          <View style={styles.listContainer}>
            <Text style={styles.listItem}>1. {i18n.t('privTxt72')}</Text>
            <Text style={styles.listItem}>2. {i18n.t('privTxt73')}</Text>
            <Text style={styles.listItem}>3. {i18n.t('privTxt74')}</Text>
          </View>

          <ParaText children={i18n.t('privTxt75')} />

          <HeaderText children={i18n.t('privTxt76')} />
          <ParaText children={i18n.t('privTxt77')} />

          <HeaderText children={i18n.t('privTxt78')} />
          <ParaText children={i18n.t('privTxt79')} />

          <HeaderText children={i18n.t('privTxt80')} />
          <ParaText children={i18n.t('privTxt81')} />

          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 16,
              color: 'white',
            }}
          >
            {i18n.t('privTxt83')}: Nikhil Goyal
          </Text>
          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 16,
              color: 'white',
            }}
          >
            {i18n.t('privTxt84')}: support@beimagine.tech
          </Text>
          <ParaTextNoPadding children={i18n.t('privTxt85')} />
          <ParaTextNoPadding children={i18n.t('privTxt86')} />

          <View style={{ paddingTop: 30 }}>
            <Text style={styles.heading}>{i18n.t('privTxt87')}</Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>1. {i18n.t('privTxt89')}</Text>
              <Text style={styles.listItem}>2. {i18n.t('privTxt90')}</Text>
              <Text style={styles.listItem}>3. {i18n.t('privTxt91')}</Text>
              <Text style={styles.listItem}>4. {i18n.t('privTxt92')}</Text>
              <Text style={styles.listItem}>5. {i18n.t('privTxt93')}</Text>
              <Text style={styles.listItem}>6. {i18n.t('privTxt94')}</Text>
            </View>
          </View>

          <View style={{ paddingTop: 30 }}></View>
          <HeaderText children={i18n.t('privTxt95')} />
          <ParaTextNoPadding children={i18n.t('privTxt96')} />
          <ParaTextNoPadding children={i18n.t('privTxt97')} />

          <View style={{ paddingTop: 30 }}></View>
          <HeaderText children={i18n.t('privTxt98')} />
          <ParaTextNoPadding children={i18n.t('privTxt99')} />
        </ScrollView>
      </View>
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

const ParaText = ({ children, padding }) => {
  return (
    <Text
      style={{
        fontWeight: 'normal',
        fontSize: 16,
        color: 'white',
        // textAlign: 'justify',
        paddingBottom: padding ? padding : 20,
      }}
    >
      {children}
    </Text>
  )
}

const ParaTextBold = ({ children, padding }) => {
  return (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        // textAlign: 'justify',
        paddingBottom: padding ? padding : 20,
      }}
    >
      {children}
    </Text>
  )
}

const ParaTextNoPadding = ({ children }) => {
  return (
    <Text
      style={{
        fontWeight: 'normal',
        fontSize: 16,
        color: 'white',
        // textAlign: 'justify',
        // paddingBottom: padding ? padding : 20,
      }}
    >
      {children}
    </Text>
  )
}

const MultiText = ({ text1, text2, text3, bold }) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: 'normal',
          fontSize: 16,
          color: 'white',
          // textAlign: 'justify',
          paddingBottom: 20,
        }}
      >
        {text1}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: 'white',
            // textAlign: 'justify',
            paddingBottom: 20,
          }}
        >
          {text2}
        </Text>
        <Text
          style={{
            fontWeight: 'normal',
            fontSize: 16,
            color: 'white',
            // textAlign: 'justify',
            paddingBottom: 20,
          }}
        >
          {text3}
        </Text>
      </Text>
    </View>
  )
}

const BoldNormalText = ({ text1, text2 }) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: 'white',
          // textAlign: 'justify',
          paddingBottom: 20,
        }}
      >
        {text1}
        <Text
          style={{
            fontWeight: 'normal',
            fontSize: 16,
            color: 'white',
            // textAlign: 'justify',
            paddingBottom: 20,
          }}
        >
          {text2}
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  listContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 5,
    color: 'white',
  },
})
