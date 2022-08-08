import { Request, Response, Handler, NextFunction } from 'express'
import { OutgoingMessage } from 'http'
import { StatusCodes as status, getStatusCode } from 'http-status-codes'

import { TodosService } from '@services/service.todos'
import { Controller, Inject } from '@helpers/helper.di'
import { APIResponse } from '@helpers/helper.apiResponse'

@Controller()
export class TodosController {
  constructor(@Inject('TodosService') private service: TodosService) {}

  createTodos(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.createTodos(req.body)
        return res.status(status.CREATED).json(response)
      } catch (e: any) {
        return res.status(getStatusCode(e.status)).json(e)
      }
    }
  }

  getAllTodos(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getAllTodos()
        return res.status(status.OK).json(response)
      } catch (e: any) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(e)
      }
    }
  }

  getTodosById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getTodosById(req.params as any)
        return res.status(status.OK).json(response)
      } catch (e: any) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(e)
      }
    }
  }

  deleteTodosById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.deleteTodosById(req.params as any)
        return res.status(status.OK).json(response)
      } catch (e: any) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(e)
      }
    }
  }

  updateTodosById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.updateTodosById(req.params as any, req.body)
        return res.status(status.OK).json(response)
      } catch (e: any) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(e)
      }
    }
  }
}
