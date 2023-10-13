import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
} from "../subcomponents/text/text";
import Icon from "../subcomponents/icon/icon";
import { View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { getCertificates } from "../subcomponents/api/nodeserver";
import { PrimaryButton } from "../subcomponents/button/button";
import { Loading } from "../subcomponents/loading/loadingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Certificate = ({ navigation }) => {
  const [certificates, setCertificates] = useState(null);

  const poppulateCertificates = async () => {
    try {
      let certs = await AsyncStorage.getItem("certificates");
      setCertificates(JSON.parse(certs));
    } catch {
      console.log("no certs in storage");
    }
    try {
      const certs = await getCertificates();
      setCertificates(certs.data.certificates);
      AsyncStorage.setItem(
        "certificates",
        JSON.stringify(certs.data.certificates)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    poppulateCertificates();
  }, []);

  return (
    <ScrollView style={{ flex: 1, gap: 20, marginVertical: 20 }}>
      <PrimaryAccentText>Certificates</PrimaryAccentText>
      {!certificates && (
        <View
          style={{
            padding: 50,
          }}
        >
          <Loading />
        </View>
      )}
      {certificates && certificates.length === 0 && (
        <View style={{ padding: 20, flex: 1, gap: 20 }}>
          <PrimaryText>Your certificates will be shown here.</PrimaryText>
          <PrimaryText>
            Ask your university to send certificates to your wallet address
          </PrimaryText>
          <PrimaryButton
            title="Receive Certificates"
            endIcon={"receive"}
            onPress={() => navigation.navigate("Accountdetails")}
          />
        </View>
      )}
      {certificates &&
        certificates.length > 0 &&
        certificates.map((issuer, index) => (
          <CertificateTile
            issuer={issuer}
            key={issuer.name + index}
            navigation={navigation}
          />
        ))}
    </ScrollView>
  );
};

export default Certificate;

const CertificateTile = ({ issuer, navigation }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#393644",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <PrimaryText>
            {issuer.name.substring(0, 23)}
            {issuer.name.length > 23 && "..."}
          </PrimaryText>
          {issuer.is_verified && (
            <Icon icon="verified" width={20} height={20} />
          )}
        </View>
        <PrimaryText>{expanded ? "-" : "+"}</PrimaryText>
      </TouchableOpacity>
      {expanded && (
        <CertificateContainer issuer={issuer} navigation={navigation} />
      )}
    </View>
  );
};

const CertificateContainer = ({ issuer, navigation }) => {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {issuer.certificates.map((cert, index) => (
        <CertificateCard
          cert={cert}
          key={cert.cid + index}
          navigation={navigation}
          issuer={issuer}
        />
      ))}
    </View>
  );
};

const CertificateCard = ({ cert, navigation, issuer }) => {
  const blurhash =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjE9071LFZzNxjKM0BdvHD4s4xMZGw7QVZQ&usqp=CAU";

  return (
    <TouchableOpacity
      style={{
        width: 90,
        height: 115,
        backgroundColor: "#393644",
        borderRadius: 5,
      }}
      onPress={() =>
        navigation.navigate("Certificate", {
          certData: cert,
          issuerData: issuer,
        })
      }
    >
      <Image
        style={{
          width: 90,
          height: 67,
          backgroundColor: "#393644",
          borderRadius: 5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        source={cert.image ? cert.image : blurhash}
        contentFit="cover"
        transition={1000}
      />
      <View style={{ padding: 5 }}>
        <SecondaryText>
          {cert.name.substring(0, 15)}
          {cert.name.length > 15 && "..."}
        </SecondaryText>
      </View>
    </TouchableOpacity>
  );
};
