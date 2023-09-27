import { PrimaryAccentText, LargeAccentText } from "../subcomponents/text/text";
import { LinkButton, PrimaryButton } from "../subcomponents/button/button";
import { View } from "react-native";

const Assets = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", gap: 50, padding: 20 }}
    >
      <PrimaryAccentText>Assets</PrimaryAccentText>

      <View
        style={{
          flexDirection: "row",
          gap: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <PrimaryButton title="Import Tokens" />
        </View>
      </View>
      <View />
    </View>
  );
};

export default Assets;
