import Container from "../../subcomponents/container/container";
import {
  PrimaryAccentText,
  SecondaryText,
  ErrorText,
} from "../../subcomponents/text/text";
import { PrimaryButton, LinkButton } from "../../subcomponents/button/button";
import { View } from "react-native";
import Input from "../../subcomponents/input/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Loading } from "../../subcomponents/loading/loadingPage";

const VerifyPhrase = ({ pasphrase, keys, back, navigation }) => {
  const [word, setWord] = useState("");
  const [targetIndex, setTargetIndex] = useState(0);
  const [targetWord, setTargetWord] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getWordsFromSentence(sentence) {
    const words = sentence.split(" ");
    return words;
  }

  function getRandomNumber() {
    const randomNumber = Math.random();
    const scaledNumber = Math.floor(randomNumber * 12) + 1;
    return scaledNumber;
  }

  useEffect(() => {
    const index = getRandomNumber();
    const wordsArray = getWordsFromSentence(pasphrase);
    setTargetIndex(index);
    setTargetWord(wordsArray[index - 1]);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    if (word === "") {
      setError(`Please enter word # ${targetIndex}`);
      setLoading(false);
      return;
    }
    if (word !== targetWord) {
      setError("Words did not match. Please go back to start over.");
      setLoading(false);
      return;
    }
    await AsyncStorage.setItem("phrase", keys.seedPhrase);
    await AsyncStorage.setItem("publicKey", keys.publicKey);
    await AsyncStorage.setItem("secretKey", keys.secretKey);
    navigation.navigate("Home");
    setLoading(false);
  };

  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <View style={{ width: 60 }}>
          <LinkButton title="< Back" onPress={back} />
        </View>

        <View style={{ gap: 10 }}>
          <PrimaryAccentText>Verify Passphrase</PrimaryAccentText>
          <SecondaryText>
            Enter the following word from your recovery phrase to complete the
            setup process.
          </SecondaryText>
        </View>
        <View>
          <Input
            label={`Word #${targetIndex}`}
            placeholder="Enter word..."
            value={word}
            onChangeText={(e) => setWord(e)}
          />
          <ErrorText>{error}</ErrorText>
        </View>

        {loading ? (
          <Loading />
        ) : (
          <PrimaryButton title="Verify and Complete" onPress={handleSubmit} />
        )}
      </View>
    </Container>
  );
};

export default VerifyPhrase;
