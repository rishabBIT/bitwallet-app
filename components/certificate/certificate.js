import { View, Text } from "react-native";
import Container from "../subcomponents/container/container";
import { LinkButton, PrimaryButton } from "../subcomponents/button/button";
import {
  ErrorText,
  InfoText,
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
  SuccessText,
} from "../subcomponents/text/text";
import { useRoute } from "@react-navigation/native";
import Icon from "../subcomponents/icon/icon";
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Linking } from "react-native";

const Certificate = ({ navigation }) => {
  const route = useRoute();
  const { certData, issuerData } = route.params;

  async function downloadImage(uri) {
    try {
      const downloadedFile = await FileSystem.downloadAsync(
        uri,
        FileSystem.documentDirectory + "certificate.png"
      );

      const permission = await MediaLibrary.requestPermissionsAsync();
      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      const album = await MediaLibrary.getAlbumAsync("Certificates");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Certificates", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (e) {
      Linking.openURL(uri);
    }
  }

  const blurhash =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjE9071LFZzNxjKM0BdvHD4s4xMZGw7QVZQ&usqp=CAU";

  return (
    <Container>
      <View style={{ flex: 1, padding: 20, gap: 20 }}>
        <View style={{ width: 80 }}>
          <LinkButton
            title="< Back"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <PrimaryAccentText>{certData?.name}</PrimaryAccentText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!issuerData.is_verified ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#00FF00", fontSize: 24 }}>Verified</Text>
              <Icon icon="verified" width={20} height={20} />
            </View>
          ) : (
            <ErrorText>Not Verified</ErrorText>
          )}
          <LinkButton title="Delete" endIcon={"delete"} />
        </View>
        <Image
          style={{
            flex: 1,
            backgroundColor: "#393644",
            borderRadius: 10,
          }}
          source={certData.image ? certData.image : blurhash}
          contentFit="contain"
          transition={1000}
        />
        <View
          style={{ backgroundColor: "#393644", padding: 10, borderRadius: 10 }}
        >
          <InfoText align={"left"}>Certificate ID:</InfoText>
          <SecondaryText align={"left"}>{certData.id}</SecondaryText>
          <InfoText align={"left"}>CID:</InfoText>
          <SecondaryText align={"left"}>{certData.cid}</SecondaryText>
        </View>
        <View
          style={{ backgroundColor: "#393644", padding: 10, borderRadius: 10 }}
        >
          <InfoText align={"left"}>Issued By:</InfoText>
          <PrimaryText align={"left"}>{issuerData.name}</PrimaryText>
          <SecondaryText align={"left"}>{issuerData.address}</SecondaryText>
          <SecondaryText align={"left"}>{issuerData.website}</SecondaryText>
          <SecondaryText align={"left"}>{issuerData.wallet}</SecondaryText>
        </View>
        <PrimaryButton
          title="Download"
          endIcon={"download"}
          onPress={() => downloadImage(certData.image)}
        />
      </View>
    </Container>
  );
};

export default Certificate;
