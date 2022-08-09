import { StatusCodes as status } from 'http-status-codes'
import { DeleteResult } from 'typeorm'

import { ActivityGroups } from '@entities/entitie.activityGroups'
import { Inject, Service, Repository } from '@helpers/helper.di'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { DTOActivityGroups, DTOActivityGroupsId } from '@dtos/dto.activityGroups'

@Service()
export class ActivityGroupsService {
  constructor(@Inject('ActivityGroupsModel') private model: Repository<ActivityGroups>) {}

  async createActivityGroups(body: DTOActivityGroups): Promise<APIResponse> {
    try {
      if (!body.hasOwnProperty('title') || body.title === '') throw apiResponse(status.BAD_REQUEST, `title cannot be null`)

      const todos: InstanceType<typeof ActivityGroups> = new ActivityGroups()
      todos.title = body.title
      todos.email = body.email

      const insertData: ActivityGroups = await this.model.save(todos)

      return Promise.resolve(apiResponse(status.CREATED, 'Success', insertData))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message))
    }
  }

  async getAllActivityGroups(): Promise<APIResponse> {
    try {
      const getAllActivity: ActivityGroups[] = await this.model.find({})

      return Promise.resolve(apiResponse(status.OK, 'Success', getAllActivity))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message))
    }
  }

  async getActivityGroupsById(params: DTOActivityGroupsId): Promise<APIResponse> {
    try {
      const getActivityById: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!getActivityById) throw apiResponse(status.NOT_FOUND, `Activity with ID ${params.id} Not Found`)

      return Promise.resolve(apiResponse(status.OK, 'Success', getActivityById))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message))
    }
  }

  async deleteActivityGroupsById(params: DTOActivityGroupsId): Promise<APIResponse> {
    try {
      const getActivityById: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!getActivityById) throw apiResponse(status.NOT_FOUND, `Activity with ID ${params.id} Not Found`)

      const deleteData: DeleteResult = await this.model.delete({ id: getActivityById.id })
      if (!deleteData) throw apiResponse(status.NOT_FOUND, `Activity with ID ${params.id} Not Found`)

      return Promise.resolve(apiResponse(status.OK, 'Success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message))
    }
  }

  async updateActivityGroupsById(params: DTOActivityGroupsId, body: DTOActivityGroups): Promise<APIResponse> {
    try {
      const checkActivityId: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!checkActivityId) throw apiResponse(status.NOT_FOUND, `Activity with ID ${params.id} Not Found`)

      checkActivityId.title = body.title

      const updateData = await this.model.save(checkActivityId)
      if (!updateData) throw apiResponse(status.NOT_FOUND, `Todo with ID ${params.id} Not Found`)

      return Promise.resolve(apiResponse(status.OK, 'Success', updateData))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message))
    }
  }
}
