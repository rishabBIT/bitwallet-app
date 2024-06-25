import Container from "../subcomponents/container/container";
import { View } from "react-native";
import { PrimaryButton } from "../subcomponents/button/button";
import {
  PrimaryText,
  SecondaryText,
  WarningText,
} from "../subcomponents/text/text";
import Icon from "../subcomponents/icon/icon";

const NoInternet = ({ retry }) => {
  return (
    <Container>
      <View style={{ flex: 1, padding: 20, justifyContent: "space-around" }}>
        <View style={{ alignItems: "center" }}>
          <Icon icon="error" width={200} height={200} fill="#FFA500" />
          <WarningText>Could not establish connection !</WarningText>
          <SecondaryText>
            Make sure you're connected to the internet.
          </SecondaryText>
        </View>
        <PrimaryButton title="Retry" endIcon={"refresh"} onPress={retry} />
      </View>
    </Container>
  );
};

export default NoInternet;
