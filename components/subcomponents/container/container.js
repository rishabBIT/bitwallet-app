import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const interpolate = require("color-interpolate");

const Container = ({ children }) => {
  const startColor = "#393644";
  const endColor = "#121212";

  const numColors = 10;

  const getStartColors = () => {
    const interpolator = interpolate([startColor, endColor]);
    const equidistantColors = Array.from({ length: numColors }, (_, index) => {
      const fraction = index / (numColors - 1); // Calculate the fraction
      return interpolator(fraction);
    });
    return equidistantColors;
  };
  const getEndColors = () => {
    const interpolator = interpolate([endColor, startColor]);
    const equidistantColors = Array.from({ length: numColors }, (_, index) => {
      const fraction = index / (numColors - 1); // Calculate the fraction
      return interpolator(fraction);
    });
    return equidistantColors;
  };

  return (
    <LinearGradient
      // colors={["#393644", "#262625", "#121212", "#262625", "#393644"]}
      colors={[...getStartColors(), ...getEndColors()]}
      start={[1, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default Container;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
