'use client';

import Table from '@/components/Table';
import Spinner from '@/components/Spinner';
import TablePagination from '@/features/TablePagination';
import Filters from '@/features/Filters';
import useTablePage from './hooks/useTablePage';
import useTableUpdate from './hooks/useTableUpdate';

function TablePageContent() {
    const { result, isLoading, isError, error, mappedData, showPagination } = useTablePage();
    const { handleEdit } = useTableUpdate();

    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-center items-center p-4'>
                <Spinner size='large' />
            </div>
        );
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    if (result === undefined) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className='flex flex-1 h-full '>
            <div className='flex flex-1 h-full pt-4 px-4'>
                <div className='flex flex-col w-full h-full'>
                    <Table data={mappedData} onEdit={handleEdit} />
                    {showPagination && <TablePagination className='mt-auto' />}
                </div>
            </div>
            <div className='min-w-[150px] w-[15%] hidden sm:block border-l'>
                <Filters />
            </div>
        </div>
    );
}

export default TablePageContent;
