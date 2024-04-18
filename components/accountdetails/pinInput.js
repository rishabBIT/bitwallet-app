import AsyncStorage from "@react-native-async-storage/async-storage";
import Pin from "../pin/keypad";
import { useState, useEffect } from "react";
import { View } from "react-native";
import i18n from "../../locales/i18n";

const PinInput = ({ setView }) => {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState("");

  const poppulatePin = async () => {
    AsyncStorage.getItem("pin")
      .then((res) => {
        setPin(res);
      })
      .catch((err) => console.log(err));
  };

  const submitPin = (e) => {
    setStatus("");
    if (e !== pin) {
      setStatus("Invalid Pin");
    } else setView(3);
  };

  useEffect(() => {
    poppulatePin();
  }, []);

  return <Pin title={i18n.t('enterPin')} subtitle={status} submit={submitPin} />;
};

export default PinInput;
