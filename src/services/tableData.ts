import TableData from '@/models/TableData';
import * as TableTypesService from '@/services/tableTypes';
import { PAGE_LIMIT } from '@/constants/tables';
import { ITableData } from '@/models/TableData/types';
import { FilterQuery } from 'mongoose';
import escapeRegExp from '@/utils/escapeRegExp';
import getPaths from '@/utils/getPaths';
import { TableRowData } from '@/components/Table/types';

export async function getData(type: string, filters: Record<string, string>, limit = 20, offset = PAGE_LIMIT) {
    const filterQuery: FilterQuery<ITableData> = { type };
    const filterKeys = Object.keys(filters);

    if (filterKeys.length > 0) {
        const paths = await findPaths(type, filterKeys);

        filterKeys.forEach((key) => (filterQuery[`data.${paths[key]}`] = new RegExp(`^${escapeRegExp(filters[key])}`, 'i')));
    }

    const [data, amount] = await Promise.all([TableData.find(filterQuery).limit(limit).skip(offset), TableData.countDocuments(filterQuery)]);

    return { data, amount };
}

export async function updateData(id: string, newData: TableRowData) {
    const existingData = await TableData.findById(id);

    if (existingData === null) {
        throw new Error('Data not found');
    }

    const dataToSave: TableRowData = {};
    const { paths } = existingData;

    for (const key in newData) {
        const path = `data.${paths[key]}`;

        dataToSave[path] = newData[key];
    }

    return await TableData.findOneAndUpdate({ _id: id }, dataToSave, { new: true });
}

export async function addData(type: string, data: TableRowData) {
    const paths = getPaths(data);

    const [createdData] = await Promise.all([TableData.create({ type, data, paths }), TableTypesService.addType(type)]);

    return createdData;
}

async function findPaths(type: string, keys: string[]) {
    const doc = await TableData.findOne({ type, $and: keys.map((key) => ({ [`paths.${key}`]: { $ne: null } })) });

    return doc?.paths || {};
}
