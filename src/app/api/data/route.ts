import { NextResponse } from 'next/server';
import withErrorsHandler from '@/utils/withErrorsHandler';
import * as TableDataService from '@/services/tableData';
import { addDataSchema, getDataSchema, updateDataSchema } from './validation';

export const GET = withErrorsHandler(async (req) => {
    const { searchParams } = req.nextUrl;
    const params = Object.fromEntries(searchParams.entries());
    const { type, limit, offset, ...filters } = await getDataSchema.validateAsync(params);

    const data = await TableDataService.getData(decodeURIComponent(type), filters, limit, offset);

    return NextResponse.json({ data }, { status: 200 });
});

export const PATCH = withErrorsHandler(async (req) => {
    const body = await req.json();
    const { id, data } = await updateDataSchema.validateAsync(body);

    const updatedData = await TableDataService.updateData(id, data);

    return NextResponse.json({ data: updatedData }, { status: 200 });
});

export const POST = withErrorsHandler(async (req) => {
    const body = await req.json();
    const { type, data } = await addDataSchema.validateAsync(body);

    const addedData = await TableDataService.addData(type, data);

    return NextResponse.json({ data: addedData }, { status: 201 });
});
