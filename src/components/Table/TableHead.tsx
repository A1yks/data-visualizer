import { memo } from 'react';
import { useTableContext } from './TableContext';

function TableHead() {
    const {
        parsedData: { columns },
    } = useTableContext();

    return (
        <thead className='text-gray-700 capitalize bg-gray-50 border-b'>
            <tr className='text-center'>
                {columns.map((column) => (
                    <th key={column} className='px-6 py-3'>
                        {column}
                    </th>
                ))}
                <th className='px-6 py-3'>Action</th>
            </tr>
        </thead>
    );
}

export default memo(TableHead);
