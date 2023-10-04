import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/home/home";
import Menu from "./components/menu/menu";
import Network from "./components/network/network";
import CreatePin from "./components/pin/createPin";
import CreateorImport from "./components/account/createorimport";
import CreateAccount from "./components/account/createAccount/createAccount";
import ImportAccount from "./components/account/importAccount/importAccount";
import Accountdetails from "./components/accountdetails/accountdetails";
import ResetAccount from "./components/resetAccount/resetAccount";
import SendTransaction from "./components/sendTransaction/sendTransaction";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPage from "./components/subcomponents/loading/loadingPage";
import Pin from "./components/pin/keypad";
import Scanner from "./components/scanner/scanner";
import Certificate from "./components/certificate/certificate";
import NoInternet from "./components/noInternet/noInternet";
import { updateURLs } from "./components/subcomponents/api/nodeserver";
import useNotifications from "./components/notifications/notifications";
import Connection from "./components/connection/connection";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isPinRequired, setIsPinRequired] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [status, setStatus] = useState("");
  const [storedPin, setStoredPin] = useState("");
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    checkStatus();
    checkConnection();
  }, []);

  const checkStatus = async () => {
    setIsloading(true);
    const pin = await AsyncStorage.getItem("pin");
    if (pin && pin !== null && pin !== "null" && pin.length === 4) {
      setIsPinRequired(true);
      setStoredPin(pin);
    }
    setIsloading(false);
  };

  const checkConnection = async () => {
    setIsloading(true);
    const isInternet = await updateURLs();
    if (isInternet) setIsConnected(true);
    else setIsConnected(false);
    setIsloading(false);
  };

  const enterPin = (e) => {
    if (storedPin !== e) setStatus("Invalid Pin");
    else setIsPinRequired(false);
  };

  if (isLoading) return <LoadingPage />;

  if (isPinRequired)
    return <Pin title="Enter Pin" subtitle={status} submit={enterPin} />;

  if (!isConnected) return <NoInternet retry={checkConnection} />;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name="Network"
            component={Network}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="CreatePin"
            component={CreatePin}
            options={{
              headerShown: false,
              presentation: "modal",
              // animationTypeForReplace: "push",
              // animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="CreateorImport"
            component={CreateorImport}
            options={{
              headerShown: false,
              presentation: "modal",
              // animationTypeForReplace: "push",
              // animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="ImportAccount"
            component={ImportAccount}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="Accountdetails"
            component={Accountdetails}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name="ResetAccount"
            component={ResetAccount}
            options={{
              headerShown: false,
              presentation: "modal",
              // animationTypeForReplace: "push",
              // animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name="SendTransaction"
            component={SendTransaction}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="Certificate"
            component={Certificate}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="Connection"
            component={Connection}
            options={{
              headerShown: false,
              presentation: "modal",
              // animationTypeForReplace: "push",
              // animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
