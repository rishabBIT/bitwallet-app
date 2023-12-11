import { IconButton, SecondaryButton } from "../subcomponents/button/button";
import { View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = ({ navigation }) => {
  const [network, setNetwork] = useState("");

  const poppulateNetwork = async () => {
    const selectednetwork = await AsyncStorage.getItem("network");
    if (
      selectednetwork &&
      selectednetwork !== null &&
      selectednetwork !== "null"
    ) {
      setNetwork(JSON.parse(selectednetwork).networkName);
    } else {
      await AsyncStorage.setItem(
        "network",
        JSON.stringify({ networkType: "mainnet", networkName: "Mainnet" })
      );
      setNetwork("Mainnet");
    }
  };

  useEffect(() => {
    poppulateNetwork();
    const handleNavigation = navigation.addListener("focus", () => {
      poppulateNetwork();
    });
  }, [navigation]);

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
          title={network}
          endIcon={"downarrow"}
          onPress={() => navigation.navigate("Network")}
        />
      </View>
      <IconButton icon="qr" onPress={() => navigation.navigate("Scanner")} />
    </View>
  );
};

export default Navbar;
