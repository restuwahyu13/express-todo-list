import { Inject, Route, Router } from '@helpers/helper.di'
import { TodosController } from '@controllers/controller.todos'
import { DTOTodos, DTOTodosId } from '@dtos/dto.todos'
import { validator } from '@middlewares/middleware.validator'

@Route()
export class TodosRoute {
  private router: Router

  constructor(@Inject('TodosController') private controller: TodosController) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [validator(DTOTodos)], this.controller.createTodos())
    this.router.get('/', this.controller.getAllTodos())
    this.router.get('/:id', [validator(DTOTodosId)], this.controller.getTodosById())
    this.router.delete('/:id', [validator(DTOTodosId)], this.controller.deleteTodosById())
    this.router.patch('/:id', [validator(DTOTodos)], this.controller.updateTodosById())

    return this.router
  }
}
