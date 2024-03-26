// MUI Imports
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiStep from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import type { StepProps } from "@mui/material/Step";

// Third-party Imports
import classnames from "classnames";

// Component Imports
import CustomAvatar from "@core/components/mui/Avatar";

// Styled Component Imports
import StepperWrapper from "@core/styles/stepper";

export type stepperProps = {
  icon: string;
  title: string;
  subtitle: string;
  active?: boolean;
};

const Step = styled(MuiStep)<StepProps>({
  "&.Mui-completed .step-title , &.Mui-completed .step-subtitle": {
    color: "var(--mui-palette-text-disabled)",
  },
});

export default function StepWrapper({
  steps,
  activeStep,
  handleStep,
}: {
  steps: Array<stepperProps>;
  activeStep: number;
  handleStep: (index: number) => any;
}) {
  return <StepperWrapper>
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      connector={<></>}
      className="flex flex-col gap-4 min-is-[220px]"
    >
      {steps.map((label, index) => {
        return (
          <Step key={index} onClick={handleStep(index)}>
            <StepLabel icon={<></>} className="p-1 cursor-pointer">
              <div className="step-label">
                <CustomAvatar
                  variant="rounded"
                  skin={activeStep === index ? "filled" : "light"}
                  {...(activeStep >= index && { color: "primary" })}
                  {...(activeStep === index && {
                    className: "shadow-primarySm",
                  })}
                  size={38}
                >
                  <i
                    className={classnames(label.icon as string, "text-[22px]")}
                  />
                </CustomAvatar>
                <div className="flex flex-col">
                  <Typography className="uppercase step-title">
                    {label.title}
                  </Typography>
                  <Typography className="step-subtitle">
                    {label.subtitle}
                  </Typography>
                </div>
              </div>
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  </StepperWrapper>;
}
