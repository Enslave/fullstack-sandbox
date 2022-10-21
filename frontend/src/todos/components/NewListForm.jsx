import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const NewListForm = ({ saveNewTodoList }) => {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    saveNewTodoList({ title })
    setShowForm(false)
    setTitle('')
  }

  return (
    <div>
      {showForm && (
        <Card sx={{ margin: '0 1rem' }}>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
            >
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What should the new list be called?'
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value)
                }}
              />
              <CardActions>
                <Button type='submit' variant='contained' color='primary'>
                  Save
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      )}

      {!showForm && (
        <Button
          type='button'
          color='primary'
          onClick={() => {
            setShowForm(true)
          }}
        >
          Add List <AddIcon />
        </Button>
      )}
    </div>
  )
}
