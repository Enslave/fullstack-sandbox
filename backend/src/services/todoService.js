const dbDriver = require('./dbDriver')
const objectId = require('mongodb').ObjectId

const getAll = async () => await dbDriver.find('todos')

const newTodoList = async (payload) =>
  await dbDriver.insert('todos', {
    todos: [],
    ...payload,
  })

const updateTodoList = async (id, payload) => {
  delete payload._id
  return await dbDriver.updateOnId('todos', id, payload)
}

const deleteTodoList = async (id) => await dbDriver.deleteOneOnId('todos', id)

const addTodo = async (id) => {
  const todoResponse = await dbDriver.findOneOnId('todos', id)
  if (todoResponse.responseCode !== 200) {
    return todoResponse
  }
  todoResponse.data.todos.push({
    _id: objectId(),
    name: '',
    completed: false,
    completedAt: null,
  })
  delete todoResponse.data._id
  return await dbDriver.updateOnId('todos', id, todoResponse.data)
}

const deleteTodo = async (id, todoId) => {
  const todoResponse = await dbDriver.findOneOnId('todos', id)
  if (todoResponse.responseCode !== 200) {
    return todoResponse
  }
  const index = todoResponse.data.todos.findIndex((todo) => todo._id === todoId)
  todoResponse.data.todos.splice(index, 1)
  return await dbDriver.updateOnId('todos', id, todoResponse.data)
}

module.exports = {
  getAll,
  newTodoList,
  updateTodoList,
  deleteTodoList,
  addTodo,
  deleteTodo,
}
