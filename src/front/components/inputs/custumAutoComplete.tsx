import CustomAutocomplete from "@/front/@core/components/mui/Autocomplete";
import CustomTextField from "@/front/@core/components/mui/TextField";
import { Checkbox, Chip } from "@mui/material";
import { ChangeEvent } from "react";


interface IProps {
    label: string,
    values: string | string[],
    options: string[],
    onChange: (e: ChangeEvent<HTMLInputElement>, selectedValues: string[], _: any, selectedOption: string) => any,
    fullWidth?: boolean
    freeSolo?: boolean
    multiple?: boolean
    disableCloseOnSelect?: boolean;
    limitTags?: number;
    useCheckbox?: boolean;
    disableClearable?: boolean;
}

// TODO 
export default function CustomAutocompleteInput({
  label,
  values,
  options,
  onChange,
  fullWidth,
  freeSolo=false,
  multiple,
  disableCloseOnSelect,
  limitTags,
  useCheckbox,
  disableClearable
}: IProps) {
  return (
    <CustomAutocomplete
      fullWidth={fullWidth}
      freeSolo={freeSolo}
      multiple={multiple}
      disableCloseOnSelect={disableCloseOnSelect}
      disableClearable={disableClearable}
      // value={["econom"]}
      onChange={(e, allValues, _, option: any) =>
        console.log(
          "Selected values",
          allValues,
          "\nSelected Option:",
          option?.option
        )}
      id="autocomplete-multiple-filled"
      // defaultValue={[top100Films[13].title]}
      options={options}
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
  );
}
