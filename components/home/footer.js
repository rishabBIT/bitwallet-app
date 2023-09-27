import { IconButton, SecondaryButton } from "../subcomponents/button/button";
import { View } from "react-native";
const Footer = ({ view, setView }) => {
  return (
    <View
      style={{
        backgroundColor: "#393644",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        icon={view === "wallet" ? "wallet_selected" : "wallet"}
        onPress={() => setView("wallet")}
      />
      <IconButton
        icon={view === "certificate" ? "certificate_selected" : "certificate"}
        onPress={() => setView("certificate")}
      />
      <IconButton
        icon={view === "assets" ? "token_selected" : "token"}
        onPress={() => setView("assets")}
      />
    </View>
  );
};

export default Footer;
