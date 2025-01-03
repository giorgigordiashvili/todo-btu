import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#F7F7F7'
        },
        secondary: {
          main: '#6C63FF'
        },
        error: {
          main: red.A400
        }
      }
    },
    light: {
      palette: {
        primary: {
          main: '#6C63FF'
        },
        secondary: {
          main: '#6C63FF'
        },
        error: {
          main: red.A400
        }
      }
    }
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          boxShadow: '0 0 1px #6C63FF66', // Glowing effect
          color: '#6C63FF', // Text color
          height: '38px', // Set fixed height
          borderRadius: '5px', // Rounded corners
          caretColor: '#6C63FF',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid rgba(108, 99, 255, 0.4)' // Default border
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6C63FF' // Darker border on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #6C63FF' // Thicker primary border on focus
          }
        },
        input: {
          padding: '8px 16px' // Adjust inner padding of the input text
        }
      }
    }
  }
})

export default theme
