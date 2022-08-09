import { Inject, Route, Router } from '@helpers/helper.di'
import { ActivityGroupsController } from '@controllers/controller.activityGroups'

@Route()
export class ActivityGroupsRoute {
  private router: Router

  constructor(@Inject('ActivityGroupsController') private controller: ActivityGroupsController) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', this.controller.createActivityGroups())
    this.router.get('/', this.controller.getAllActivityGroups())
    this.router.get('/:id', this.controller.getActivityGroupsById())
    this.router.patch('/:id', this.controller.updateActivityGroupsById())
    this.router.delete('/:id', this.controller.deleteActivityGroupsById())

    return this.router
  }
}
