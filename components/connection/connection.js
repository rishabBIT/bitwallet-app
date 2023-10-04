import Container from "../subcomponents/container/container";
import { View } from "react-native";
import { PrimaryAccentText, PrimaryText } from "../subcomponents/text/text";
import { PrimaryButton, SecondaryButton } from "../subcomponents/button/button";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Loading } from "../subcomponents/loading/loadingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Connection = ({ navigation }) => {
  const route = useRoute();
  const { data } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    connectSocket();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  const connectSocket = async () => {
    const base_url = await AsyncStorage.getItem("ws-backend");
    const wsURL = base_url + data.channel_key + "/";
    const chatSocket = new WebSocket(wsURL);
    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data);
    };
    chatSocket.onclose = function (e) {
      setIsConnected(false);
      console.log("Chat socket closed unexpectedly");
    };
    chatSocket.onopen = function (e) {
      setSocket(chatSocket);
      setIsConnected(true);
    };
  };

  const acceptConnection = async () => {
    setIsLoading(true);
    const address = await AsyncStorage.getItem("publicKey");

    try {
      socket.send(
        JSON.stringify({
          message: "accept",
          accountId: address,
        })
      );
      setIsLoading(false);
      navigation.navigate("Home");
    } catch {
      navigation.navigate("Home");
      setIsLoading(false);
    }
  };
  const rejectConnection = async () => {
    setIsLoading(true);
    try {
      socket.send(
        JSON.stringify({
          message: "reject",
        })
      );
      setIsLoading(false);
      navigation.navigate("Home");
    } catch {
      navigation.navigate("Home");
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <View style={{ flex: 1, padding: 20, justifyContent: "space-around" }}>
        <PrimaryAccentText>Connection Request</PrimaryAccentText>
        <PrimaryText>{data.domain} wants to connect</PrimaryText>

        {isLoading || !isConnected ? (
          <Loading />
        ) : (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <PrimaryButton title="Connect" onPress={acceptConnection} />
            </View>
            <View style={{ flex: 1 }}>
              <SecondaryButton title="Decline" onPress={rejectConnection} />
            </View>
          </View>
        )}
        <PrimaryButton
          title="Cancel X"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </Container>
  );
};

export default Connection;
