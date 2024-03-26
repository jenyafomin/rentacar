// React Imports
import { useState } from "react";
import type { ChangeEvent } from "react";

// MUI Imports
import CustomTextField from "@core/components/mui/TextField";

// Config Imports
import themeConfig from "@/configs/(dashboard)/themeConfig";
import PrevNextSubmitBtns from "../../../components/dialogs/prevNextSubmitBtns";
import { Checkbox, Chip, Grid } from "@mui/material";
import CustomAutocomplete from "@/front/@core/components/mui/Autocomplete";
import { StepComponentProps } from "@/front/components/dialogs/renderStep";

const colors = [
  "Black", "White", "Green", "Blue", "Red", "Yellow"
]
const carTypes = [
  "Sedan", "Coupe", "SUV", "Convertable", "Minivan", "Hatchback"
]
const categories = [
  "econom",
  "business",
  "luxury",
  "premium",
  "sport",
  "family",
];

const features = [
  "sunroof",
  "panorama",
  "luxury",
  "premium",
  "sport",
  "family",
];

const CarInfo = ({ activeStep, isLastStep, handleNext, handlePrev }: StepComponentProps) => {
  // States
  const [value, setValue] = useState<string>("crm");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <Grid container className="flex mb-8" spacing={4}>
        <Grid item xs={12} md={6} lg={4} className="">
          {/* <TextField fullWidth id='outlined-basic' label="Make" /> */}
          <CustomTextField
            fullWidth
            label="Make"
            placeholder={`${themeConfig.templateName}`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField
            fullWidth
            label="Model"
            placeholder={`${themeConfig.templateName}`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField
            fullWidth
            label="Option"
            placeholder={`${themeConfig.templateName}`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField
            fullWidth
            label="Year"
            placeholder={"2022"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <CustomAutocomplete
            // className='is-[250px]'
            freeSolo
            disableClearable
            options={colors}
            id='autocomplete-disableClearable'
            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Color' />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomAutocomplete
            // className='is-[250px]'
            disableClearable
            options={carTypes}
            id='autocomplete-disableClearable'
            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Type' />}
          />
        </Grid>

        <Grid item xs={12}>

          <CustomAutocomplete
            fullWidth
            freeSolo
            multiple
            // value={["econom"]}
            onChange={(e, allValues, _, option: any) =>
              console.log(
                "Selected values",
                allValues,
                "\nSelected Option:",
                option?.option
              )
            }
            id="autocomplete-multiple-filled"
            // defaultValue={[top100Films[13].title]}
            options={categories}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                // variant="filled"
                variant="outlined"
                label="Categories"
                placeholder="Favorites"
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
};

export default CarInfo;
