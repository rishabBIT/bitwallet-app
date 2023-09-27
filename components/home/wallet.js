import { PrimaryAccentText, LargeAccentText } from "../subcomponents/text/text";
import { LinkButton, PrimaryButton } from "../subcomponents/button/button";
import { View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { getbalance } from "../subcomponents/api/nodeserver";

const Wallet = () => {
  const [address, setAddress] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");

  const poppulateAddress = async () => {
    const publicKey = await AsyncStorage.getItem("publicKey");
    const trimmedPublicKey = publicKey.slice(8);
    setAddress(trimmedPublicKey);
    const shortenedAddress =
      trimmedPublicKey.slice(0, 4) + "..." + trimmedPublicKey.slice(-4);
    setDisplayAddress(shortenedAddress);
  };

  const poppulateBalance = async () => {
    getbalance();
  };

  useEffect(() => {
    poppulateAddress();
    poppulateBalance();
  }, []);

  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", gap: 50, padding: 20 }}
    >
      <PrimaryAccentText>Account</PrimaryAccentText>
      <View>
        <LinkButton
          title={displayAddress}
          endIcon={"copy"}
          onPress={() => Clipboard.setStringAsync(address)}
        />
        <LargeAccentText>125.698 NEAR</LargeAccentText>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <PrimaryButton
            title="Send"
            endIcon={"send"}
            onPress={poppulateBalance}
          />
        </View>
        <View style={{ flex: 1 }}>
          <PrimaryButton title="Receive" endIcon={"receive"} />
        </View>
      </View>
      <View />
    </View>
  );
};

export default Wallet;
