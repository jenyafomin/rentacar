import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import DialogCloseButton from "./DialogCloseButton";

interface IProps {
  children?: any;
  title: string;
  description?: any;
  setOpen: (newValue: boolean) => any;
  open: boolean;
  handleClose?: () => any;
}
export default function DialogWrapper({
  children,
  title,
  description,
  setOpen,
  open,
  handleClose=()=>setOpen(false),
}: IProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      scroll="body"
      PaperProps={{style: {backdropFilter: "blur(8px)", background: "var(--background-gradient)"}}}
      TransitionProps={{style: {background: "#0006", backdropFilter: "blur(8px)"}}}
      
      
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle
        variant="h4"
        className="flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16"
      >
        {title}
        {description && (
          <Typography component="span" className="flex flex-col text-center">
            {description}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent className="pbs-0 sm:pli-16 sm:pbe-16">
        {children}
      </DialogContent>
    </Dialog>
  );
}
