import Container from "../subcomponents/container/container";
import Navbar from "./navbar";
import Footer from "./footer";
import { View } from "react-native";
import Wallet from "./wallet";
import Certificate from "./certificate";
import Assets from "./assets";
import LoadingPage from "../subcomponents/loading/loadingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreatePin from "../pin/createPin";
import { useState, useEffect } from "react";

const Home = ({ navigation }) => {
  const [isLoading, setIsloading] = useState(true);
  const [status, setStatus] = useState(null);
  const [view, setView] = useState("wallet");

  useEffect(() => {
    setIsloading(true);
    const handleNavigation = navigation.addListener("focus", () => {
      checkStatus();
    });

    // return () => {
    //   handleNavigation.remove();
    // };
  }, [navigation]);

  const checkStatus = async () => {
    let status = { pin: false, phrase: false };
    // AsyncStorage.removeItem("pin");
    // AsyncStorage.removeItem("phrase");
    try {
      const pin = await AsyncStorage.getItem("pin");
      if (pin && pin !== null && pin !== "null" && pin.length === 4) {
        status.pin = true;
      }
      const phrase = await AsyncStorage.getItem("phrase");
      if (phrase && phrase !== null && phrase !== "null") {
        status.phrase = true;
      }
      setStatus(status);
      setIsloading(false);
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  if (isLoading || !status) return <LoadingPage />;

  if (!status.pin) {
    navigation.navigate("CreatePin");
    return null;
  }
  if (!status.phrase) {
    navigation.navigate("CreateorImport");
    return null;
  }

  return (
    <Container>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Navbar navigation={navigation} />

        {view === "wallet" && <Wallet />}
        {view === "certificate" && <Certificate />}
        {view === "assets" && <Assets />}

        <Footer view={view} setView={setView} />
      </View>
    </Container>
  );
};

export default Home;
