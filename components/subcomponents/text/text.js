import { Text } from "react-native";

export const LargeAccentText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 40,
        color: "#3498DB",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
export const PrimaryAccentText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 24,
        color: "#3498DB",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
export const SecondaryAccentText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 20,
        color: "#FFD700",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
export const SuccessText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: "#00FF00",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
export const ErrorText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: "#FF0000",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
export const InfoText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: "#44CCFF",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
export const WarningText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: "#FFA500",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
export const PrimaryText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 16,
        color: "#FFFFFF",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
export const SecondaryText = ({ children, align }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: "#CCCCCC",
        textAlign: align ? align : "center",
      }}
    >
      {children}
    </Text>
  );
};
