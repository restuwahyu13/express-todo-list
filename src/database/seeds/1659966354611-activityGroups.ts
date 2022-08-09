import { Connection, Repository } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import faker from 'faker'

import { ActivityGroups } from '@entities/entitie.activityGroups'

export class ActivityGroupsSeeds implements Seeder {
  async run(_factory: Factory, connection: Connection): Promise<void> {
    if (connection.isConnected) {
      const repository: Repository<ActivityGroups> = await connection.getRepository(ActivityGroups)
      for (let i = 1; i <= 10; i++) {
        await repository.insert({ title: faker.lorem.word(5), email: faker.internet.email() })
      }
    }
  }
}
