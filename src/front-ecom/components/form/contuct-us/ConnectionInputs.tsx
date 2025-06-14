import { EConType, EConTypeId } from "types/enum/ERequest";
import CustomInput from "../CustomInput";
import { CSSProperties } from "react";

interface IProps {
    connectionType: EConType;
    state: any;
    handleChange: (name: string) => (value: any) => any;
    style?: Partial<CSSProperties>;
}
export default function ConnectionInput({connectionType, state, handleChange, style}: IProps) {
    // return useMemo(() => {
      let label: string = "";
      let placeholder: string = "";
      let name: string = EConTypeId[connectionType] || "";

      switch (connectionType) {
        case EConType.TELEGRAM:
          label = "Telegram username";
          placeholder = "@GreenAgeAuto";
          break;
        case EConType.WHATSAPP:
          label = "WhatsApp phone number";
          placeholder = "+971 55 3344 969";
          break;
        case EConType.EMAIL:
          label = "Your email address";
          placeholder = "gogreenage@gmail.com";
          break;
        case EConType.PHONE:
          label = "Your phone number";
          placeholder = "+971 55 3344 969";
          break;
        default:
          label = "";
          placeholder = "";
          break;
      }

      if (label && name) {
        return (
            <CustomInput 
              label={label} 
              placeholder={placeholder} 
              value={state[name] || ""} 
              onChange={handleChange(name)}
              style={style}
            />
        );
      }
      return <></>;
    // }, [connectionType]);
  }