import { TableDistinctiveObject } from '@/components/Table/types';
import { IClientTableData } from '@/models/TableData/types';

function toTableData(apiData: IClientTableData[]): TableDistinctiveObject[] {
    return apiData.map((item) => ({ id: item._id, data: item.data }));
}

export default toTableData;
