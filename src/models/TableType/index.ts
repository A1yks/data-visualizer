import { Schema, model, models } from 'mongoose';
import { ITableType } from './types';

const tableTypeSchema = new Schema<ITableType>(
    {
        type: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { collection: 'table_types' }
);

export default models.TableType || model<ITableType>('TableType', tableTypeSchema);
