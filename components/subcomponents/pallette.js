import { SafeAreaView } from "react-native-safe-area-context";
import Container from "./container/container";
import {
  PrimaryAccentText,
  SecondaryAccentText,
  SuccessText,
  ErrorText,
  InfoText,
  WarningText,
  PrimaryText,
  SecondaryText,
} from "./text/text";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  IconButton,
  LinkButton,
} from "./button/button";
import { View } from "react-native";
import Input from "./input/input";

const Pallette = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <View style={{ padding: 20, gap: 10 }}>
          <PrimaryAccentText>Primary Accent Text</PrimaryAccentText>
          <SuccessText>Success Text</SuccessText>
          <ErrorText>Error Text</ErrorText>
          <InfoText>Info Text</InfoText>
          <WarningText>Warning Text</WarningText>
          <PrimaryText>Primary Text</PrimaryText>
          <SecondaryText>Secondary Text</SecondaryText>
          <PrimaryButton
            title="Primary Button"
            startIcon={"refresh"}
            endIcon={"refresh"}
            onPress={() => alert("Button Clicked!")}
          />
          <SecondaryButton
            title="Secondary Button"
            startIcon={"refresh"}
            endIcon={"refresh"}
            onPress={() => alert("Button Clicked!")}
          />
          <TertiaryButton
            title="Tertiary Button"
            startIcon={"refresh"}
            endIcon={"refresh"}
            onPress={() => alert("Button Clicked!")}
          />
          <LinkButton
            title="Link Button"
            startIcon={"refresh"}
            endIcon={"refresh"}
            onPress={() => alert("Button Clicked!")}
          />
          <IconButton
            icon={"refresh"}
            onPress={() => alert("Button Clicked!")}
          />
          <Input />
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Pallette;
