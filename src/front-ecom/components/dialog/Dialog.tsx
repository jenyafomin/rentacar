import { ReactNode } from "react"

interface IProps {
  children: ReactNode;
  open: boolean;
  setOpen: (newValue: boolean) => any;
  className?: string;
}
export default function DialogWrapper({children, open, setOpen, className}: IProps) {
    return <div className={`dialog-wrapper ${className}`}>
    <div className="dialog-overlay" />
    <div className="dialog-content-wrapper">
      <div className="neon-bg"/>
      <div className="dialog-content">
        <a className="close-btn background-section" onClick={()=> {
          setOpen(false)
        }}/>
        <div className="dialog-body ">
          {children}
        </div>
      </div>
    </div>
  </div>
}