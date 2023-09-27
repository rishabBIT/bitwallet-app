import Container from "../subcomponents/container/container";
import { PrimaryAccentText, SecondaryText } from "../subcomponents/text/text";
import { PrimaryButton, SecondaryButton } from "../subcomponents/button/button";
import { View } from "react-native";

const CreateorImport = ({ navigation }) => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          gap: 20,
        }}
      >
        <PrimaryAccentText>Welcome to Bit-Wallet</PrimaryAccentText>

        <SecondaryText>
          Secure, non-custodial, crypto wallet. Your personal repository of
          verified certificates and documents
        </SecondaryText>

        <View style={{ height: 50 }} />

        <PrimaryButton
          title="Create Account"
          onPress={() => navigation.navigate("CreateAccount")}
        />
        <PrimaryAccentText>Or</PrimaryAccentText>
        <SecondaryButton
          title="Recover Existing Account"
          onPress={() => navigation.navigate("ImportAccount")}
        />
      </View>
    </Container>
  );
};

export default CreateorImport;
