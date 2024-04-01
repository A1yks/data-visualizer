import { Types } from 'mongoose';

export interface ITableType {
    _id: Types.ObjectId;
    type: string;
}

export interface IClientTableType extends Omit<ITableType, '_id'> {
    _id: string;
}
