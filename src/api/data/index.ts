import { api } from '..';
import { IClientTableData } from '@/models/TableData/types';
import { PAGE_LIMIT } from '@/constants/tables';
import { UpdateDataReq } from '@/app/api/data/types';
import prefetchBuiler from '@/utils/prefetchBuilder';
import parseData from '@/utils/parseData';
import toTableData from '@/utils/toTableData';

export type GetDataRes = {
    data: IClientTableData[];
    amount: number;
};

export async function getData(type: string, filters: Record<string, string>, offset = 0, limit = PAGE_LIMIT) {
    const response = await api
        .get<GetDataRes>('/data', {
            params: { type, ...filters, limit, offset },
        })
        .then((r) => r.data);

    return { ...response, parsedData: parseData(toTableData(response.data)) };
}

export const prefetchData = prefetchBuiler((type: string, filters: Record<string, string>, offset: number = 0, limit: number = PAGE_LIMIT) => ({
    queryKey: ['data', { type, filters, limit, offset }],
    queryFn: () => getData(type, filters, offset, limit),
}));

export async function updateData(data: UpdateDataReq) {
    return await api.patch<IClientTableData>(`/data`, data).then((r) => r.data);
}

export async function getTableTypes() {
    return await api.get<string[]>('/data/types').then((r) => r.data);
}

export const prefetchTableTypes = prefetchBuiler(() => ({
    queryKey: ['types'],
    queryFn: getTableTypes,
}));
