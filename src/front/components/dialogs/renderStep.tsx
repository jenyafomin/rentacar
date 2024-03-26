import { ComponentType } from "react";

function NotFoundStep({index}: {index: number}): any {
    return <div>404 Component not found by index: '{index}'</div>
}

export type StepComponentProps = {
    activeStep: number;
    isLastStep: boolean;
    handleNext: () => void;
    handlePrev: () => void;
  };

export const renderStepCount = (
  stepComponents: Array<ComponentType<any>>,
  activeStep: number,
  restProps: Record<string,any>
) => {
    let Tag: ComponentType<any>;
    if(activeStep > stepComponents.length -1) {
        return <NotFoundStep index={activeStep} />
    } else {
        Tag = stepComponents[activeStep]
    }

  return (
    <Tag
      activeStep={activeStep}
      {...restProps}
    //   handleNext={handleNext}
    //   handlePrev={handlePrev}
    //   isLastStep={isLastStep}
    />
  );
};
