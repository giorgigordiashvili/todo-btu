import {
  Add,
  DarkModeOutlined,
  Delete,
  Edit,
  LightModeOutlined,
  Save,
  Search
} from '@mui/icons-material'
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SelectChangeEvent,
  styled,
  TextField,
  ThemeProvider
} from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
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

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  background: '#6C63FF',
  color: '#FFF'
}))

const StyledTodoContainer = styled(Box)(({ theme }) => ({
  width: 'min(100%, 520px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '30px'
}))

const LOCAL_STORAGE_KEY = 'todos'

const loadFromLocalStorage = (): string[] => {
  const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
  return storedTodos ? JSON.parse(storedTodos) : []
}

const saveToLocalStorage = (todos: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}

const MyApp = () => {
  const { mode, setMode } = useColorScheme()
  const [value, setValue] = useState<string>('all')
  const [todos, setTodos] = useState<string[]>(() => loadFromLocalStorage())
  const [newTodo, setNewTodo] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editedTodo, setEditedTodo] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage(todos)
  }, [todos])

  const options = [
    { value: 'all', label: 'All' },
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' }
  ]

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string)
  }

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, newTodo.trim()])
      setNewTodo('')
      setIsDialogOpen(false)
    }
  }

  const handleDeleteTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index))
  }

  const handleEditTodo = (index: number) => {
    setEditIndex(index)
    setEditedTodo(todos[index])
  }

  const handleSaveEdit = () => {
    if (editIndex !== null && editedTodo.trim() !== '') {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos]
        updatedTodos[editIndex] = editedTodo.trim()
        return updatedTodos
      })
      setEditIndex(null)
      setEditedTodo('')
    }
  }

  const filteredTodos = todos.filter((todo) =>
    todo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!mode) {
    return null
  }

  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
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
          placeholder="Search todos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={<Search />}
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
        {filteredTodos.length > 0 ? (
          <List sx={{ width: '100%' }}>
            {filteredTodos.map((todo, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
                secondaryAction={
                  editIndex === index ? (
                    <IconButton
                      edge="end"
                      aria-label="save"
                      onClick={handleSaveEdit}
                    >
                      <Save />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditTodo(index)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )
                }
              >
                {editIndex === index ? (
                  <TextField
                    fullWidth
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                  />
                ) : (
                  <ListItemText primary={todo} />
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <img src={empty} alt="No todos" />
        )}
      </StyledTodoContainer>

      <StyledFab onClick={() => setIsDialogOpen(true)}>
        <Add color="inherit" />
      </StyledFab>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle sx={{ textAlign: 'center' }}>NEW NOTE</DialogTitle>
        <DialogContent sx={{ paddingBottom: '100px' }}>
          <CustomOutlinedInput
            fullWidth
            placeholder="Input your note..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button onClick={() => setIsDialogOpen(false)}>CANCEL</Button>
          <Button onClick={handleAddTodo} variant="contained" color="primary">
            APPLY
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <MyApp />
    </ThemeProvider>
  )
}
