import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import * as React from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

interface MultipleSelectProps {
  isMulti: boolean;
  w?: string;
  label: string;
  options: string[];
  showInput: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
// ... (previous imports)

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  isMulti,
  w,
  label,
  options,
  value,
  showInput,
  onChange
}) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value: selectedValue }
    } = event;
    onChange(
      // On autofill, we get a stringified value.
      typeof selectedValue === 'string'
        ? selectedValue.split(',')
        : selectedValue
    );
  };

  return (
    <FormControl sx={{ width: w ? w : '27rem !important' }}>
      <InputLabel id='demo-multiple-name-label'>{label}</InputLabel>
      <Select
        labelId='demo-multiple-name-label'
        id='demo-multiple-name'
        multiple={isMulti}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {options.map((value, index) => (
          <MenuItem
            key={value}
            value={value}
            style={getStyles(value, value, theme)} // Using value as the name for getStyles
          >
            {showInput[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
