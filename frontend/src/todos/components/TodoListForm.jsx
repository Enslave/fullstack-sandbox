import React, { useState } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList, addTodo, deleteTodo }) => {
  const [todos] = useState(todoList.todos)
  const [saved, setSaved] = useState(false)
  const [timer, setTimer] = useState(null)

  const doSave = async () => {
    saveTodoList(todoList._id, { todos })
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 1000)
  }

  const debounceSave = () => {
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        doSave()
      }, 1000)
    )
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.name}
                onChange={(event) => {
                  todo.name = event.target.value
                  debounceSave()
                }}
              />
              <FormGroup style={{ marginLeft: '8px', marginTop: '1rem' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={todo.completed}
                      onClick={() => {
                        todo.completed = !todo.completed
                        todo.completedAt = todo.completed ? new Date() : null
                        doSave()
                      }}
                    />
                  }
                  label='Completed'
                />
              </FormGroup>
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  deleteTodo(todoList._id, todo._id)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={() => addTodo(todoList._id)}>
              Add Todo <AddIcon />
            </Button>
            {saved && <Typography sx={{ marginLeft: '8px' }}>Saved</Typography>}
          </CardActions>
        </div>
      </CardContent>
    </Card>
  )
}
