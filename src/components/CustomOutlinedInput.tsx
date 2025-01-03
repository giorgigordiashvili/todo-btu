import { OutlinedInput, OutlinedInputProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  boxShadow: `0 0 1px ${theme.palette.primary.main}66`, // Glowing effect with primary color
  color: theme.palette.primary.main, // Text color from palette
  height: '38px', // Set fixed height
  borderRadius: '5px', // Rounded corners
  caretColor: theme.palette.primary.main,
  '& .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${theme.palette.primary.main}66` // Default border
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main // Hover border color
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: `2px solid ${theme.palette.primary.main}` // Focus border color
  },
  '& input': {
    padding: '8px 16px' // Adjust inner padding of the input text
  }
}))

const CustomOutlinedInput: React.FC<OutlinedInputProps> = (props) => {
  return <StyledOutlinedInput {...props} />
}

export default CustomOutlinedInput
