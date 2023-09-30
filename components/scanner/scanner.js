import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Container from "../subcomponents/container/container";
import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
} from "../subcomponents/text/text";
import {
  LinkButton,
  PrimaryButton,
  SecondaryButton,
} from "../subcomponents/button/button";
import { Linking } from "react-native";
import { WebView } from "react-native-webview";

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (scanned)
    return (
      <ScannedPage
        setScanned={setScanned}
        navigation={navigation}
        data={data}
      />
    );

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <PrimaryAccentText>Bit-Scan</PrimaryAccentText>
        <SecondaryText>
          Scan QR-code to send Tokens, Verify Certificate, Connect a DAPP or
          Open a URL.
        </SecondaryText>
        <View
          style={{
            flex: 1,
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        <SecondaryButton
          title="Cancel X"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </Container>
  );
}

const ScannedPage = ({ navigation, data, setScanned }) => {
  const [isAddress, setIsAddress] = useState(false);
  const [isURL, setIsURL] = useState(false);
  const [isConnection, setIsConnection] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);

  useEffect(() => {
    checkAddress();
    checkIsConnection();
    checkIsURL();
    checkIsCertificate();
  }, []);

  const checkAddress = () => {
    try {
      const lastFiveChars = data.slice(-5);
      const lastEightChars = data.slice(-8);
      if (
        lastFiveChars === ".near" ||
        lastEightChars === ".testnet" ||
        lastEightChars === ".mainnet" ||
        data.length === 64
      )
        setIsAddress(true);
      else {
        setIsAddress(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkIsConnection = () => {
    try {
      if (data[0] + data[1] + data[2] === "wc:") setIsConnection(true);
      else setIsConnection(false);
    } catch (e) {
      console.log(e);
    }
  };

  const checkIsURL = () => {
    try {
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      if (urlPattern.test(data)) {
        setIsURL(true);
      } else {
        setIsURL(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkIsCertificate = () => {
    const startURL = "https://bitmemoirlatam.com";
    try {
      if (data.substring(0, startURL.length) === startURL) {
        setIsCertificate(true);
      } else {
        setIsCertificate(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: 70 }}>
          <LinkButton
            title="< Back"
            onPress={() => navigation.navigate("Home")}
          />
        </View>

        {isAddress && (
          <View style={{ gap: 20 }}>
            <PrimaryText>Account Id: {data}</PrimaryText>
            <PrimaryButton
              title="Send NEAR"
              endIcon={"send"}
              onPress={() =>
                navigation.navigate("SendTransaction", {
                  transactionData: { address: data },
                })
              }
            />
          </View>
        )}

        {isConnection && (
          <View style={{ gap: 20 }}>
            <PrimaryText>Connect with {data.slice(3)} ?</PrimaryText>
            <View style={{ gap: 10 }}>
              <PrimaryButton title="Connect" />
              <SecondaryButton title="Decline" />
            </View>
          </View>
        )}

        {isURL && (
          <View style={{ gap: 20 }}>
            <PrimaryText>URL : {data}</PrimaryText>
            <PrimaryButton
              title="Open URL"
              onPress={() => {
                Linking.openURL(data).catch((err) =>
                  console.log("Error opening URL: ", err)
                );
              }}
            />
          </View>
        )}

        {isCertificate && (
          <View
            style={{
              flex: 1,
              marginVertical: 10,
            }}
          >
            <WebView source={{ uri: data }} />
          </View>
        )}

        {/* <PrimaryButton title="Print Data" onPress={() => console.log(data)} /> */}

        <SecondaryButton
          title="Scan again"
          endIcon="qr"
          onPress={() => setScanned(false)}
        />
      </View>
    </Container>
  );
};
