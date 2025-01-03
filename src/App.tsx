import {
  DarkModeOutlined,
  LightModeOutlined,
  SearchOutlined
} from '@mui/icons-material'
import {
  Box,
  ButtonBase,
  SelectChangeEvent,
  styled,
  ThemeProvider
} from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { ReactNode, useState } from 'react'
import empty from './assets/empty.png'
import CustomOutlinedInput from './components/CustomOutlinedInput'
import CustomSelect from './components/CustomSelect'
import theme from './theme'
const StyledButton = styled(ButtonBase)(({ theme }) => ({
  color: '#FFF',
  borderRadius: '5px',
  background: '#6C63FF',
  padding: '8px'
}))

const StyledTodoContainer = styled(Box)(({ theme }) => ({
  width: '520px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '30px'
}))

function MyApp() {
  const { mode, setMode } = useColorScheme()
  const [value, setValue] = useState<string>('all')

  const options = [
    { value: 'all', label: 'All' },
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' }
  ]

  const handleChange = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => {
    setValue(event.target.value as string)
  }

  if (!mode) {
    return null
  }

  return (
    <>
      <Box
        sx={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center',
          gap: '16px', // Add gap between items
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
          minHeight: '56px',
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}
        >
          <CustomOutlinedInput
            endAdornment={<SearchOutlined color="primary" />}
          />
          <Box sx={{ width: '200px' }}>
            <CustomSelect
              value={value}
              onChange={handleChange}
              options={options}
            />
          </Box>
          <StyledButton
            onClick={() => {
              setMode(mode === 'light' ? 'dark' : 'light')
            }}
          >
            {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
          </StyledButton>
        </Box>
        <StyledTodoContainer>
          <img src={empty} alt={value} />
        </StyledTodoContainer>
      </Box>
    </>
  )
}

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <MyApp />
    </ThemeProvider>
  )
}
