// React Imports
import { useState } from "react";
import type { ChangeEvent } from "react";

// MUI Imports
import CustomTextField from "@core/components/mui/TextField";

// Config Imports
import PrevNextSubmitBtns from "@/front/components/dialogs/wizzard/prevNextSubmitBtns";
import { Checkbox, Chip, Grid } from "@mui/material";
import CustomAutocomplete from "@/front/@core/components/mui/Autocomplete";
import { StepComponentProps } from "@/front/components/dialogs/wizzard/renderStep";
import { ICar } from "types/Car";
import { ECarFeatures, ECarFuelType, ECarTransmission } from "types/enum/ECar";

export default function Features ({
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

        <Grid item xs={12} md={6} lg={4} className="">
          {/* <TextField fullWidth id='outlined-basic' label="Make" /> */}
          <CustomAutocomplete
            fullWidth
            freeSolo
            disableClearable
            value={state.amountOfDoors?.toString()}
            onChange={(e, value: any) => handleChangeWithValue(value, "amountOfDoors")}
            options={["2", "3", "4", "5"]}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                // variant="filled"
                variant="outlined"
                label="Amount of doors"
                placeholder="4"
              />
            )}
          />
        </Grid>
  
        <Grid item xs={12} md={6} lg={4}>
          <CustomAutocomplete
              fullWidth
              freeSolo
              disableClearable
              
              value={state.amountOfSeats?.toString()}
              onChange={(e, value: any) => handleChangeWithValue(value, "amountOfSeats")}

              options={["2", "3", "4", "5", "6", "7"]}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  // variant="filled"
                  variant="outlined"
                  label="Amount of seats"
                  placeholder="5"
                />
              )}
            />
        </Grid>
  
        <Grid item xs={12} md={6} lg={4}>
          <CustomAutocomplete
              fullWidth
              freeSolo
              disableClearable
                
              value={state.amountOfLaguage?.toString()}
              onChange={(e, value: any) => handleChangeWithValue(value, "amountOfLaguage")}

              id="autocomplete-multiple-filled"
              // defaultValue={"5"}
              options={["1","2", "3", "4", "5", "6", "7"]}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  // variant="filled"
                  variant="outlined"
                  label="Amount of laguage"
                  placeholder="3"
                />
              )}
            />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField 
            fullWidth 
            label="Engine" 
            placeholder={"2.0T v4"} 
            value={state.engine || ""}
            onChange={(e) => handleChange(e, "engine")}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField 
            fullWidth 
            label="Horse Power" 
            placeholder={"234"} 
            value={state.horsePower?.toString()}
            onChange={(e) => handleChange(e, "horsePower")}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <CustomAutocomplete
                fullWidth
                freeSolo
                disableClearable
                
                value={state.transmission || ""}
                onChange={(e, value: any) => handleChangeWithValue(value, "transmission")}

                id="autocomplete-multiple-filled"
                options={Object.values(ECarTransmission)}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    // variant="filled"
                    variant="outlined"
                    label="Transmission"
                    placeholder="Front"
                  />
                )}
              />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
              <CustomAutocomplete
                fullWidth
                freeSolo
                disableClearable
                
                value={state.fuelType || ""}
                onChange={(e, value: any) => handleChangeWithValue(value, "fuelType")}

                id="autocomplete-multiple-filled"
                options={Object.values(ECarFuelType)}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    // variant="filled"
                    variant="outlined"
                    label="Fuel"
                    placeholder="Petrol"
                  />
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

        <Grid item xs={12} md={6} lg={4}>
          <CustomTextField 
            fullWidth 
            label="Fuel Consumption" 
            placeholder={"10.3"} 
            helperText={"L/100km"} 
            
            value={state.fuelConsumption || ""}
            onChange={(e) => handleChange(e, "fuelConsumption")}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomAutocomplete
            fullWidth
            freeSolo
            multiple
            disableCloseOnSelect
            
            value={state.features}
            onChange={(e, values: any) => handleChangeWithValue(values, "features")}

            options={Object.values(ECarFeatures)}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                // variant="filled"
                variant="outlined"
                label="Features"
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
