import dbConnect from '@/db/connect';
import { NextRequest, NextResponse } from 'next/server';

type Callback<Context> = (req: NextRequest, context: Context) => unknown;

function withErrorsHandler<Context>(callback: Callback<Context>) {
    return async (req: NextRequest, context: Context) => {
        try {
            await dbConnect();
            return await callback(req, context);
        } catch (err) {
            if (err instanceof Error) {
                return NextResponse.json({ error: err.message }, { status: 400 });
            }

            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    };
}

export default withErrorsHandler;
