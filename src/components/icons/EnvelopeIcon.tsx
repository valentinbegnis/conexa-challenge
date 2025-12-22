import { colors } from '@/theme/colors';
import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from "./types";

export const EnvelopeIcon = ({ size = 24, color = colors.textPrimary }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Rect width={20} height={16} x={2} y={4} rx={2} />
    <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Svg>
);
