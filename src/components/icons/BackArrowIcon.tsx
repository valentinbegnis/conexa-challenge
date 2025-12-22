import Svg, { Path } from 'react-native-svg';
import { IconProps } from "./types";

export const BackArrowIcon = ({ size = 24, color = '#111' }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill='none'
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="m12 19-7-7 7-7" />
    <Path d="M19 12H5" />
  </Svg>
);