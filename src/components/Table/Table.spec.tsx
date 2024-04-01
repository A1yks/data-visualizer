import { RenderResult, render } from '@testing-library/react';
import Table from './Table';
import { TableDistinctiveObject } from './types';

describe('Table', () => {
    const mockData: TableDistinctiveObject[] = [
        { id: 1, data: { name: 'Name 1', nested: { description: 'Description 1' } } },
        { id: 2, data: { name: 'Name 2', description: 'Description 2' } },
    ];

    let utils: RenderResult;

    beforeEach(() => {
        utils = render(<Table data={mockData} onEdit={() => {}} />);
    });

    test('renders table when data is provided', () => {
        const tableElement = utils.getByRole('table');
        expect(tableElement).toBeInTheDocument();
    });

    test('renders correct number of rows when data is provided', () => {
        const rowElements = utils.getAllByRole('row');
        // Add 1 for the header row
        expect(rowElements.length).toBe(mockData.length + 1);
    });

    test('renders "No data found" when no data is provided', () => {
        utils.rerender(<Table data={[]} onEdit={() => {}} />);
        const noDataElement = utils.getByText('No data found');
        expect(noDataElement).toBeInTheDocument();
    });

    test('renders nested data correctly', () => {
        const firstRow = utils.getByRole('row', { name: /Name 1 Description 1/i });
        const secondRow = utils.getByRole('row', { name: /Name 2 Description 2/i });

        expect(firstRow).toBeInTheDocument();
        expect(secondRow).toBeInTheDocument();
    });
});
