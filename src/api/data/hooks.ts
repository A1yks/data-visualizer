import { getData, getTableTypes } from '.';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useGetTableType from '@/hooks/useGetTableType';
import usePaginationData from '@/hooks/usePaginationData';

export function useGetData() {
    const type = useGetTableType();
    const { offset, filters, limit } = usePaginationData();

    return useQuery({
        queryKey: ['data', { type, filters, limit, offset }],
        queryFn: () => getData(type, filters, offset, limit),
        placeholderData: keepPreviousData,
    });
}

export function useGetTypes() {
    return useQuery({
        queryKey: ['types'],
        queryFn: getTableTypes,
    });
}
