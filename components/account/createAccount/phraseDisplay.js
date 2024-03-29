import * as Clipboard from 'expo-clipboard'
import { View } from 'react-native'
import { TertiaryButton } from '../../subcomponents/button/button'
import {
  InfoText,
  PassPhraseSecondaryText,
} from '../../subcomponents/text/text'

const PassphraseDisplay = ({ pasphrase, poppulateKeys }) => {
  function getWordsFromSentence(sentence) {
    const words = sentence.split(' ')
    return words
  }

  function groupStringsInArrays(strings) {
    const result = []
    const groupSize = 3

    for (let i = 0; i < strings.length; i += groupSize) {
      const group = [
        { word: strings[i], index: i + 1 },
        { word: strings[i + 1], index: i + 2 },
        { word: strings[i + 2], index: i + 3 },
      ]
      result.push(group)
    }

    return result
  }

  const wordsArray = getWordsFromSentence(pasphrase)
  const groupedArrays = groupStringsInArrays(wordsArray)

  return (
    // <LinearGradient colors={["#BBBBBB", "#262625"]} start={[1, 0]} end={[1, 1]}>
    <View
      style={{
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
      }}
    >
      {groupedArrays.map((arr, index) => (
        <PhraseRow words={arr} key={'group-' + index} />
      ))}
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <TertiaryButton
          title='Copy'
          endIcon={'copy'}
          onPress={() => Clipboard.setStringAsync(pasphrase)}
        />
        <TertiaryButton
          title='Generate New'
          endIcon={'refresh'}
          onPress={() => poppulateKeys()}
        />
      </View>
    </View>
    // </LinearGradient>
  )
}

export default PassphraseDisplay

const PhraseRow = ({ words }) => (
  <View style={{ flexDirection: 'row', gap: 20 }}>
    {words.map((word) => (
      <PhraseCard word={word} key={word.word} />
    ))}
  </View>
)

const PhraseCard = ({ word }) => (
  <View
    style={{
      backgroundColor: 'white',

      padding: 10,
      width: 90,
      flexDirection: 'row',
      gap: 2,
      borderRadius: 5,
    }}
  >
    <InfoText>{word.index}</InfoText>
    <PassPhraseSecondaryText>{word.word}</PassPhraseSecondaryText>
  </View>
)
