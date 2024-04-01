import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
    test('calls onPageChange with correct page when page changes', () => {
        const onPageChange = jest.fn();
        const { getByText } = render(<Pagination pageCount={10} initialPage={0} onPageChange={onPageChange} />);
        fireEvent.click(getByText('Next'));
        expect(onPageChange).toHaveBeenCalledWith({ selected: 1 });
    });

    test('renders correct number of pages', () => {
        const { getAllByRole } = render(<Pagination pageCount={5} initialPage={0} />);
        const pageButtons = getAllByRole('button');
        // Subtract 2 for the 'Next' and 'Previous' buttons
        expect(pageButtons.length - 2).toBe(5);
    });
});
