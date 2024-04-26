import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import ButtonGradient from "./ButtonGradeint";
import { IconDefinition, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { CSSProperties } from "react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface IProps {
    className?: string;
    style?: Partial<CSSProperties>;
    onClick: () => any;
    icon: IconDefinition;
    iconProps?: FontAwesomeIconProps | {};
    rounded?: boolean;
    size?: string;
    iconSize?: SizeProp;
}

export default function ButtonGradientIcon({
  className,
  style,
  onClick,
  icon = faTelegram,
  iconProps = {},
  rounded = false,
  size="40px",
  iconSize="xl",
}: IProps) {
  return (
    <ButtonGradient
      className={`${rounded && "rounded"} ${className}`}
      style={{ padding: "0", width: size, height: size, ...style }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size={iconSize} {...iconProps} />
      {/* Hello */}
    </ButtonGradient>
  );
}
