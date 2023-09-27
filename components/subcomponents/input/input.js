import { View, TextInput, Text } from "react-native";
import { useState } from "react";

const Input = ({ label, ...restProps }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={{ gap: 10 }}>
      {label && (
        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>{label}:</Text>
      )}
      <TextInput
        style={{
          backgroundColor: isFocused ? "#FFFFFF" : "rgba(204, 204, 204, 0.5)",
          padding: 20,
          borderWidth: 2,
          borderColor: "#44CCFF",
          borderRadius: 20,
          fontSize: 16,
          color: isFocused ? "#393644" : "#FFFFFF",
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
    </View>
  );
};

export default Input;
