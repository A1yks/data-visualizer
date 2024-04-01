import { NextResponse } from 'next/server';
import withErrorsHandler from '@/utils/withErrorsHandler';
import * as TableTypesService from '@/services/tableTypes';

export const GET = withErrorsHandler(async () => {
    const types = await TableTypesService.getTypes();

    return NextResponse.json({ data: types }, { status: 200 });
});
