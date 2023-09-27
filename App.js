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

const Stack = createNativeStackNavigator();

export default function App() {
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
