"use client";

// React Imports
import { useState } from "react";

// Component Imports
import Features from "./steps/Features";
import CarInfo from "./steps/CarInfo";
import StepWrapper from "@/front/components/dialogs/wizzard/StepWrapper";
import DialogWrapper from "@/front/components/dialogs/DialogWrapper";
import { renderStepCount } from "@/front/components/dialogs/wizzard/renderStep";
import { defaultValues, forms, steps } from "./steps";
import { ICar } from "types/Car";
import { FileProp } from "@/front/types/file";
import { toast } from "react-toastify";

// Styled Component Imports
// import StepperWrapper from '@core/styles/stepper'

type CreateCarModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: Partial<ICar>;
  onSave: (state: ICar, extraState: {images: Array<FileProp>, uploadedImages: Array<FileProp>}) => boolean;
};

export default function CreateCarWizzard({
  open,
  setOpen,
  initialValues = defaultValues,
}: CreateCarModalProps) {
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState(initialValues);

  // Save images in different state, because new images will be stored as a FileProp = {file, url}
  const [extraState, setExtraState] = useState({
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

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // TODO Operate
      console.log("state", state);
      console.log("extraState", extraState);
      handleClose();
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
