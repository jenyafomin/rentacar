import { CSSProperties } from "react";
import { ICar } from "types/Car";

export default function CarsHeaderList({ cars }: { cars: ICar[] }) {
  const styleBtn: Partial<CSSProperties> = {
    // height: "100%",
    background: "#fff1",
    border: "1px solid #fff3",
    borderRadius: "4px",
    textAlign: "center",
    alignContent: "center",
    padding: "0 8px",
    alignSelf: "stretch",
  };

  return (
    <div
      className="cars-list-header"
      style={{
        // background: "red",
        display: "flex",
        justifyContent: "space-between",
        // margin: "0 2%", // 3 column
        margin: "0 5%", // 2 column
        alignItems: "flex-end",
        // margin: "0 7.5%", // 1 column
      }}
    >
      {/* LEFT SIDE */}
      <div>
        Total cars:
        <strong style={{ marginLeft: "8px", color: "#fff" }}>
          {cars.length}
        </strong>
      </div>

      {/* RIGHT SIDE */}
      {/* <div
        style={{
          display: "flex",
          gap: "4px",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            padding: "4px 12px",
            border: "1px solid #fff3",
            borderRadius: "4px",
            background: "#fff1",
            width: "35%",
            minWidth: "120px",
            marginRight: "8px",
          }}
        >
          search...
        </div>
        <div style={styleBtn}>btn1</div>
        <div style={styleBtn}>btn2</div>
        <div style={styleBtn}>btn3</div>
      </div> */}
    </div>
  );
}
