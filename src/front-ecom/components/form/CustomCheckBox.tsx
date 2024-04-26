import { CSSProperties } from "react";

interface IProps {
    label: string;
    value: boolean;
    onChange: (newValue: boolean) => any;
    classNameDiv?: string;
    classNameInput?: string;
    classNameLabel?: string;
    styleDiv?: Partial<CSSProperties>;
    styleInput?: Partial<CSSProperties>;
    styleLabel?: Partial<CSSProperties>;
}

export function CustomCheckBox() {
  return (
    <div className="checkbox-wrapper-25">
      <input type="checkbox" />
    </div>
  );
}

export function CustomCheckBox56() {
  return (
    <div className="checkbox-wrapper-56">
      <label className="container">
        <input type="checkbox" />
        <div className="checkmark"></div>
      </label>
    </div>
  );
}

export function CustomCheckBox5({label, value, onChange, classNameDiv, styleDiv, classNameLabel, styleLabel}: IProps) {
  return (
    <div className={`checkbox-wrapper-5 ${classNameDiv}`} style={styleDiv} >
      <div className="check" onClick={() => {
        console.log("CLICK")
        onChange(!value)
        }}>
        <input id="check-5" type="checkbox" checked={value} />
        <label/>
      </div>
      <label className={`${classNameLabel}`} style={styleLabel}>{label}</label>
    </div>
  );
}
