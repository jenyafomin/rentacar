// React Imports
import type { ChangeEvent } from "react";

// MUI Imports
import CustomTextField from "@core/components/mui/TextField";

// Config Imports
import PrevNextSubmitBtns from "@/front/components/dialogs/wizzard/prevNextSubmitBtns";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import CustomAutocomplete from "@/front/@core/components/mui/Autocomplete";
import { StepComponentProps } from "@/front/components/dialogs/wizzard/renderStep";
import { ECarStatus } from "types/enum/ECar";
import { ICar } from "types/Car";
import { changeStateWithInput, changeStateWithValue } from "@/front/utils/handleInputChange";

export default function Status({
  activeStep,
  isLastStep,
  handleNext,
  handlePrev,
  state, 
  setState
}: StepComponentProps<ICar>) {
  // States

  const handleChange = changeStateWithInput(state, setState)
  const handleChangeWithValue = changeStateWithValue(state, setState)

  const connectedExcel = state.carExcelId ? true : false

  return (
    <div className="flex flex-col">
      <Grid container className="flex mb-8" spacing={4}>
        <Grid item xs={connectedExcel ? 6 : 12} className="">
          <CustomAutocomplete
            // className='is-[250px]'
            freeSolo
            disableClearable
            options={Object.values(ECarStatus)}
            id="autocomplete-disableClearable"
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => (
              <CustomTextField {...params} label="Status" />
            )}
            value={state.status || ""}
            onChange={(_, value: any) => handleChangeWithValue(value, "status")}
          />
        </Grid>
        {connectedExcel && <Grid item xs={6} className="">
          <CustomAutocomplete
            // className='is-[250px]'
            freeSolo
            disableClearable
            options={Object.values(ECarStatus)}
            id="autocomplete-disableClearable"
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => (
              <CustomTextField {...params} label="Excel Status" />
            )}
            value={state.status || ""}
            onChange={(_, value: any) => handleChangeWithValue(value, "status")}
          />
        </Grid>}
        <Grid item xs={connectedExcel ? 6 : 12}>
          <FormControlLabel
            // onClick={() => setConnectedExcel((oldValue) => !oldValue)}
            control={
              <Switch color="success" />
            }
            checked={connectedExcel}
            label="Connected to Excel"
          />
        </Grid>
        {connectedExcel && <Grid item xs={6}>
          <FormControlLabel
            onClick={() => handleChangeWithValue(!state.useExcelStatus, "useExcelStatus")}
            checked={state.useExcelStatus || false}
            control={<Switch defaultChecked color="success" />}
            label="Use Excel Status"
          />
        </Grid>}
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
