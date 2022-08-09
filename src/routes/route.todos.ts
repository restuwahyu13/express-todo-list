import { Inject, Route, Router } from '@helpers/helper.di'
import { TodosController } from '@controllers/controller.todos'

@Route()
export class TodosRoute {
  private router: Router

  constructor(@Inject('TodosController') private controller: TodosController) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', this.controller.createTodos())
    this.router.get('/', this.controller.getAllTodos())
    this.router.get('/:id', this.controller.getTodosById())
    this.router.delete('/:id', this.controller.deleteTodosById())
    this.router.patch('/:id', this.controller.updateTodosById())

    return this.router
  }
}
