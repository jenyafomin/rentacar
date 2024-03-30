"use client";

// React Imports
import { useState } from "react";

// Component Imports
import StepWrapper from "@/front/components/dialogs/wizzard/StepWrapper";
import DialogWrapper from "@/front/components/dialogs/DialogWrapper";
import { renderStepCount } from "@/front/components/dialogs/wizzard/renderStep";
import { defaultValues, forms, steps } from "./steps";
import { ICar } from "types/Car";
import { FileProp } from "@/front/types/file";
import { useLocale } from "@/localization/useLocale";
import { useRouter } from "next/navigation";

// Styled Component Imports
// import StepperWrapper from '@core/styles/stepper'

export interface IExtraState {
  images: Array<FileProp>;
  uploadedImages: Array<FileProp>;
}
export type IOnSaveProps = {
  initialValues: Partial<ICar>,
  state: ICar;
  extraState: IExtraState;
}

export type IOnSaveFn = ({
  initialValues,
  state,
  extraState,
}: IOnSaveProps) => Promise<boolean>;

type CreateCarModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: Partial<ICar>;
  onSave: IOnSaveFn;
};

export default function CarWizzard({
  open,
  setOpen,
  initialValues = defaultValues,
  onSave
}: CreateCarModalProps) {
  // States
  const locale = useLocale();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState<ICar>(initialValues as ICar);

  // Save images in different state, because new images will be stored as a FileProp = {file, url}
  const [extraState, setExtraState] = useState<IExtraState>({
    images: initialValues.images?.map((url) => ({ url })) || [],
    uploadedImages: initialValues.uploadedImages?.map((url) => ({ url })) || [],
  });

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  // Vars
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = async () => {
    if (!isLastStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      const success = await onSave({initialValues, state, extraState})
      if(success) {
        setTimeout(() => {
          router.refresh();
          handleClose()
        }, 500)
      }
    }
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      title="Create Car"
      description="Provide necessary data for car"
      handleClose={handleClose}
    >
      <div className="flex gap-y-6 flex-col md:flex-row md:gap-5">
        <StepWrapper
          steps={steps}
          activeStep={activeStep}
          handleStep={handleStep}
        />

        <div className="flex-1">
          {renderStepCount(forms, activeStep, {
            isLastStep,
            handleNext,
            handlePrev,
            state,
            setState,
            extraState,
            setExtraState,
          })}
        </div>
      </div>
    </DialogWrapper>
  );
}
