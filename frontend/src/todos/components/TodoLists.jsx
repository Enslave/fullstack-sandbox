import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { Card, CardContent, Typography, Button, CircularProgress, Backdrop } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import DeleteIcon from '@mui/icons-material/Delete'
import { TodoListForm } from './TodoListForm'
import { NewListForm } from './NewListForm'
import { todoService } from '../../services/todoService'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState([])
  const [activeList, setActiveList] = useState(null)
  const [activeListObject, setActiveListObject] = useState({})
  const [pending, setPending] = useState(false)

  const refresh = useCallback(() => {
    todoService.fetchTodoLists().then((params) => {
      if (params.status === 200) {
        setTodoLists(params.data)
        if (activeList) {
          setActiveListObject(params.data.find((l) => l._id === activeList))
        }
        setPending(false)
      } else {
        // TODO: Error handling
      }
    })
  }, [activeList])

  useEffect(() => {
    refresh()
  }, [refresh])

  if (activeList && activeListObject && activeListObject._id !== activeList) {
    setActiveListObject(todoLists.find((l) => l._id === activeList))
  }

  return (
    <Fragment>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={pending}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {todoLists.map((todoList) => (
              <div key={todoList._id} style={{ display: 'flex', alignItems: 'center' }}>
                <ReceiptIcon />
                <Typography
                  sx={{ margin: '8px', cursor: 'pointer', flexGrow: 1 }}
                  variant='h6'
                  onClick={() => setActiveList(todoList._id)}
                >
                  {todoList.title}
                </Typography>
                <Button
                  sx={{ margin: '8px' }}
                  size='small'
                  color='secondary'
                  onClick={() => {
                    setPending(true)
                    todoService.deleteTodoList(todoList._id, refresh)
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </div>
          <NewListForm
            saveNewTodoList={(payload) => {
              setPending(true)
              todoService.newTodoList(payload, refresh)
            }}
          />
        </CardContent>
      </Card>
      {activeListObject._id && (
        <TodoListForm
          key={`${activeListObject._id}-${activeListObject.todos.length}`} // use key to make React recreate component to reset internal state
          todoList={activeListObject}
          saveTodoList={async (id, payload) => {
            setPending(true)
            todoService.saveTodoList(id, payload, refresh)
          }}
          addTodo={(id) => {
            setPending(true)
            todoService.addTodo(id, refresh)
          }}
          deleteTodo={(id, todoId) => {
            setPending(true)
            todoService.deleteTodo(id, todoId, refresh)
          }}
        />
      )}
    </Fragment>
  )
}
