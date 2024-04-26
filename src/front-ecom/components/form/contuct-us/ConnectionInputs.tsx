import { EConType } from "types/enum/EGeneral";
import CustomInput from "../CustomInput";

interface IProps {
    connectionType: EConType;
    state: any;
    handleChange: (name: string) => (value: any) => any
}
export default function ConnectionInput({connectionType, state, handleChange}: IProps) {
    // return useMemo(() => {
      let label: string = "";
      let placeholder: string = "";
      let name: string = "";

      switch (connectionType) {
        case EConType.TELEGRAM:
          label = "Telegram ID";
          placeholder = "@GreenAgeAuto";
          name = "telegramId";
          break;
        case EConType.WHATSAPP:
          label = "WhatsApp phone number";
          placeholder = "+971 55 3344 969";
          name = "whatsappId";
          break;
        case EConType.MAIL:
          label = "Your email address";
          placeholder = "gogreenage@gmail.com";
          name = "email";
          break;
        case EConType.PHONE:
          label = "Your phone number";
          placeholder = "+971 55 3344 969";
          name = "phone";
          break;
        default:
          label = "";
          placeholder = "";
          name = "";
          break;
      }

      if (label && name) {
        return (
            <CustomInput label={label} placeholder={placeholder} value={state[name] || ""} onChange={handleChange(name)} />
        );
      }
      return <></>;
    // }, [connectionType]);
  }