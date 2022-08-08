import { Module, Injectable, Inject, Context, ObjectLiteral } from '@helpers/helper.di'
import { ActivityGroupsService } from '@services/service.activityGroups'
import { ActivityGroupsController } from '@controllers/controller.activityGroups'
import { ActivityGroupsRoute } from '@routes/route.activityGroups'
import { ActivityGroupsModel } from '@models/model.activityGroups'

@Module([
  { token: 'ActivityGroupsService', useClass: ActivityGroupsService },
  { token: 'ActivityGroupsController', useClass: ActivityGroupsController },
  { token: 'ActivityGroupsRoute', useClass: ActivityGroupsRoute },
  {
    token: 'ActivityGroupsModel',
    useFactory: (): ObjectLiteral => {
      return Context.get(ActivityGroupsModel).model
    }
  }
])
@Injectable()
export class ActivityGroupsModule {
  constructor(@Inject('ActivityGroupsRoute') public route: ActivityGroupsRoute) {}
}
