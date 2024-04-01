import { TableRowData } from '@/components/Table/types';
import { Types } from 'mongoose';

export interface ITableData {
    _id: Types.ObjectId;
    type: string;
    data: TableRowData;
    paths: Record<string, string>;
}

export interface IClientTableData extends Omit<ITableData, '_id'> {
    _id: string;
}
