import { View, Text } from "react-native";
import Container from "../subcomponents/container/container";
import { PrimaryAccentText, SecondaryText } from "../subcomponents/text/text";
import { KeypadButton } from "../subcomponents/button/button";
import { useState } from "react";

const Pin = ({ submit, title, subtitle }) => {
  const [enteredPin, setEnteredPin] = useState("");
  const [displayPin, setDisplayPin] = useState("");

  const handlePress = (e) => {
    if (enteredPin.length === 3) {
      submit(enteredPin + e);
      setDisplayPin("");
      setEnteredPin("");
    } else {
      setEnteredPin((prev) => prev + e);
      setDisplayPin((prev) => prev + "*");
    }
  };

  return (
    <Container>
      <View
        style={{
          padding: 20,
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <PrimaryAccentText>{title}</PrimaryAccentText>
        <SecondaryText>{subtitle}</SecondaryText>
        <View style={{ marginVertical: 40 }}>
          <PrimaryAccentText>{displayPin}</PrimaryAccentText>
        </View>
        <Keypad handlePress={handlePress} />
      </View>
    </Container>
  );
};

export default Pin;

const Keypad = ({ handlePress }) => (
  <View style={{ width: "100%", gap: 20 }}>
    <KeypadRow numbers={[1, 2, 3]} handlePress={handlePress} />
    <KeypadRow numbers={[4, 5, 6]} handlePress={handlePress} />
    <KeypadRow numbers={[7, 8, 9]} handlePress={handlePress} />
    <KeypadRow numbers={[0]} handlePress={handlePress} />
  </View>
);

const KeypadRow = ({ numbers, handlePress }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: numbers.length > 1 ? "space-between" : "center",
        alignItems: "center",
        gap: 20,
        width: "100%",
        maxWidth: "320",
      }}
    >
      {numbers.map((num, index) => (
        <KeypadButton
          number={num}
          key={"keypad-" + num + index}
          onPress={() => handlePress(num.toString())}
        />
      ))}
    </View>
  );
};
