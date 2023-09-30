import Container from "../subcomponents/container/container";
import { View } from "react-native";
import { LinkButton, TertiaryButton } from "../subcomponents/button/button";
import { useState, useEffect } from "react";
import {
  PrimaryAccentText,
  WarningText,
  SecondaryText,
} from "../subcomponents/text/text";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SeedPhrase = ({ setView }) => {
  const [phrase, setPhrase] = useState("");

  const poppulatePhrase = async () => {
    AsyncStorage.getItem("phrase")
      .then((res) => {
        setPhrase(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    poppulatePhrase();
  }, []);

  return (
    <Container>
      <View style={{ padding: 20, gap: 20 }}>
        <View style={{ width: 80 }}>
          <LinkButton title="< Back" onPress={() => setView(1)} />
        </View>
        <PrimaryAccentText>Secret Passphrase</PrimaryAccentText>
        <SecondaryText>Click to copy</SecondaryText>
        <TertiaryButton
          title={phrase}
          onPress={() => Clipboard.setStringAsync(phrase)}
        />
        <WarningText align={"left"}>Warning: Do not disclose.</WarningText>
        <WarningText align={"left"}>
          Anyone with access to the passphrase will also have access to your
          account!
        </WarningText>
      </View>
    </Container>
  );
};

export default SeedPhrase;
