import { useEffect, useState } from "react";
import { View } from "react-native";
import { getkeys } from "../../subcomponents/api/nodeserver";
import { PrimaryButton } from "../../subcomponents/button/button";
// import Container from '../../subcomponents/container/container'
import Container from "../../../subcomponents/container";
import { Loading } from "../../subcomponents/loading/loadingPage";

import { AppBar } from "../../subcomponents/appbar/appbar";
import {
  PrimaryAccentText,
  SecondaryText,
} from "../../subcomponents/text/text";
import PassphraseDisplay from "./phraseDisplay";
import VerifyPhrase from "./verifyPhrase";
import i18n from "../../../locales/i18n";

const CreateAccount = ({ navigation, back }) => {
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
      <AppBar
        title={i18n.t("createAccount")}
        back={() => navigation.navigate("CreateorImport")}
      />

      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <View style={{ gap: 10 }}>
          <PrimaryAccentText fontColor={"#FFFFFF"} fontWeight={"bold"}>
            {i18n.t("setupPassphrase")}
          </PrimaryAccentText>
          <View style={{ paddingBottom: 10 }}></View>
          <SecondaryText>{i18n.t("createAccountTextOne")}</SecondaryText>
          <SecondaryText color={"#D8DD00"}>
            {i18n.t("createAccountTextTwo")}
          </SecondaryText>
          <SecondaryText>{i18n.t("createAccountTextThree")}</SecondaryText>
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
            title={i18n.t("continue")}
            onPress={() => {
              setIsVerifying(true);
            }}
          />
        )}
      </View>
    </Container>
  );
};

export default CreateAccount;
