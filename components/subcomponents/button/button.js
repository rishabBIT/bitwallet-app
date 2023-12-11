import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "../icon/icon";

export const PrimaryButton = ({ title, onPress, startIcon, endIcon }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#3498DB",
        borderRadius: 40,
        padding: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#3498DB",
      }}
      onPress={onPress}
    >
      {startIcon && (
        <Icon icon={startIcon} width={20} height={20} fill="#ffffff" />
      )}

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      {endIcon && <Icon icon={endIcon} width={20} height={20} fill="#ffffff" />}
    </TouchableOpacity>
  );
};
export const SecondaryButton = ({ title, onPress, startIcon, endIcon }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#CCCCCC",
        borderRadius: 40,
        padding: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#CCCCCC",
      }}
      onPress={onPress}
    >
      {startIcon && (
        <Icon icon={startIcon} width={20} height={20} fill="#393644" />
      )}

      <Text
        style={{
          color: "#393644",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      {endIcon && <Icon icon={endIcon} width={20} height={20} fill="#393644" />}
    </TouchableOpacity>
  );
};
export const TertiaryButton = ({ title, onPress, startIcon, endIcon }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "transparent",
        borderColor: "#44CCFF",
        borderWidth: 2,
        borderRadius: 40,
        padding: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      {startIcon && (
        <Icon icon={startIcon} width={20} height={20} fill="#ffffff" />
      )}

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      {endIcon && <Icon icon={endIcon} width={20} height={20} fill="#ffffff" />}
    </TouchableOpacity>
  );
};
export const LinkButton = ({ title, onPress, startIcon, endIcon }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "transparent",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      {startIcon && (
        <Icon icon={startIcon} width={20} height={20} fill="#FFD700" />
      )}

      <Text
        style={{
          color: "#FFD700",
          fontSize: 20,
        }}
      >
        {title}
      </Text>
      {endIcon && <Icon icon={endIcon} width={20} height={20} fill="#FFD700" />}
    </TouchableOpacity>
  );
};

export const IconButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "transparent",
        padding: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Icon icon={icon} width={48} height={48} fill="#ffffff" />
    </TouchableOpacity>
  );
};

export const KeypadButton = ({ number, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "transparent",
        borderColor: "#44CCFF",
        width: 80,
        height: 80,
        borderWidth: 2,
        borderRadius: 40,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 24,
        }}
      >
        {number}
      </Text>
    </TouchableOpacity>
  );
};
