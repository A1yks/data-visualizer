import TableRow from './TableRow';
import { memo } from 'react';
import { useTableContext } from '@/components/Table/TableContext';
import { TableDistinctiveObject } from '@/components/Table/types';

export type TableRowsProps = {
    onEdit: (rowData: TableDistinctiveObject) => () => void;
};

function TableRows({ onEdit }: TableRowsProps) {
    const {
        parsedData: { rows, columns },
    } = useTableContext();

    return (
        <>
            {rows.map((row) => (
                <TableRow key={row.id} columns={columns} rowData={row.data} onEdit={onEdit(row)} />
            ))}
        </>
    );
}

export default memo(TableRows);
