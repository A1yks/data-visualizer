import { ITableData } from '@/models/TableData/types';
import { ITableType } from '@/models/TableType/types';

declare module 'mongoose' {
    interface Models {
        TableType: Model<ITableType>;
        TableData: Model<ITableData>;
    }
}
