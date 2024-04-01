import { render, screen, fireEvent } from '@testing-library/react';
import TablePagination from './TablePagination';
import useTablePagination from './hooks/useTablePagination';

jest.mock('./hooks/useTablePagination');

describe('TablePagination', () => {
    beforeEach(() => {
        (useTablePagination as jest.Mock).mockReturnValue({
            result: { amount: 100 },
            isFetching: false,
            pushedStateRef: { current: null },
            showingText: '1-10',
            pages: 10,
            page: 1,
            handlePageChange: jest.fn(),
        });
    });

    it('renders without crashing', () => {
        render(<TablePagination />);
        expect(screen.getByText(/Showing/)).toBeInTheDocument();
    });

    it('displays the correct amount of data', () => {
        render(<TablePagination />);
        expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('displays the correct showing text', () => {
        render(<TablePagination />);
        expect(screen.getByText('1-10')).toBeInTheDocument();
    });

    it('does not render if result is undefined', () => {
        (useTablePagination as jest.Mock).mockReturnValue({
            result: undefined,
        });
        render(<TablePagination />);
        expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
    });

    it('calls handlePageChange when page is changed', () => {
        const handlePageChange = jest.fn();

        (useTablePagination as jest.Mock).mockReturnValue({
            result: { amount: 100 },
            isFetching: false,
            pushedStateRef: { current: null },
            showingText: '1-10',
            pages: 10,
            page: 1,
            handlePageChange,
        });

        render(<TablePagination />);
        fireEvent.click(screen.getByText('2'));
        expect(handlePageChange).toHaveBeenCalled();
    });
});
