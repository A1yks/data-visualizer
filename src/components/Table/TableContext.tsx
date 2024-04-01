import parseData from '@/utils/parseData';
import { ReactNode, createContext, memo, useContext, useMemo } from 'react';
import { TableProps } from '.';

export type TableProviderProps = {
    children: ReactNode;
    data: TableProps['data'];
};

export type TableContextType = {
    data: TableProps['data'];
    parsedData: ReturnType<typeof parseData>;
};

const TableContext = createContext<TableContextType | null>({ data: [], parsedData: { columns: [], rows: [], textFields: [] } });

export function useTableContext() {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error('useTableContext must be used within a TableProvider');
    }

    return context;
}

function TableContextProvider({ children, data }: TableProviderProps) {
    const value = useMemo(() => ({ data, parsedData: parseData(data) }), [data]);

    return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export const TableProvider = memo(TableContextProvider);
