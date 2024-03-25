import AwardsItem from "./AwardsItem";
import { getAwardsData } from "../../../configs/(ecom)/awards";

function Awards() {
  return (
    <div className="awards-inner mt-30">
      {getAwardsData().map((item, index) => (
        <AwardsItem data={item} key={index}  />
      ))}
    </div>
  );
}

export default Awards;
