import { useState } from "react";
import ButtonGradient from "../button/ButtonGradeint";
import ButtonTemplate from "../button/ButtonTemplate";
import CustomInput from "./CustomInput";
import ConnectionIcons from "./contuct-us/ConnectionIcons";
import { EConType } from "types/enum/EGeneral";
import ConnectionInput from "./contuct-us/ConnectionInputs";
import { CustomCheckBox5 } from "./CustomCheckBox";
import CustomTextArea from "./CustomTextArea";

interface IProps {
  onClose: (initialValues: any, values: any) => any;
  onSubmit: (initialValues: any, values: any) => any;
  initialValues?: any;
}

export default function ContactUsForm({
  onClose,
  onSubmit,
  initialValues = {},
}: IProps) {
  const [connectionType, setConnectionType] = useState(EConType.WHATSAPP);
  const [moreInfo, setMoreInfo] = useState(false);
  const [state, setState] = useState<any>({});

  function handleChange(name: string) {
    return function (value: any) {
      setState((oldValue: any) => ({ ...state, [name]: value }));
    };
  }

  return (
    <div className="form-contact-us">
      {/* TITLE */}
      <div className="form-item">
        <h3>Let's get in touch</h3>
        {/* <h6 style={{opacity: .4}}>Choose form of connection</h6> */}
      </div>

      {/* CONNECTIONS RADIO */}
      <ConnectionIcons
        connectionType={connectionType}
        setConnectionType={setConnectionType}
        
      />

      <ConnectionInput
        connectionType={connectionType}
        state={state}
        handleChange={handleChange}
      />

      {/* INPUTS */}
      <CustomInput
        label="Your Name"
        placeholder="Alexander"
        value={state["name"]}
        onChange={handleChange("name")}
      />

      {/* CHECKBOX */}
      <CustomCheckBox5
        label="Want to add something?"
        classNameDiv="small"
        value={moreInfo}
        onChange={setMoreInfo}
        styleLabel={{ fontSize: "10px", letterSpacing: "2px" }}
      />

      {/* DESCRIPTION */}
      {moreInfo && (
        <CustomTextArea
          // type="textarea"
          label="Message"
          placeholder="Luxury car like Mercedes, BMW and Geneses..."
          value={state["description"]}
          onChange={handleChange("description")}
        />
      )}

      <div
        className="form-row"
        style={{ justifyContent: "space-between", marginTop: "12px" }}
      >
        <ButtonTemplate onClick={() => onClose(initialValues, state)}>Cancel</ButtonTemplate>

        <ButtonGradient onClick={() => onSubmit(initialValues, state)}>
          Submit
        </ButtonGradient>
      </div>
    </div>
  );
}
