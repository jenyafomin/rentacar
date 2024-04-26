import { ReactNode } from "react";
import Button from "../button/Button";
import ButtonGradient from "../button/ButtonGradeint";

interface IProps {
  children: ReactNode;
  open: boolean;
  setOpen: (newValue: boolean) => any;
  className?: string;
}

export default function DialogWrapperTBF({children, open, setOpen}: IProps) {
    return <div
    className="dialog-wrapper"
    style={{
      position: "fixed",
      display: open ? "flex": "none",
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      top: 0,
      left: 0,
      zIndex: 98,
    }}
  >
    <div className="dialog-overlay" style={{
        position: "absolute", 
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0003, #0009)",
        backdropFilter: "blur(8px)",
        zIndex: "-1"
        }}>overlay1overlay1overlay1</div>
    <div
      className="content-wrapper"
      style={{ maxWidth: "800px", minWidth: "400px", position: "relative" }}
    >
      <div
        className="neon-bg"
        style={{
          position: "absolute",
          left: "30%",
          top: "-6px",
          width: "40%",
          height: "20px",
          background: "cyan",
          borderRadius: "20px",
          zIndex: "-1",
        }}
      />
      <div
        className="dialog-content"
        style={{
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #fff2, #fff1)",
          border:"1px solid #fff3",
          borderRadius: "4px",
          backdropFilter: "blur(24px)",
        //   border: "1px solid #fff1",
        }}
      >
        <div
          className="dialog-title section-title"
          style={{ padding: "12px 24px", fontSize: "24px" }}
        >
          title
        </div>
        <div
          className="dialog-body"
          style={{
            padding: "12px 24px",
            borderTop: "1px solid #fff1",
            borderBottom: "1px solid #fff1",
          }}
        >
          {children}
        </div>
        <div className="dialog-footer" style={{ padding: "12px 24px", display: "flex", justifyContent: "space-between" }}>
            {/* <Button href="/" className="sm" style={{display: "flex", alignItems: "center", color: "#fffC"}} styleBorder={{borderColor: "#fffC", borderRadius: "4px"}}>Cancel</Button> */}
          {/* <ButtonGradient className="inActive">Cancel</ButtonGradient> */}
          <ButtonGradient onClick={() => {setOpen(false)}}>Ok</ButtonGradient>
        </div>
      </div>
    </div>
  </div>
}