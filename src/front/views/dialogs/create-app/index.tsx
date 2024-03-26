"use client";

// React Imports
import { useState } from "react";

// MUI Imports
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import MuiStep from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import type { StepProps } from "@mui/material/Step";

// Third-party Imports
import classnames from "classnames";

// Component Imports
import Features from "./Features";
import CustomAvatar from "@core/components/mui/Avatar";
import CarInfo from "./CarInfo";
import DialogCloseButton from "@front/components/dialogs/DialogCloseButton";
import Database from "./Database";
import FrameWork from "./FrameWork";
import Submit from "./Submit";
import StepWrapper from "@/front/components/dialogs/StepWrapper";
import DialogWrapper from "@/front/components/dialogs/DialogWrapper";
import { renderStepCount } from "@/front/components/dialogs/renderStep";

// Styled Component Imports
// import StepperWrapper from '@core/styles/stepper'

type CreateAppProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type stepperProps = {
  icon: string;
  title: string;
  subtitle: string;
  active?: boolean;
};

const steps: stepperProps[] = [
  {
    icon: "tabler-car",
    title: "Car Info",
    subtitle: "Main information",
  },
  {
    icon: "tabler-brand-my-oppo",
    title: "Features",
    subtitle: "Select Database",
  },
  {
    icon: "tabler-brand-cashapp",
    title: "Price",
    subtitle: "Select Price",
    active: true,
  },
  {
    icon: "tabler-photo-plus",
    title: "Images",
    subtitle: "Add Images",
  },
  {
    icon: "tabler-check",
    title: "Submit",
    subtitle: "Submit",
  },
];

export default function CreateCarModal({ open, setOpen }: CreateAppProps) {
  // States
  const [activeStep, setActiveStep] = useState(0);

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
          {renderStepCount(
            [CarInfo, Features],
            activeStep,
            {isLastStep, handleNext, handlePrev}
          )}
        </div>
      </div>
    </DialogWrapper>
  );
}
