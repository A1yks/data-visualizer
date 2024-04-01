import { useMemo } from 'react';
import { useGetData } from '@/api/data/hooks';
import { TableDistinctiveObject } from '@/components/Table/types';
import { PAGE_LIMIT } from '@/constants/tables';

function useTablePage() {
    const { data: result, isLoading, isError, error } = useGetData();
    const hasData = result !== undefined && result.data.length > 0 && result.amount > 0;
    const showPagination = hasData && result.amount > PAGE_LIMIT;
    const mappedData = useMemo<TableDistinctiveObject[]>(
        () =>
            result?.data.map((item) => {
                return {
                    id: item._id,
                    data: item.data,
                };
            }) || [],
        [result?.data]
    );

    return { result, isLoading, isError, error, mappedData, showPagination };
}

export default useTablePage;
