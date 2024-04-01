import { Schema, model, models } from 'mongoose';
import { ITableData } from './types';
import isObject from '@/utils/isObject';

const tableDataSchema = new Schema<ITableData>(
    {
        type: {
            type: String,
            required: true,
        },
        data: {
            type: Schema.Types.Mixed,
            required: true,
            validate: {
                validator(data: ITableData['data']) {
                    return isObject(data);
                },
                message: 'Invalid data object',
            },
        },
        paths: {
            type: Schema.Types.Mixed,
            required: true,
            validate: {
                validator(paths: ITableData['paths']) {
                    return isObject(paths);
                },
                message: 'Invalid paths object',
            },
        },
    },
    {
        collection: 'table_data',
    }
);

export default models.TableData || model<ITableData>('TableData', tableDataSchema);
