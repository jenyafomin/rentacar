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

export default function CustomTextArea({
  label,
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
      <textarea
        className={`${className}`}
        style={style}
        value={value || ""}
        onChange={(e) => {
            // console.log("EVENT INPUT", e);
            const value = e.target.value;
            // console.log("EVENT value", value);
            onChange(value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
