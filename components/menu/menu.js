import { View } from "react-native";
import Container from "../subcomponents/container/container";
import { LinkButton } from "../subcomponents/button/button";
import { TouchableOpacity } from "react-native";
import { PrimaryAccentText } from "../subcomponents/text/text";
import Icon from "../subcomponents/icon/icon";

const Menu = ({ navigation }) => {
  return (
    <Container>
      <View style={{ padding: 20, gap: 20 }}>
        <View style={{ width: 80 }}>
          <LinkButton
            title="< Back"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#393644",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={() => navigation.navigate("Accountdetails")}
        >
          <PrimaryAccentText align={"left"}>Account Details</PrimaryAccentText>
          <Icon icon={"account"} height={30} width={30} fill="#3498DB" />
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
          onPress={() => navigation.navigate("ResetAccount")}
        >
          <PrimaryAccentText align={"left"}>Reset Account</PrimaryAccentText>
          <Icon icon={"refresh"} height={30} width={30} fill="#3498DB" />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Menu;
