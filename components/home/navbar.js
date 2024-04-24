import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { changeLocale } from "../../locales/i18n";
import { IconButton, SecondaryButton } from "../subcomponents/button/button";
import Icon from "../subcomponents/icon/icon";

const Navbar = ({ navigation, currentPage }) => {
  const [network, setNetwork] = useState("");
  const [isMenu, setIsMenu] = useState(false);

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
  }, [currentPage]);

  return (
    <View
      style={{
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        height={30}
        width={30}
        icon="menu"
        onPress={() => navigation.navigate("Menu")}
      />
      <View style={{ flex: 1 }}>
        <SecondaryButton
          title={network}
          endIcon={"downarrow"}
          onPress={() => navigation.navigate("Network")}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsMenu(!isMenu);
        }}
      >
        <View style={{ paddingLeft: 10 }}>
          <Icon height={40} width={40} icon="globe" />
        </View>
      </TouchableOpacity>

      <View
        style={{
          height: isMenu ? 80 : 0,
          backgroundColor: "#FFFFFF",
          position: "absolute",
          right: 0,
          top: 94,
          zIndex: 9999,
          alignItems: "center",
          marginRight: 20,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            changeLocale("en");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMenu && <Icon icon={"englishUs"} height={20} width={18} />}
            <Text style={styles.text}>English</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            changeLocale("es");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMenu && <Icon icon={"spanish"} height={20} width={18} />}
            <Text style={styles.text}>Spanish</Text>
          </View>
        </TouchableOpacity>
      </View>
      <IconButton icon="qr" onPress={() => navigation.navigate("Scanner")} />
    </View>
  );
};

const styles = {
  text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCCCCC",
  },
};
export default Navbar;
