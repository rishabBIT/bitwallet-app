import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "../../subcomponents/container";
import Icon from "../subcomponents/icon/icon";

const TokenDetails = ({ route, navigation }) => {
  const { tokenData } = route.params;

  return (
    <Container>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", left: 16 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon icon={"back"} width={50} height={50} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: tokenData.metadata.media }}
            style={styles.image}
          />
          <Text style={styles.title}>Token ID : {tokenData.token_id}</Text>
          <Text style={styles.description}>
            Title : {tokenData.metadata.title}
          </Text>
          <Text style={styles.description}>
            Description : {tokenData.metadata.description}
          </Text>
          <Text style={styles.description}>
            Owner ID : {tokenData.owner_id}
          </Text>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  appBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#D8DD00",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 8,
  },
});

export default TokenDetails;
