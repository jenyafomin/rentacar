"use client";
import { poppins } from "@/front/fonts";
import { CSSProperties, ReactNode } from "react";

interface IProps {
  className?: string;
  style?: Partial<CSSProperties>;
  onClick: () => any;
  children?: ReactNode;
}
export default function ButtonGradient({
  children,
  className,
  style,
  onClick = () => {},
}: IProps) {
  return (
    <button
      onClick={onClick}
      className={`btn-gradient ${poppins.className} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}

// export function ButtonIconGradient({
//   children,
//   className,
//   style,
//   onClick = () => {},
// }: IProps) {
//   return (
//     <button
//       onClick={onClick}
//       className={`btn-gradient ${poppins.className} ${className}`}
//       style={style}
//     >
//       {children}
//     </button>
//   );
// }
