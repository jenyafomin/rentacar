import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { EConType } from "types/enum/ERequest";
import ButtonGradientIcon from "../../button/ButtonGradientIcon";

const iconsConnection: {
  icon: IconDefinition;
  name: EConType;
  size?: SizeProp;
}[] = [
  { icon: faPhone, name: EConType.PHONE, size: "lg" },
  { icon: faTelegram, name: EConType.TELEGRAM },
  { icon: faWhatsapp, name: EConType.WHATSAPP },
  { icon: faEnvelope, name: EConType.EMAIL, size: "lg" },
];

export default function ConnectionIcons({
  connectionType,
  setConnectionType,
}: {
  connectionType: EConType;
  setConnectionType: (newValue: any) => any;

}) {
  function isActive(type: EConType) {
    if (connectionType === type) {
      return "";
    }
    return "inActive";
  }

  function AllIcons() {
    return iconsConnection.map((item, index) => (
      <ButtonGradientIcon
        key={index}
        className={`rounded ${isActive(item.name)}`}
        onClick={() => setConnectionType(item.name)}
        icon={item.icon}
        iconSize={item.size}
      />
    ));
  }

  return (
    <div className="form-item">
      {/* <h6 style={{opacity: .8, marginBottom: "6px", letterSpacing: "1px"}}>Choose connection type:</h6> */}
      {/* <label>Some Text</label> */}
      <label>How you want to communicate?</label>
      <div
        className="form-row"
        style={{ justifyContent: "flex-start", alignItems: "center", marginTop: "4px" }}
      >
        {AllIcons()}
        <span
          style={{ letterSpacing: "2px", fontWeight: 900, marginLeft: "8px" }}
        >
          {connectionType.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
