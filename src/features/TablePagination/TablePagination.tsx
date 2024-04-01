'use client';

import { memo } from 'react';
import Pagination from '@/components/Pagination';
import c from 'clsx';
import Spinner from '@/components/Spinner';
import useTablePagination from './hooks/useTablePagination';

export type TablePaginationProps = {
    className?: string;
};

function TablePagination({ className }: TablePaginationProps) {
    const { result, isFetching, pushedStateRef, showingText, pages, page, handlePageChange } = useTablePagination();

    if (result === undefined) {
        return null;
    }

    return (
        <div className={c('flex gap-4 justify-center sm:justify-between flex-wrap items-center border-t py-8', className)}>
            <div className='flex gap-4 relative'>
                {isFetching && pushedStateRef.current && (
                    <Spinner size='small' className='block sm:hidden absolute left-[-32px] top-1/2 -translate-y-1/2' />
                )}
                <span>
                    Showing <span className='font-bold'>{showingText}</span> of <span className='font-bold'>{result.amount}</span>
                </span>
            </div>
            <div className='flex gap-4'>
                {isFetching && pushedStateRef.current && <Spinner size='small' className='sm:block hidden' />}
                <Pagination pageCount={pages} initialPage={page - 1} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default memo(TablePagination);
