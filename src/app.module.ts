import { Container, Injectable, Module, Router } from '@helpers/helper.di'
import { TodosModule } from '@modules/module.todos'
import { ActivityGroupsModule } from '@modules/module.activityGroups'

@Module([
  {
    token: 'TodosModule',
    useFactory: (): Router => {
      return Container.resolve(TodosModule).route.main()
    }
  },
  {
    token: 'ActivityGroupsModule',
    useFactory: (): Router => {
      return Container.resolve(ActivityGroupsModule).route.main()
    }
  }
])
@Injectable()
export class AppModule {}
