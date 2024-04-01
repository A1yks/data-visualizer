import { TableDistinctiveObject, TableGenericObject, TableRowData } from '@/components/Table/types';
import isObject from './isObject';

function parseData(data: TableDistinctiveObject[]) {
    const columns = new Set<string>();
    const textFields = new Set<string>();

    // Рекурсивная функция используется для для того, чтобы убрать вложенность в объектах таблицы
    function flatRow(row: TableGenericObject): TableRowData {
        return Object.entries(row).reduce<TableRowData>((acc, [columnName, value]) => {
            if (isObject(value)) {
                return Object.assign(acc, flatRow(value));
            }

            columns.add(columnName);

            if (typeof value === 'string') {
                textFields.add(columnName);
            }

            acc[columnName] = String(value);

            return acc;
        }, {});
    }

    const rows = data.map((row) => ({ ...row, data: flatRow(row.data) }));

    return { columns: Array.from(columns), rows, textFields: Array.from(textFields) };
}

export default parseData;
