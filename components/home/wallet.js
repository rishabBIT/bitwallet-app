import { PrimaryAccentText, LargeAccentText } from "../subcomponents/text/text";
import {
  LinkButton,
  PrimaryButton,
  TertiaryButton,
} from "../subcomponents/button/button";
import { View, Share } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import { getbalance } from "../subcomponents/api/nodeserver";
import useNotifications from "../notifications/notifications";

const Wallet = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [displaybalance, setDisplayBalance] = useState("0.00");
  const { notification, expoPushToken, registerForPushNotificationsAsync } =
    useNotifications(navigation);

  const poppulateAddress = async () => {
    try {
      const publicKey = await AsyncStorage.getItem("publicKey");
      const trimmedPublicKey = publicKey;
      setAddress(trimmedPublicKey);
      const shortenedAddress =
        trimmedPublicKey.slice(0, 4) + "..." + trimmedPublicKey.slice(-4) + " ";
      setDisplayAddress(shortenedAddress);
    } catch (e) {
      console.log(e);
    }
  };

  const poppulateBalance = async () => {
    getbalance()
      .then((res) => {
        if (res.status === "success") {
          const newBalance = parseFloat(res.data.balance);
          setBalance(newBalance);
          const roundedbalance = newBalance.toFixed(2);
          setDisplayBalance(roundedbalance);
        }
      })
      .catch((err) => console.log(err));
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

      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LinkButton
          title={displayAddress}
          endIcon={"copy"}
          onPress={() => Clipboard.setStringAsync(address)}
        />

        <LinkButton
          title=""
          endIcon={"share"}
          onPress={() => Share.share({ message: address })}
        />
      </View>
      <LargeAccentText>{displaybalance} NEAR</LargeAccentText>
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
            onPress={() => navigation.navigate("SendTransaction")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <PrimaryButton
            title="Receive"
            endIcon={"receive"}
            onPress={() => navigation.navigate("Accountdetails")}
          />
        </View>
      </View>
      <View />
    </View>
  );
};

export default Wallet;
