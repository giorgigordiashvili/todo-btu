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
  Checkbox,
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
import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import empty from './assets/empty.png'
import CustomOutlinedInput from './components/CustomOutlinedInput'
import CustomSelect from './components/CustomSelect'
import useWindowWidth from './hooks/useWindowWidth'
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

const loadFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
  return storedTodos ? JSON.parse(storedTodos) : []
}

const saveToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}

interface Todo {
  text: string
  completed: boolean
}

interface Product {
  id: number
  title: string
  image: string
  price: number
}

const LOCAL_STORAGE_KEY = 'todos'

const Home: React.FC = () => (
  <Box sx={{ textAlign: 'center', p: 5 }}>
    <h1>Welcome to the SPA App</h1>
    <nav>
      <Link to="/todos">Go to Todos</Link> |{' '}
      <Link to="/products">View Products</Link>
    </nav>
  </Box>
)

const Todos: React.FC = () => {
  const { mode, setMode } = useColorScheme()
  const [value, setValue] = useState<string>('all')
  const [todos, setTodos] = useState<Todo[]>(() => loadFromLocalStorage())
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
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: newTodo.trim(), completed: false }
      ])
      setNewTodo('')
      setIsDialogOpen(false)
    }
  }

  const handleDeleteTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index))
  }

  const handleEditTodo = (index: number) => {
    setEditIndex(index)
    setEditedTodo(todos[index].text)
  }

  const handleSaveEdit = () => {
    if (editIndex !== null && editedTodo.trim() !== '') {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos]
        updatedTodos[editIndex].text = editedTodo.trim()
        return updatedTodos
      })
      setEditIndex(null)
      setEditedTodo('')
    }
  }

  const handleToggleComplete = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const filteredTodos = todos
    .filter((todo) => {
      if (value === 'complete') return todo.completed
      if (value === 'incomplete') return !todo.completed
      return true
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
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
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(index)}
                />
                {editIndex === index ? (
                  <TextField
                    fullWidth
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                  />
                ) : (
                  <ListItemText
                    primary={todo.text}
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none'
                    }}
                  />
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

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios
      .get<Product[]>('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
  }, [])

  return (
    <Box sx={{ textAlign: 'center', p: 5 }}>
      <h1>Products</h1>
      {products.map((product) => (
        <motion.div key={product.id} whileHover={{ scale: 1.1 }}>
          <h3>{product.title}</h3>
          <img src={product.image} alt={product.title} width={100} />
          <p>{product.price} USD</p>
        </motion.div>
      ))}
    </Box>
  )
}

export default function ToggleColorMode() {
  const windowWidth = useWindowWidth()
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box>
          <nav>
            <Link to="/">Home</Link> | <Link to="/todos">Todos</Link> |{' '}
            <Link to="/products">Products</Link>
          </nav>
          <p>Window Width: {windowWidth}px</p>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}
