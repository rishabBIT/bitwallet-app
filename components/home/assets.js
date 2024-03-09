import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  Modal,
  Linking,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
// import Snackbar from 'react-native-snackbar'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  importTokens,
  transferNFT,
  downloadNFT,
} from "../subcomponents/api/nodeserver";
import { PrimaryButton } from "../subcomponents/button/button";
import LoadingPage from "../subcomponents/loading/loadingPage";
import {
  PrimaryAccentText,
  PrimaryText,
  SecondaryText,
} from "../subcomponents/text/text";

import { ScrollView } from "react-native";
import Icon from "../subcomponents/icon/icon";
import * as MediaLibrary from "expo-media-library";

const { width } = Dimensions.get("window");

const Assets = () => {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const transferTokens = async (tokenId, contractId, receipient) => {
    try {
      const receipient =
        "a658422f81304f3ce227150a754cebd714c8a2c079a0b5f59b65e31b092ea938";

      setIsloading(true);
      const res = await transferNFT(tokenId, contractId, receipient);
      console.log(res);
      setIsloading(false);
    } catch (error) {
      console.log(`Error transferNFT : ${error}`);
      setIsloading(false);
    }
  };

  const fetchTokens = async () => {
    setIsloading(true);
    const nftData = JSON.parse(await AsyncStorage.getItem("nfts")) || [];

    const isExist = nftData.find((item) => item.token_id === inputValue);

    if (isExist) {
      ToastAndroid.show(
        "This NFT already exists in your wallet",
        ToastAndroid.SHORT,
      );
      // AsyncStorage.clear()
      // const nft = await transferNFT(inputValue)
      console.log(nft);

      setIsloading(false);
    } else {
      const publicKey = await AsyncStorage.getItem("publicKey");
      const selectednetwork = await AsyncStorage.getItem("network");
      const networkType = JSON.parse(selectednetwork).networkType;

      const res = await importTokens(inputValue);
      // console.log(res)

      if (!res.data || !res.data.tokens) {
        setIsloading(false);
        ToastAndroid.show("NFT doesn't exist.", ToastAndroid.SHORT);
      } else if (res.data.tokens.owner_id === publicKey) {
        res.data.tokens.network = networkType;
        res.data.tokens.contract_id = "vickyx.testnet";
        nftData.push(res.data.tokens);

        await AsyncStorage.setItem("nfts", JSON.stringify(nftData));
        // setTokens([res])
        setTokens([...tokens, res.data.tokens]);

        console.log("====================================");
        console.log(tokens);
        console.log("====================================");

        setIsloading(false);
      } else {
        setIsloading(false);
        ToastAndroid.show(
          "NFT doesn't belong to this account.",
          ToastAndroid.SHORT,
        );
      }
    }
  };

  useEffect(() => {
    fetchTokensFromStorage();
  }, []);

  const fetchTokensFromStorage = async () => {
    // setIsloading(true)
    let nftData = (await AsyncStorage.getItem("nfts")) || [];
    setTokens(JSON.parse(nftData));
    setIsloading(false);
  };

  async function downloadImage(uri) {
    try {
      const downloadedFile = await FileSystem.downloadAsync(
        uri,
        FileSystem.documentDirectory + "nft.gif",
      );

      const permission = await MediaLibrary.requestPermissionsAsync();
      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      const album = await MediaLibrary.getAlbumAsync("Nft");
      alert("Image is saved in your photo gallery.");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Nft", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (e) {
      Linking.openURL(uri);
    }
  }

  const downloadNFTImage = async (uri) => {
    try {
      const res = await downloadNFT(uri);
      console.log(res);
    } catch (e) {
      console.log(e);
      Linking.openURL(uri);
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <ScrollView style={{ flex: 1, gap: 20, marginVertical: 20 }}>
      <PrimaryAccentText>Tokens</PrimaryAccentText>
      {tokens.length === 0 && (
        <View
          style={{
            padding: 50,
          }}
        >
          {/* <LoadingPage /> */}
          <PrimaryText>Your tokens will be shown here.</PrimaryText>
          <PrimaryText>
            Ask your university to send tokens to your wallet address
          </PrimaryText>
        </View>
      )}

      {tokens.length > 0 &&
        tokens.map((item, index) => (
          <TokenTile
            token={item}
            transferTokens={transferTokens}
            downloadImage={downloadNFTImage}
          />
        ))}
      <View style={{ padding: 50, flex: 1, gap: 20 }}>
        <ModalSheet
          isModalVisible={isModalVisible}
          toggleModalVisibility={toggleModalVisibility}
          setInputValue={setInputValue}
          inputValue={inputValue}
          fetchTokens={fetchTokens}
        />
        <PrimaryButton
          title="Import tokens"
          endIcon={"receive"}
          onPress={toggleModalVisibility}
        />
      </View>
    </ScrollView>
  );
};

const TokenTile = ({ token, transferTokens, downloadImage }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#393644",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            source={{ uri: token.metadata.media }}
          />
          <PrimaryText>
            {token.metadata.title.substring(0, 23)}
            {token.metadata.title.length > 23 && "..."}
          </PrimaryText>
        </View>
        <TouchableOpacity
          onPress={async () => {
            // await transferTokens(token.token_id, token.contract_id, "");
            await downloadImage(token.metadata.media);
            // console.log(token.metadata);
          }}
        >
          <Icon icon={"send"} width={20} height={20} fill="#FFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const TokenContainer = ({ token }) => {
  return (
    console.log(token),
    (
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
        {token.map((item, index) => (
          <TokenCard
            token={item}
            key={index}
            // navigation={navigation}
            // issuer={issuer}
          />
        ))}
      </View>
    )
  );
};

const TokenCard = ({ token }) => {
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
      onPress={() => {
        console.log("Token Card");
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
        source={token.metadata.media ? token.metadata.media : blurhash}
        contentFit="cover"
        transition={1000}
      />
      <View style={{ padding: 5 }}>
        <SecondaryText>
          {token.metadata.title.substring(0, 15)}
          {token.metadata.title.length > 15 && "..."}
        </SecondaryText>
      </View>
    </TouchableOpacity>
  );
};

const ModalSheet = ({
  isModalVisible,
  toggleModalVisibility,
  setInputValue,
  inputValue,
  fetchTokens,
}) => {
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              elevation: 5,
              transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
              height: 180,
              width: width * 0.8,
              backgroundColor: "#fff",
              borderRadius: 7,
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
              }}
              onPress={toggleModalVisibility}
            >
              <Image
                source={require("../../assets/close.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>

            <TextInput
              placeholder="Enter Token Id"
              value={inputValue}
              inputMode="numeric"
              style={{
                width: "80%",
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={(value) => setInputValue(value)}
            />

            <Button
              title="Submit"
              onPress={async () => {
                if (inputValue.length !== 0) {
                  toggleModalVisibility();
                  await fetchTokens();
                } else {
                  ToastAndroid.show(
                    "Token Id cannot be empty",
                    ToastAndroid.SHORT,
                  );
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default Assets;
