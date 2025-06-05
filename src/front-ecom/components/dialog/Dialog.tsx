import { ReactNode, useEffect } from "react"

interface IProps {
  children: ReactNode;
  open: boolean;
  setOpen: (newValue: boolean) => any;
  className?: string;
}
export default function DialogWrapper({children, open, setOpen, className}: IProps) {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "scroll"
    };
  }, [])
    return <div className={`dialog-wrapper ${className}`}>
    <div className="dialog-overlay" />
    <div className="dialog-content-wrapper">
      <div className="neon-bg"/>
      <div className="dialog-content">
        <a style={{zIndex: 10}} className="close-btn background-section" onClick={()=> {
          setOpen(false)
        }}/>
        <div className="dialog-body ">
          {children}
        </div>
      </div>
    </div>
  </div>
}