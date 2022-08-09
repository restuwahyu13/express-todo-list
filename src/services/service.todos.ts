import { StatusCodes as status } from 'http-status-codes'

import { Todos } from '@entities/entitie.todos'
import { ActivityGroups } from '@entities/entitie.activityGroups'
import { Inject, Service, Repository } from '@helpers/helper.di'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { DTOTodos, DTOTodosId } from '@dtos/dto.todos'

@Service()
export class TodosService {
  constructor(@Inject('TodosModel') private model: Repository<Todos>, @Inject('ActivityGroupsModel') private activityGroups: Repository<ActivityGroups>) {}

  async createTodos(body: DTOTodos): Promise<APIResponse> {
    try {
      if (!body.hasOwnProperty('title') || body.title === '') throw apiResponse(status.BAD_REQUEST, `title cannot be null`)
      else if (!body.hasOwnProperty('activity_group_id') || body.activity_group_id === '') throw apiResponse(status.BAD_REQUEST, `activity_group_id cannot be null`)

      const checkActivityId: ActivityGroups = await this.activityGroups.findOne({ id: body.activity_group_id })
      if (!checkActivityId) throw apiResponse(status.NOT_FOUND, `Activity with activity_group_id ${body.activity_group_id} Not Found`)

      await this.model.insert({ title: body.title, activity_group_id: checkActivityId.id })
      const getTodo: Todos = await this.model.findOne({ title: body.title }, { order: { id: 'DESC' } })

      return Promise.resolve(apiResponse(status.CREATED, 'Success', getTodo))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }

  async getAllTodos(): Promise<APIResponse> {
    try {
      const getAllTodos: Todos[] = await this.model.find({})
      if (!getAllTodos.length) throw apiResponse(status.NOT_FOUND, `Todo data Not Found`)

      return Promise.resolve(apiResponse(status.OK, 'Success', getAllTodos))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }

  async getTodosById(params: DTOTodosId): Promise<APIResponse> {
    try {
      const getTodoById: Todos = await this.model.findOne({ id: params.id })
      if (!getTodoById) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

      return Promise.resolve(apiResponse(status.OK, 'Success', getTodoById))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }

  async deleteTodosById(params: DTOTodosId): Promise<APIResponse> {
    try {
      const getTodoById: Todos = await this.model.findOne({ id: params.id })
      if (!getTodoById) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

      await this.model.delete({ id: getTodoById.id })

      return Promise.resolve(apiResponse(status.OK, 'Success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }

  async updateTodosById(params: DTOTodosId, body: DTOTodos): Promise<APIResponse> {
    try {
      const checkTodoById: Todos = await this.model.findOne({ id: params.id })
      if (!checkTodoById) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

      await this.model.update({ id: params.id }, { title: body.title, activity_group_id: body.activity_group_id })
      const getTodoById: Todos = await this.model.findOne({ id: checkTodoById.id }, { order: { id: 'DESC' } })

      return Promise.resolve(apiResponse(status.OK, 'Success', getTodoById))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }
}
