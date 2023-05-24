import { Request, Response, NextFunction } from 'express'
// interface extendsRequest extends Request {
//     objKey: any
// }

export type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void
export type MiddlewareExtendRequestFn = (req: any, res: Response, next: NextFunction) => void