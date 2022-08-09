import { Connection, Repository } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import faker from 'faker'

import { Todos } from '@entities/entitie.todos'

export class TodosSeeds implements Seeder {
  async run(_factory: Factory, connection: Connection): Promise<void> {
    if (connection.isConnected) {
      const repository: Repository<Todos> = await connection.getRepository(Todos)
      for (let i = 1; i <= 10; i++) {
        await repository.insert({ title: faker.lorem.word(5), activity_group_id: i })
      }
    }
  }
}
