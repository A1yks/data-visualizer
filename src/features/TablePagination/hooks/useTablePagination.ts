import { useRef, useCallback, useEffect } from 'react';
import { useGetData } from '@/api/data/hooks';
import usePaginationData from '@/hooks/usePaginationData';

function useTablePagination() {
    const { page, limit } = usePaginationData();
    const { data: result, isFetching } = useGetData();
    const pushedStateRef = useRef(false);
    const amount = result?.amount || 0;

    const handlePageChange = useCallback(({ selected }: { selected: number }) => {
        window.history.pushState({}, '', `?page=${selected + 1}`);
        pushedStateRef.current = true;
    }, []);

    useEffect(() => {
        pushedStateRef.current = false;
    }, [page]);

    const pages = Math.ceil(amount / limit);
    const showingText = `${page * limit - limit + 1}-${page * limit > amount ? amount : page * limit}`;

    return { result, isFetching, pushedStateRef, showingText, pages, page, handlePageChange };
}

export default useTablePagination;
