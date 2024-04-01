import { TableColumnData, TableDistinctiveObject } from '@/components/Table/types';

function getEditableRowData(row: TableDistinctiveObject, editableColumns: TableColumnData[]) {
    const editableRow: TableDistinctiveObject = { ...row, data: {} };

    editableColumns.forEach((column) => {
        editableRow.data[column] = row.data[column];
    });

    return editableRow;
}

export default getEditableRowData;
