import { FormControlLabel, Checkbox } from "@mui/material";
import React from "react";

interface Props  {
    value: number,
    change: (event: React.MouseEvent<HTMLElement>) => void
    label: string,
    theme: any
}

const FilterCheckbox = (props : Props) => {
  return (
    <FormControlLabel
      value={props.value}
      control={<Checkbox defaultChecked={true} onClick={props.change} />}
      label={props.label}
      sx={{ color: props.theme === undefined ? "white" : props.theme.palette.text.primary }}
    />
  );
}

export default FilterCheckbox;