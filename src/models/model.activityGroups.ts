import { Model, InjectRepository, Repository } from '@helpers/helper.di'
import { Activities } from '@entities/entitie.activityGroups'

@Model()
export class ActivityGroupsModel {
  constructor(@InjectRepository(Activities) public model: Repository<Activities>) {}
}
