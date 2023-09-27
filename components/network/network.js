import { View } from "react-native";
import Container from "../subcomponents/container/container";
import { TouchableOpacity } from "react-native";
import { PrimaryAccentText } from "../subcomponents/text/text";
import Icon from "../subcomponents/icon/icon";

const Network = ({ navigation }) => {
  return (
    <Container>
      <View style={{ padding: 20, gap: 20 }}>
        <PrimaryAccentText>Select Network</PrimaryAccentText>
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#393644",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <PrimaryAccentText align={"left"}>Mainnet</PrimaryAccentText>
          <Icon icon={"check"} height={30} width={30} fill="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#393644",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <PrimaryAccentText align={"left"}>Testnet</PrimaryAccentText>
          <Icon icon={"check"} height={30} width={30} fill="#3498DB" />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Network;
