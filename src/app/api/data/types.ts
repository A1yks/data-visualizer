import { ITableData } from '@/models/TableData/types';

export type GetDataReq = {
    type: string;
    limit?: number;
    offset?: number;
};

export type UpdateDataReq = {
    id: string;
    data: Record<string, string>;
};

export type AddDataReq = Omit<ITableData, '_id'>;
