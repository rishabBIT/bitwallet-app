import Pin from "./keypad";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatePin = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");

  handleSubmit = async (e) => {
    if (step === 1) {
      setPin(e);
      setStep(2);
    } else {
      if (pin !== e) {
        alert("Pin did not match.");
        setPin("");
        setStep(1);
      } else {
        try {
          await AsyncStorage.setItem("pin", pin);
          navigation.navigate("Home");
        } catch (e) {
          alert(JSON.stringify(e));
        }
      }
    }
  };

  if (step === 1) {
    return (
      <Pin
        submit={handleSubmit}
        title="Create Pin"
        subtitle="4-digit numeric pin"
      />
    );
  } else {
    return (
      <Pin
        submit={handleSubmit}
        title="Confirm Pin"
        subtitle="Enter Pin Again"
      />
    );
  }
};

export default CreatePin;
