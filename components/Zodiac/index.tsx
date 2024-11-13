import { getZodiac } from "@/utils";
import { UserInfo } from "@/utils/api/user/info";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";

interface ZodiacProps extends React.SVGProps<SVGSVGElement> {
  date: NonNullable<UserInfo['anniversary']>;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  size?: number | string;
}

export function Zodiac(props:ZodiacProps) {
  const Icon = getZodiac(props.date.d, props.date.m)!;

  const size = props.size ?? 36;
  const fill = props.fill ?? colors.tertiary;
  const stroke = props.stroke ?? colors.none;
  const strokeWidth = props.strokeWidth ?? 0;

  return (
    <Icon
      width={size}
      height={size}
      {...props as React.SVGProps<SVGSVGElement>}
      style={{ fill, stroke, strokeWidth, ...props.style }}
      className={`${styles.icon} ${props.className}`}
    />
  )
}
