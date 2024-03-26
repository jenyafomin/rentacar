import DirectionalIcon from "@/front/components/DirectionalIcon";
import { Button } from "@mui/material";

interface IProps {
    activeStep: number;
    isLastStep: boolean;
    handlePrev: () => any;
    handleNext: () => any;
}

export default function PrevNextSubmitBtns({activeStep, handlePrev, handleNext, isLastStep}: IProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="tonal"
        color="secondary"
        disabled={activeStep === 0}
        onClick={handlePrev}
        startIcon={
          <DirectionalIcon
            ltrIconClass="tabler-arrow-left"
            rtlIconClass="tabler-arrow-right"
          />
        }
      >
        Previous
      </Button>
      <Button
        variant="contained"
        color={isLastStep ? "success" : "primary"}
        onClick={() => {console.log("CLICK");handleNext()}}
        endIcon={
          isLastStep ? (
            <i className="tabler-check" />
          ) : (
            <DirectionalIcon
              ltrIconClass="tabler-arrow-right"
              rtlIconClass="tabler-arrow-left"
            />
          )
        }
      >
        {isLastStep ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
