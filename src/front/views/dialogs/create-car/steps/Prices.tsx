// React Imports
import { useState } from "react";
import type { ChangeEvent } from "react";

// MUI Imports
import CustomTextField from "@core/components/mui/TextField";

// Config Imports
import themeConfig from "@/configs/(dashboard)/themeConfig";
import PrevNextSubmitBtns from "@/front/components/dialogs/wizzard/prevNextSubmitBtns";
import { Checkbox, Chip, Grid } from "@mui/material";
import CustomAutocomplete from "@/front/@core/components/mui/Autocomplete";
import { StepComponentProps } from "@/front/components/dialogs/wizzard/renderStep";
import { ICar } from "types/Car";

export default function Prices({
  activeStep,
  isLastStep,
  handleNext,
  handlePrev,
  state,
  setState
}: StepComponentProps<ICar>) {
  // States

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof ICar) => {
    const newValue = event.target.value;
    const newObj = {...state, [key]: newValue}
    setState(newObj);
  };

  const handleChangeWithValue = (newValue: any, key: keyof ICar) => {
    const newObj = {...state, [key]: newValue}
    setState(newObj);
  };

  return (
    <div className="flex flex-col">
      <Grid container className="flex mb-8" spacing={4}>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label="Price Dayly"
            placeholder={`150`}
            helperText={"AED"}

            value={state.priceDaily}
            onChange={(e) => handleChange(e, "priceDaily")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
              fullWidth
              label="Price Monthly"
              placeholder={`4000`}
              helperText={"AED"}

              value={state.priceMonthly}
              onChange={(e) => handleChange(e, "priceMonthly")}
            />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label="Extra Miles"
            placeholder={`500`}
            helperText={"Max km per day"}

            value={state.extraMiles}
            onChange={(e) => handleChange(e, "extraMiles")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
              fullWidth
              label="Extra Miles Price"
              placeholder={`15`}
              helperText={"AED"}

              value={state.extraMilesPrice}
            onChange={(e) => handleChange(e, "extraMilesPrice")}
            />
        </Grid>
      </Grid>

      <PrevNextSubmitBtns
        isLastStep={isLastStep}
        activeStep={activeStep}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
}
