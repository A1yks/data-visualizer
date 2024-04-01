import { useCallback, useState } from 'react';
import useErrorsHandler from '@/hooks/useErrorsHandler';
import getEditableRowData from '@/utils/getEditableRowData';
import { TableDistinctiveObject, TableRowData } from '@/components/Table/types';
import { TableProps } from '@/components/Table';
import { useTableContext } from '@/components/Table/TableContext';

function useTableBody(onEdit: TableProps['onEdit']) {
    const {
        parsedData: { textFields },
    } = useTableContext();
    const [modalActive, setModalActive] = useState(false);
    const [editableFields, setEditableFields] = useState<TableDistinctiveObject | null>(null);

    const handleEdit = useCallback(
        (rowData: TableDistinctiveObject) => {
            return () => {
                setEditableFields(getEditableRowData(rowData, textFields || []));
                setModalActive(true);
            };
        },
        [textFields]
    );

    const handleSubmit = useErrorsHandler(async (formState: TableRowData, isDirty: boolean) => {
        if (editableFields !== null) {
            if (isDirty) {
                await onEdit({ id: editableFields.id, data: formState });
            }

            setModalActive(false);
        }
    });

    const handleClose = useCallback(() => {
        setModalActive(false);
    }, []);

    return {
        modalActive,
        editableFields,
        setModalActive,
        handleEdit,
        handleSubmit,
        handleClose,
    };
}

export default useTableBody;
