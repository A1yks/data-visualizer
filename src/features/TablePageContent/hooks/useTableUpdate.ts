import { updateData, getData } from '@/api/data';
import { UpdateDataReq } from '@/app/api/data/types';
import { TableDistinctiveObject } from '@/components/Table/types';
import useGetTableType from '@/hooks/useGetTableType';
import usePaginationData from '@/hooks/usePaginationData';
import parseData from '@/utils/parseData';
import toTableData from '@/utils/toTableData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

function useTableUpdate() {
    const queryClient = useQueryClient();
    const tableType = useGetTableType();
    const { enqueueSnackbar } = useSnackbar();
    const { limit, offset, filters } = usePaginationData();

    const { mutateAsync } = useMutation({
        mutationFn: updateData,
        onSuccess(updatedRow) {
            queryClient.setQueryData(
                ['data', { type: tableType, filters, limit, offset }],
                (oldData: Awaited<ReturnType<typeof getData>>): typeof oldData => {
                    const newData = oldData.data.map((row) => (row._id === updatedRow._id ? updatedRow : row));

                    return {
                        ...oldData,
                        data: newData,
                        parsedData: parseData(toTableData(newData)),
                    };
                }
            );
            enqueueSnackbar('Data was successfully updated', { variant: 'success' });
        },
    });

    const handleEdit = useCallback(
        async (data: TableDistinctiveObject) => {
            await mutateAsync(data as UpdateDataReq);
        },
        [mutateAsync]
    );

    return { handleEdit };
}

export default useTableUpdate;
