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

const colors = ["Black", "White", "Green", "Blue", "Red", "Yellow"];
const carTypes = [
  "Sedan",
  "Coupe",
  "SUV",
  "Convertable",
  "Minivan",
  "Hatchback",
];
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

const CarInfo = ({
  activeStep,
  isLastStep,
  handleNext,
  handlePrev,
}: StepComponentProps) => {
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
          <CustomAutocomplete
            fullWidth
            freeSolo
            disableClearable
            // value={["econom"]}
            onChange={(e, allValues, _, option: any) => console.log(allValues)}
            id="autocomplete-multiple-filled"
            // defaultValue={[top100Films[13].title]}
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
              // value={["econom"]}
              onChange={(e, allValues, _, option: any) => console.log(allValues)}
              id="autocomplete-multiple-filled"
              // defaultValue={"5"}
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
              // value={["econom"]}
              onChange={(e, allValues, _, option: any) => console.log(allValues)}
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
          <CustomTextField fullWidth label="Engine" placeholder={"2.4 v4"} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomAutocomplete
                fullWidth
                freeSolo
                disableClearable
                // value={["econom"]}
                onChange={(e, allValues, _, option: any) => console.log(allValues)}
                id="autocomplete-multiple-filled"
                options={["Front","Rear", "4x4"]}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    // variant="filled"
                    variant="outlined"
                    label="Transmision"
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
                // value={["econom"]}
                onChange={(e, allValues, _, option: any) => console.log(allValues)}
                id="autocomplete-multiple-filled"
                options={["Petrol", "Gas", "Diesel", "Electro", "Hybrid"]}
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

        <Grid item xs={12}>
          <CustomAutocomplete
            fullWidth
            freeSolo
            multiple
            disableCloseOnSelect
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
            options={features}
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
