import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ReactNode } from 'react'

// Define the types for the options
interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => void
  options: Option[]
}

// Styled Select component
const StyledSelect = styled(Select)(({ theme }) => ({
  color: '#FFF',
  backgroundColor: '#6C63FF',
  border: `transparent`,
  borderRadius: '5px',
  fontWeight: 500,
  '&:hover': {
    borderColor: theme.palette.primary.main
  },
  '& .MuiSvgIcon-root': {
    color: '#FFF'
  }
}))

// Styled MenuItem component
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: '#6C63FF',
  '&.Mui-selected': {
    backgroundColor: `#6C63FF33`, // Transparent primary color
    color: '#6C63FF'
  },
  '&.Mui-selected:hover': {
    backgroundColor: `${theme.palette.primary.main}55` // Slightly darker
  }
}))

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options
}) => {
  const StyledMenuProps = {
    MenuProps: {
      PaperProps: {
        sx: {
          border: '1px solid #6C63FF', // Purple border
          boxShadow: 'none', // Remove shadow
          backgroundColor: '#FFF' // White for dark mode
        }
      }
    }
  }

  return (
    <FormControl fullWidth>
      <StyledSelect
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{
          style: {
            padding: '8px 16px'
          }
        }}
        {...StyledMenuProps}
      >
        {options.map((option) => (
          <StyledMenuItem key={option.value} value={option.value}>
            {option.label}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  )
}

export default CustomSelect
