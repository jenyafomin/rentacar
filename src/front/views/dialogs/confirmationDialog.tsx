import PrimaryButton from "@/front/components/buttons/primaryButton";
import DialogWrapper from "@/front/components/dialogs/DialogWrapper";
import { EColorsStyle } from "types/enum/EGeneral";

interface Props {
  open: boolean;
  setOpen: (newValue: boolean) => any;
  title: any;
  description: any;
  onConfirm: () => any;
  color: EColorsStyle;
}
export default function ConfirmationDialog({
  open,
  setOpen,
  title,
  description,
  onConfirm,
  color = EColorsStyle.INFO,
}: Props) {
  return (
    <DialogWrapper
      title={title}
      description={description}
      open={open}
      setOpen={setOpen}
    >
      <div className="flex gap-16 justify-center">
        <PrimaryButton
          text="Cancel"
          variant="outlined"
          color="secondary"
          onClick={() => setOpen(false)}
        />
        <PrimaryButton text="Confirm" color={color} onClick={() => {
            onConfirm()
            setOpen(false)
        }} />
      </div>
    </DialogWrapper>
  );
}
