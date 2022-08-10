import { StatusCodes as status } from 'http-status-codes'
import { Request } from 'express'
import { DeleteResult } from 'typeorm'

import { Todos } from '@entities/entitie.todos'
import { Activities } from '@entities/entitie.activityGroups'
import { Inject, Service, Repository } from '@helpers/helper.di'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { DTOTodos, DTOTodosId } from '@dtos/dto.todos'

@Service()
export class TodosService {
  constructor(@Inject('TodosModel') private model: Repository<Todos>, @Inject('ActivityGroupsModel') private activityGroups: Repository<Activities>) {}

  async createTodos(body: DTOTodos): Promise<APIResponse> {
    try {
      if (!body.hasOwnProperty('title') || body.title === '') throw apiResponse(status.BAD_REQUEST, `title cannot be null`)
      else if (!body.hasOwnProperty('activity_group_id') || body.activity_group_id === '') throw apiResponse(status.BAD_REQUEST, `activity_group_id cannot be null`)

      const checkActivityId: Activities = await this.activityGroups.findOne({ id: body.activity_group_id })
      if (!checkActivityId) throw apiResponse(status.NOT_FOUND, `Activity with activity_group_id ${body.activity_group_id} Not Found`)

      const todos: InstanceType<typeof Todos> = new Todos()
      todos.title = body.title
      todos.activity_group_id = body.activity_group_id
      todos.priority = 'very-high'

      const insertData: Todos = await this.model.save(todos)
      if (!insertData) throw apiResponse(status.FORBIDDEN, `Insert new todo failed`)

      return Promise.resolve(apiResponse(status.CREATED, 'Success', insertData))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode || status.BAD_REQUEST, e.message))
    }
  }

  async getAllTodos(req: Request): Promise<APIResponse> {
    try {
      let getAllTodosResult: Todos[]

      if (req.query.hasOwnProperty('activity_group_id')) {
        getAllTodosResult = await this.model.find({ activity_group_id: req.query.activity_group_id as any })
      } else {
        getAllTodosResult = await this.model.find({})
      }

      return Promise.resolve(apiResponse(status.OK, 'Success', getAllTodosResult))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode || status.BAD_REQUEST, e.message))
    }
  }

  async getTodosById(params: DTOTodosId): Promise<APIResponse> {
    try {
      const getTodoById: Todos = await this.model.findOne({ id: params.id }, { order: { id: 'DESC' } })
      if (!getTodoById) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

      return Promise.resolve(apiResponse(status.OK, 'Success', getTodoById))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode || status.BAD_REQUEST, e.message))
    }
  }

  async deleteTodosById(params: DTOTodosId): Promise<APIResponse> {
    try {
      const getTodoById: Todos = await this.model.findOne({ id: params.id })
      if (!getTodoById) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

      const deleteData: DeleteResult = await this.model.delete({ id: getTodoById.id })
      if (!deleteData) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

      return Promise.resolve(apiResponse(status.OK, 'Success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode || status.BAD_REQUEST, e.message))
    }
  }

  async updateTodosById(params: DTOTodosId, body: DTOTodos): Promise<APIResponse> {
    try {
      let getDataTodo: Todos

      const checkTodoById: Todos = await this.model.findOne({ id: params.id })
      if (!checkTodoById) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

      if (body.hasOwnProperty('title') || body.hasOwnProperty('activity_group_id')) {
        checkTodoById.title = body.title
        checkTodoById.activity_group_id = body.activity_group_id

        const updateData = await this.model.save(checkTodoById)
        if (!updateData) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

        getDataTodo = updateData
      } else {
        getDataTodo = checkTodoById
      }

      return Promise.resolve(apiResponse(status.OK, 'Success', getDataTodo))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode || status.BAD_REQUEST, e.message))
    }
  }
}
