import { apiService } from './apiService'

// Simulate network
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// const fetchTodoLists = () => {
//   return sleep(1000).then(() =>
//     Promise.resolve({
//       '0000000001': {
//         id: '0000000001',
//         title: 'First List',
//         todos: ['First todo of first list!'],
//       },
//       '0000000002': {
//         id: '0000000002',
//         title: 'Second List',
//         todos: ['First todo of second list!'],
//       },
//     })
//   )
// }

const fetchTodoLists = async () => {
  return await apiService.get('/todos')
}

const saveTodoList = async (id, payload, refresh) => {
  await apiService.patch(`/todos/${id}`, payload)
  refresh()
}

const newTodoList = async (payload, refresh) => {
  await apiService.post('/todos', payload)
  refresh()
}

const deleteTodoList = async (id, refresh) => {
  await apiService.delete(`/todos/${id}`)
  refresh()
}

const addTodo = async (id, refresh) => {
  await apiService.post(`/todos/${id}`)
  refresh()
}

const deleteTodo = async (id, todoId, refresh) => {
  await apiService.delete(`/todos/${id}/todo/${todoId}`)
  refresh()
}

export const todoService = {
  fetchTodoLists,
  saveTodoList,
  newTodoList,
  deleteTodoList,
  addTodo,
  deleteTodo,
}
