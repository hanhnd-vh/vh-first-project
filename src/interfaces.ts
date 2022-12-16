import { OrderBy, OrderDirection } from './constants';

export interface ICommonGetListQuery {
    page?: number;
    limit?: number;
    orderBy?: OrderBy;
    orderDirection?: OrderDirection;
}
