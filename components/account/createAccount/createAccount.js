import Container from "../../subcomponents/container/container";
import {
  PrimaryAccentText,
  SecondaryText,
  WarningText,
  InfoText,
} from "../../subcomponents/text/text";
import {
  PrimaryButton,
  SecondaryButton,
  LinkButton,
} from "../../subcomponents/button/button";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import PassphraseDisplay from "./phraseDisplay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getkeys } from "../../subcomponents/api/nodeserver";
import { Loading } from "../../subcomponents/loading/loadingPage";
import VerifyPhrase from "./verifyPhrase";

const CreateAccount = ({ navigation }) => {
  const [pasphrase, setPassphrase] = useState(null);
  const [keys, setKeys] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    poppulateKeys();
  }, []);

  const poppulateKeys = async () => {
    setIsloading(true);
    const response = await getkeys();
    if (response.status === "success") {
      setPassphrase(response.data.keys.seedPhrase);
      setKeys(response.data.keys);
      setIsloading(false);
    }
  };

  if (isVerifying)
    return (
      <VerifyPhrase
        pasphrase={pasphrase}
        keys={keys}
        back={() => setIsVerifying(false)}
        navigation={navigation}
      />
    );

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
          <PrimaryAccentText>Setup Your Secure Passphrase</PrimaryAccentText>
          <SecondaryText>
            Write down the following words in order and keep them somewhere
            safe.
          </SecondaryText>
          <SecondaryText>
            You will be asked to verify your passphrase next.
          </SecondaryText>
          <WarningText align="left">
            Warning: Anyone with access to the passphrase will also have access
            to your account!
          </WarningText>
        </View>

        {isLoading && <Loading />}

        {!isLoading && (
          <PassphraseDisplay
            pasphrase={pasphrase}
            poppulateKeys={poppulateKeys}
          />
        )}

        {!isLoading && (
          <PrimaryButton
            title="Continue"
            onPress={() => setIsVerifying(true)}
          />
        )}
      </View>
    </Container>
  );
};

export default CreateAccount;
