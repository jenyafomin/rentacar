import AwardsItem from "./AwardsItem";
import { getAwardsData } from "../../../back/data/awards";

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
