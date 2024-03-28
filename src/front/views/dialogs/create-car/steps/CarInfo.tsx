// React Imports
import type { ChangeEvent } from "react";

// MUI Imports
import CustomTextField from "@core/components/mui/TextField";

// Config Imports
import PrevNextSubmitBtns from "@/front/components/dialogs/wizzard/prevNextSubmitBtns";
import { Checkbox, Chip, Grid } from "@mui/material";
import CustomAutocomplete from "@/front/@core/components/mui/Autocomplete";
import { StepComponentProps } from "@/front/components/dialogs/wizzard/renderStep";
import { ICar } from "types/Car";
import { ECarCategories, ECarType } from "types/enum/ECar";
import { EColors } from "types/enum/EGeneral";


export default function CarInfo({
  activeStep,
  isLastStep,
  handleNext,
  handlePrev,
  state,
  setState,
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

  console.log("STATE", state);

  return (
    <div className="flex flex-col">
      <Grid container className="flex mb-8" spacing={4}>
        <Grid item xs={12} md={6} lg={4} className="">
          {/* <TextField fullWidth id='outlined-basic' label="Make" /> */}
          <CustomTextField
            fullWidth
            label="Make"
            placeholder={`Mercedes`}
            value={state.make}
            onChange={(e) => handleChange(e, "make")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField
            fullWidth
            label="Model"
            placeholder={`C300`}
            value={state.model}
            onChange={(e) => handleChange(e, "model")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField
            fullWidth
            label="Option"
            placeholder={`AMG`}
            value={state.option}
            onChange={(e) => handleChange(e, "option")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField 
            fullWidth 
            label="Year" 
            placeholder={"2022"} 
            value={state.year}
            onChange={(e) => handleChange(e, "year")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomAutocomplete
            freeSolo
            disableClearable
            options={Object.values(EColors)}
            id="autocomplete-disableClearable"
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => (
              <CustomTextField {...params} label="Color" />
            )}
            value={state.color}
            onChange={(_, value: any) => handleChangeWithValue(value, "color")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomAutocomplete
            // className='is-[250px]'
            disableClearable
            options={Object.values(ECarType)}
            id="autocomplete-disableClearable"
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => (
              <CustomTextField {...params} label="Type" />
            )}
            value={state.type}
            onChange={(_, value: any) => handleChangeWithValue(value, "type")}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomAutocomplete
            fullWidth
            freeSolo
            multiple
            value={state.categories}
            onChange={(_, value: any) => handleChangeWithValue(value, "categories")}

            id="autocomplete-multiple-filled"
            // defaultValue={[top100Films[13].title]}
            options={Object.values(ECarCategories)}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                // variant="filled"
                variant="outlined"
                label="Categories"
                placeholder="Coupe"
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option}>
                <Checkbox key={option} checked={selected} className="mie-2" />
                {option}
              </li>
            )}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  size="small"
                  {...(getTagProps({ index }) as {})}
                  key={index}
                />
              ))
            }
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
