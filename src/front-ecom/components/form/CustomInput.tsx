import { CSSProperties, HTMLInputTypeAttribute } from "react";

interface IProps<T = string> {
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: T;
  onChange: (e: T) => any;

  className?: string;
  classNameLabel?: string;
  classNameDiv?: string;

  style?: Partial<CSSProperties>;
  styleLabel?: Partial<CSSProperties>;
  styleDiv?: Partial<CSSProperties>;
}

export default function CustomInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className,
  classNameLabel,
  classNameDiv,
  style,
  styleDiv,
  styleLabel,
}: IProps) {
  return (
    <div className={`form-item ${classNameDiv}`} style={styleDiv}>
      <label className={`${classNameLabel}`} style={styleLabel}>
        {label}
      </label>
      <input
        className={`${className}`}
        style={style}
        value={value || ""}
        onChange={(e) => {
            console.log("EVENT INPUT", e);
            const value = e.target.value;
            console.log("EVENT value", value);
            onChange(value);
        }}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
