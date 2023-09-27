import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
} from "../subcomponents/text/text";
import Icon from "../subcomponents/icon/icon";
import { View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";

const Certificate = () => {
  return (
    <ScrollView style={{ flex: 1, gap: 20, marginVertical: 20 }}>
      <PrimaryAccentText>Certificates</PrimaryAccentText>
      <CertificateTile />
      <CertificateTile />
      <CertificateTile />
    </ScrollView>
  );
};

export default Certificate;

const CertificateTile = () => {
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
          <PrimaryText>Beyond Imagination Technologies</PrimaryText>
          <Icon icon="verified" width={20} height={20} />
        </View>
        <PrimaryText>{expanded ? "-" : "+"}</PrimaryText>
      </TouchableOpacity>
      {expanded && <CertificateContainer />}
    </View>
  );
};

const CertificateContainer = () => {
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
      <CertificateCard />
      <CertificateCard />
      <CertificateCard />
      <CertificateCard />
    </View>
  );
};

const CertificateCard = () => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View
      style={{
        width: 90,
        height: 110,
        backgroundColor: "#393644",
        borderRadius: 5,
      }}
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
        source="https://4.imimg.com/data4/JE/XJ/MY-6362665/certificate.jpg"
        contentFit="cover"
        transition={1000}
      />
      <SecondaryText>Certificate of Appreciation</SecondaryText>
    </View>
  );
};
