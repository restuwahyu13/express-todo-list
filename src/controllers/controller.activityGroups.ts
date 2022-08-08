import { Request, Response, Handler, NextFunction } from 'express'
import { OutgoingMessage } from 'http'
import { getStatusCode, StatusCodes as status } from 'http-status-codes'

import { ActivityGroupsService } from '@services/service.activityGroups'
import { Controller, Inject } from '@helpers/helper.di'
import { APIResponse } from '@helpers/helper.apiResponse'

@Controller()
export class ActivityGroupsController {
  constructor(@Inject('ActivityGroupsService') private service: ActivityGroupsService) {}

  createActivityGroups(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.createActivityGroups(req.body)
        return res.status(status.CREATED).json(response)
      } catch (e: any) {
        return res.status(getStatusCode(e.status)).json(e)
      }
    }
  }

  getAllActivityGroups(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getAllActivityGroups()
        return res.status(status.OK).json(response)
      } catch (e: any) {
        return res.status(getStatusCode(e.status)).json(e)
      }
    }
  }

  getActivityGroupsById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getActivityGroupsById(req.params as any)
        return res.status(status.OK).json(response)
      } catch (e: any) {
        return res.status(getStatusCode(e.status)).json(e)
      }
    }
  }

  deleteActivityGroupsById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.deleteActivityGroupsById(req.params as any)
        return res.status(status.OK).json(response)
      } catch (e: any) {
        return res.status(getStatusCode(e.status)).json(e)
      }
    }
  }

  updateActivityGroupsById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.updateActivityGroupsById(req.params as any, req.body)
        return res.status(status.OK).json(response)
      } catch (e: any) {
        return res.status(getStatusCode(e.status)).json(e)
      }
    }
  }
}
