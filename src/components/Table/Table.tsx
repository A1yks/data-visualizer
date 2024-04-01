'use client';

import c from 'clsx';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { TableDistinctiveObject } from './types';
import { TableProvider } from './TableContext';

export type TableProps = {
    className?: string;
    data: TableDistinctiveObject[];
    onEdit: (data: TableDistinctiveObject) => MaybePromise<void>;
};

function Table({ data, className, onEdit }: TableProps) {
    const hasData = data.length > 0;

    return (
        <TableProvider data={data}>
            <div className={c('w-full h-full flex flex-col rounded-xl overflow-hidden', className)}>
                {hasData ? (
                    <div className='overflow-auto relative h-full'>
                        <table className='w-full min-w-[1000px] sm:text-base text-sm text-gray-500 absolute inset-0'>
                            <TableHead />
                            <TableBody onEdit={onEdit} />
                        </table>
                    </div>
                ) : (
                    <div className='text-center m-auto font-bold text-lg'>No data found</div>
                )}
            </div>
        </TableProvider>
    );
}

export default Table;
