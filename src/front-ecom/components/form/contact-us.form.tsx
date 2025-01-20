"use client"
import { useState } from "react";
import ButtonGradient from "../button/ButtonGradeint";
import ButtonTemplate from "../button/ButtonTemplate";
import CustomInput from "./CustomInput";
import ConnectionIcons from "./contuct-us/ConnectionIcons";
import { EConType } from "types/enum/ERequest";
import ConnectionInput from "./contuct-us/ConnectionInputs";
import { CustomCheckBox5 } from "./CustomCheckBox";
import CustomTextArea from "./CustomTextArea";
import { handleSubmitRequest } from "@/front-ecom/providers/handleSubmitRequest";

interface IProps {
  onClose?: (values: any) => any;
  onSubmit?: (values: any) => Promise<boolean>;
  initialValues?: any;
}

export default function ContactUsForm({
  onClose,
  onSubmit = handleSubmitRequest,
  initialValues = {},
}: IProps) {
  // const [connectionType, setConnectionType] = useState(EConType.WHATSAPP);
  const [moreInfo, setMoreInfo] = useState(false);
  const [state, setState] = useState<any>({connectionType: EConType.TELEGRAM, ...initialValues});
  const [success, setSuccess] = useState<boolean | null>(null);

  function handleChange(name: string) {
    return function (value: any) {
      setState((oldValue: any) => ({ ...state, [name]: value }));
    };
  }

  async function handleSubmit() {
    // console.log("SUBMIT REQUEST");
    const success = await onSubmit(state)
    console.log("REQUEST COMPLETED WITH", success);
    setSuccess(success)
    if(success && onClose) {
      setTimeout(() => {
        onClose(state);
      }, 3000)
    }
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
        connectionType={state.connectionType}
        setConnectionType={handleChange("connectionType")}
        
      />

      <ConnectionInput
        connectionType={state.connectionType}
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
        {onClose && <ButtonTemplate onClick={() => onClose(state)}>Cancel</ButtonTemplate>}

        <ButtonGradient onClick={handleSubmit}>
          Submit
        </ButtonGradient>
      </div>

      {success && <p>Successfully send request</p>}
    </div>
  );
}
