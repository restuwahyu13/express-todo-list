import { Model, InjectRepository, Repository } from '@helpers/helper.di'
import { ActivityGroups } from '@entities/entitie.activityGroups'

@Model()
export class ActivityGroupsModel {
  constructor(@InjectRepository(ActivityGroups) public model: Repository<ActivityGroups>) {}
}
