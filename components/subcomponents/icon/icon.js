import { SvgXml } from "react-native-svg";
import icons from "./icons";

const Icon = ({ icon, width, height, fill }) => {
  let source = icons[icon]["xml"];
  if (fill && icons[icon]["isEditable"]) {
    source = source.replace(/fill="(.*?)"/g, `fill="${fill}"`);
  }
  return <SvgXml xml={source} width={width} height={height} />;
};

export default Icon;
