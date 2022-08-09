import { StatusCodes as status } from 'http-status-codes'

import { ActivityGroups } from '@entities/entitie.activityGroups'
import { Inject, Service, Repository } from '@helpers/helper.di'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { DTOActivityGroups, DTOActivityGroupsId } from '@dtos/dto.activityGroups'
import { IsNull, Not } from 'typeorm'

@Service()
export class ActivityGroupsService {
  constructor(@Inject('ActivityGroupsModel') private model: Repository<ActivityGroups>) {}

  async createActivityGroups(body: DTOActivityGroups): Promise<APIResponse> {
    try {
      if (!body.hasOwnProperty('title') || body.title === '') throw apiResponse(status.BAD_REQUEST, `title cannot be null`)

      await this.model.insert({ title: body.title, email: body.email })
      const getActivityRes: ActivityGroups = await this.model.findOne({ email: body.email }, { select: ['id', 'title', 'email', 'created_at', 'updated_at'], order: { id: 'DESC' } })

      return Promise.resolve(apiResponse(status.CREATED, 'Success', getActivityRes))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }

  async getAllActivityGroups(): Promise<APIResponse> {
    try {
      const getAllActivity: ActivityGroups[] = await this.model.find({})
      if (!getAllActivity.length) throw apiResponse(status.NOT_FOUND, `Activity data Not Found`)

      return Promise.resolve(apiResponse(status.OK, 'Success', getAllActivity))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }

  async getActivityGroupsById(params: DTOActivityGroupsId): Promise<APIResponse> {
    try {
      const getActivityById: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!getActivityById) throw apiResponse(status.NOT_FOUND, `Activity with ID ${params.id} Not Found`)

      console.log('getActivityById', getActivityById)

      return Promise.resolve(apiResponse(status.OK, 'Success', getActivityById))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }

  async updateActivityGroupsById(params: DTOActivityGroupsId, body: DTOActivityGroups): Promise<APIResponse> {
    try {
      const checkActivityId: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!checkActivityId) throw apiResponse(status.NOT_FOUND, `Activity with ID ${params.id} Not Found`)

      checkActivityId.title = body.title

      await this.model.update({ id: checkActivityId.id }, { title: checkActivityId.title, email: checkActivityId.email })
      const getActivityById: ActivityGroups = await this.model.findOne({ where: { id: checkActivityId.id } })

      return Promise.resolve(apiResponse(status.OK, 'Success', getActivityById))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }

  async deleteActivityGroupsById(params: DTOActivityGroupsId): Promise<APIResponse> {
    try {
      const getActivityById: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!getActivityById) throw apiResponse(status.NOT_FOUND, `Activity with ID ${params.id} Not Found`)

      await this.model.delete({ id: getActivityById.id })

      return Promise.resolve(apiResponse(status.OK, 'Success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.statusCode, e.message || e.message))
    }
  }
}
