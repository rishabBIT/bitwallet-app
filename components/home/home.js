import Container from "../subcomponents/container/container";
import Navbar from "./navbar";
import Footer from "./footer";
import { View } from "react-native";
import Wallet from "./wallet";
import Certificate from "./certificate";
import Assets from "./assets";
import LoadingPage from "../subcomponents/loading/loadingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

    return handleNavigation;
  }, [navigation]);

  const checkStatus = async () => {
    setIsloading(true);
    let status = { pin: false, phrase: false };

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
      console.log(e);
      alert(JSON.stringify(e));
    }
  };

  if (isLoading) return <LoadingPage />;

  if (!status.pin) {
    navigation.navigate("CreatePin");
  }
  if (!status.phrase) {
    navigation.navigate("CreateorImport");
  }

  return (
    <Container>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Navbar navigation={navigation} />

        {view === "wallet" && <Wallet navigation={navigation} />}
        {view === "certificate" && <Certificate navigation={navigation} />}
        {view === "assets" && <Assets navigation={navigation} />}

        <Footer view={view} setView={setView} />
      </View>
    </Container>
  );
};

export default Home;
