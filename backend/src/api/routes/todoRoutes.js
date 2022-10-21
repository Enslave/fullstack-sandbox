const controller = require('../controllers/todoController')
const slug = '/todos'

module.exports = (app) => {
  app.route(slug).get(controller.getAll).post(controller.newTodoList)

  app
    .route(`${slug}/:id`)
    .patch(controller.updateTodoList)
    .delete(controller.deleteTodoList)
    .post(controller.addTodo)

  app.route(`${slug}/:id/todo/:todoId`).delete(controller.deleteTodo)
}
