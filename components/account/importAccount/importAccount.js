import Container from "../../subcomponents/container/container";
import {
  PrimaryAccentText,
  SecondaryText,
} from "../../subcomponents/text/text";
import { PrimaryButton, LinkButton } from "../../subcomponents/button/button";
import { View } from "react-native";
import Input from "../../subcomponents/input/input";
import { useState } from "react";

const ImportAccount = ({ navigation }) => {
  const [word, setWord] = useState("");
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
          <LinkButton
            title="< Back"
            onPress={() => navigation.navigate("CreateorImport")}
          />
        </View>

        <View style={{ gap: 10 }}>
          <PrimaryAccentText>
            Recover Existing Account Using Passphrase
          </PrimaryAccentText>
          <SecondaryText>
            Enter the backup passphrase associated with the account.
          </SecondaryText>
        </View>
        <Input
          label="Passphrase (12 words)"
          placeholder="Enter phrase..."
          value={word}
          onChangeText={(e) => setWord(e)}
        />

        <PrimaryButton title="Find My Account" />
      </View>
    </Container>
  );
};

export default ImportAccount;
