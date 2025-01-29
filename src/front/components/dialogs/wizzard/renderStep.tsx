import { ComponentType } from "react";
import PrevNextSubmitBtns from "./prevNextSubmitBtns";

function NotFoundStep({activeStep, restProps}: {activeStep: number, restProps: any}): any {
    return <div className="flex flex-col">
      <div className="mb-4">404 Component not found by index: {activeStep}</div>
      <PrevNextSubmitBtns activeStep={activeStep} {...restProps} />
    </div>
}

export type StepComponentProps<T, TT = {}> = {
    activeStep: number;
    isLastStep: boolean;
    handleNext: () => void;
    handlePrev: () => void;
    state: T;
    setState: (newValue: T) => any,
    extraState: TT,
    setExtraState: (newValue: TT) => any,
  };

export const renderStepCount = (
  stepComponents: Array<ComponentType<any>>,
  activeStep: number,
  restProps: Record<string,any>
) => {
    let Tag: ComponentType<any>;
    if(activeStep > stepComponents.length -1) {
        return <NotFoundStep activeStep={activeStep} restProps={restProps} />
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
