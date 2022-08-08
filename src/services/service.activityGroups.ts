import { ActivityGroups } from '@entities/entitie.activityGroups'
import { Inject, Service, Repository } from '@helpers/helper.di'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { DTOActivityGroups, DTOActivityGroupsId } from '@dtos/dto.activityGroups'

@Service()
export class ActivityGroupsService {
  constructor(@Inject('ActivityGroupsModel') private model: Repository<ActivityGroups>) {}

  async createActivityGroups(body: DTOActivityGroups): Promise<APIResponse> {
    try {
      await this.model.insert({ title: body.title, email: body.email })
      const getActivityRes: ActivityGroups = await this.model.findOne({ email: body.email }, { select: ['id', 'title', 'email', 'created_at', 'updated_at'] })

      return Promise.resolve(apiResponse('Success', 'Success', getActivityRes))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.status, e.message || e.message))
    }
  }

  async getAllActivityGroups(): Promise<APIResponse> {
    try {
      const getAllActivity: ActivityGroups[] = await this.model.find({})

      return Promise.resolve(apiResponse('Success', 'Success', getAllActivity))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.status, e.message || e.message))
    }
  }

  async getActivityGroupsById(params: DTOActivityGroupsId): Promise<APIResponse> {
    try {
      const getActivityById: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!getActivityById) throw apiResponse('Not Found', `Activity with ID ${params.id} Not Found`)

      return Promise.resolve(apiResponse('Success', 'Success', getActivityById))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.status, e.message || e.message))
    }
  }

  async deleteActivityGroupsById(params: DTOActivityGroupsId): Promise<APIResponse> {
    try {
      const getActivityById: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!getActivityById) throw apiResponse('Not Found', `Activity with ID ${params.id} Not Found`)

      await this.model.delete({ id: getActivityById.id })

      return Promise.resolve(apiResponse('Success', 'Success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.status, e.message || e.message))
    }
  }

  async updateActivityGroupsById(params: DTOActivityGroupsId, body: DTOActivityGroups): Promise<APIResponse> {
    try {
      const checkActivityId: ActivityGroups = await this.model.findOne({ id: params.id })
      if (!checkActivityId) throw apiResponse('Not Found', `Activity with ID ${params.id} Not Found`)

      await this.model.update({ id: params.id }, { title: body.title, email: body.email })
      const getActivityById: ActivityGroups = await this.model.findOne({ id: checkActivityId.id })

      return Promise.resolve(apiResponse('Success', 'Success', getActivityById))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.status, e.message || e.message))
    }
  }
}
