import { Inject, Route, Router } from '@helpers/helper.di'
import { ActivityGroupsController } from '@controllers/controller.activityGroups'
import { DTOActivityGroups, DTOActivityGroupsId } from '@dtos/dto.activityGroups'
import { validator } from '@middlewares/middleware.validator'

@Route()
export class ActivityGroupsRoute {
  private router: Router

  constructor(@Inject('ActivityGroupsController') private controller: ActivityGroupsController) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [validator(DTOActivityGroups)], this.controller.createActivityGroups())
    this.router.get('/', this.controller.getAllActivityGroups())
    this.router.get('/:id', [validator(DTOActivityGroupsId)], this.controller.getActivityGroupsById())
    this.router.delete('/:id', [validator(DTOActivityGroupsId)], this.controller.deleteActivityGroupsById())
    this.router.patch('/:id', [validator(DTOActivityGroups)], this.controller.updateActivityGroupsById())

    return this.router
  }
}
