import { IconButton, SecondaryButton } from "../subcomponents/button/button";
import { View } from "react-native";
const Navbar = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#393644",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton icon="menu" onPress={() => navigation.navigate("Menu")} />
      <View style={{ flex: 1 }}>
        <SecondaryButton
          title="Mainnet"
          endIcon={"downarrow"}
          onPress={() => navigation.navigate("Network")}
        />
      </View>
      <IconButton icon="qr" />
    </View>
  );
};

export default Navbar;
