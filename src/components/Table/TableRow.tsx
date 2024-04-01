import { TableRowData } from './types';

export type TableRowProps = {
    columns: string[];
    rowData: TableRowData;
    onEdit: () => void;
};

function TableRow({ columns, rowData, onEdit }: TableRowProps) {
    return (
        <tr className='odd:bg-white even:bg-gray-50 border-b last:border-b-0 text-center'>
            {columns.map((columnName, i) => (
                <td key={i} className='px-6 py-3'>
                    {!rowData[columnName] ? <span className='text-gray-400'>-</span> : String(rowData[columnName])}
                </td>
            ))}
            <td className='px-6 py-3'>
                <button onClick={onEdit} className='button'>
                    Edit
                </button>
            </td>
        </tr>
    );
}

export default TableRow;
