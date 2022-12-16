import { OrderBy, OrderDirection } from './constants';
import { Request } from 'express';
export interface ICommonGetListQuery {
    page?: number;
    limit?: number;
    orderBy?: OrderBy;
    orderDirection?: OrderDirection;
}

export interface IRequestWithUser<
    P extends {},
    ResB extends {},
    ReqB extends {},
    Q extends {}
> extends Request<P, ResB, ReqB, Q> {
    userId?: number;
}
