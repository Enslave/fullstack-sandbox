const { respond } = require('../../services/dataStructures')
const todoService = require('../../services/todoService')

const getAll = async (req, res) => {
    respond(res, await todoService.getAll())
}

const newTodoList = async (req, res) => {
    // TODO: Need to validate incoming data
    respond(res, await todoService.newTodoList(req.body))
}

const updateTodoList = async (req, res) => {
    // TODO: Need to validate incoming data
    respond(res, await todoService.updateTodoList(req.params.id, req.body))
}

const deleteTodoList = async (req, res) => {
    respond(res, await todoService.deleteTodoList(req.params.id))
}

const addTodo = async (req, res) => {
    respond(res, await todoService.addTodo(req.params.id))
}

const deleteTodo = async (req, res) => {
    respond(res, await todoService.deleteTodo(req.params.id, req.params.todoId))
}

module.exports = {
    getAll,
    newTodoList,
    updateTodoList,
    deleteTodoList,
    addTodo,
    deleteTodo,
}