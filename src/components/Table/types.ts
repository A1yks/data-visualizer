export type TableGenericObject = Record<string, unknown>;

export type TableDistinctiveObject = { id: React.Key; data: TableGenericObject };

export type TableRowData = Record<string, string>;

export type TableColumnData = string;
