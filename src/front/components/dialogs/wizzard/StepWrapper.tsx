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
import { useMediaQuery } from "@mui/material";
import { CSSProperties } from "react";

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
  const media600 = useMediaQuery(`(min-width:600px)`)
  const media900 = useMediaQuery(`(min-width:900px)`)
  
  let stepperStyle: CSSProperties = {};
  let stepLabelStyle: CSSProperties = {};
  let typographyStyle: CSSProperties = {};
  let iconStyle: CSSProperties = {};
  let titleStyle: CSSProperties = {};
  let descriptionStyle: CSSProperties = {};
  
  if(!media600) {
    // stepperStyle = {
    //   flexDirection: "row",
    //   flexWrap: "wrap",
    //   justifyContent: "space-between"
    // }
    // iconStyle = {
    //   marginInlineEnd: "0",
    // }
    descriptionStyle = {
      display: "none"
    }
  }

  if(!media900) {
    stepperStyle = {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between"
    }
    stepLabelStyle = {
      flexDirection: "column"
    }
    iconStyle = {
      marginInlineEnd: "0",
      marginBottom: "8px"
    }
    titleStyle = {
      fontSize: "10px",
      fontWeight: "bold"
    }
  }
  
  return (
    <StepperWrapper>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        connector={<></>}
        className="flex md:flex-col xs:flex-row sm:flex-row gap-4 min-is-[220px]"
        style={stepperStyle}
      >
        {steps.map((label, index) => {
          return (
            <Step key={index} onClick={handleStep(index)}>
              <StepLabel icon={<></>} className="p-1 cursor-pointer">
                <div className="step-label md:flex-row" style={stepLabelStyle}>
                  <CustomAvatar
                    variant="rounded"
                    skin={activeStep === index ? "filled" : "light"}
                    {...(activeStep >= index && { color: "primary" })}
                    {...(activeStep === index && {
                      className: "shadow-primarySm",
                    })}
                    size={38}
                    style={iconStyle}
                  >
                    <i
                      className={classnames(
                        label.icon as string,
                        "text-[22px]"
                      )}
                    />
                  </CustomAvatar>

                  <div className="flex-col" style={typographyStyle}>
                    <Typography className="uppercase step-title" style={titleStyle}>
                      {label.title}
                    </Typography>
                    <Typography className="step-subtitle sm:hidden md:block " style={descriptionStyle}>
                      {label.subtitle}
                    </Typography>
                  </div>
                </div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </StepperWrapper>
  );
}
