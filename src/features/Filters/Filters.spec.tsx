import { render, fireEvent } from '@testing-library/react';
import Filters from './Filters';
import useFilters from './hooks/useFilters';

jest.mock('./hooks/useFilters.ts');

describe('Filters', () => {
    test('renders "No filters available" when no filters are available', () => {
        (useFilters as jest.Mock).mockReturnValue({
            textFields: [],
            formState: {},
            isLoading: false,
            handleChange: () => jest.fn(),
            handleResetFilters: jest.fn(),
        });

        const { getByText } = render(<Filters />);
        expect(getByText('No filters available')).toBeInTheDocument();
    });

    test('renders text fields and clear button when filters are available', () => {
        (useFilters as jest.Mock).mockReturnValue({
            textFields: ['filter1', 'filter2'],
            formState: { filter1: '', filter2: '' },
            isLoading: false,
            handleChange: () => jest.fn(),
            handleResetFilters: jest.fn(),
        });

        const { getByPlaceholderText, getByText } = render(<Filters />);
        expect(getByPlaceholderText('filter1')).toBeInTheDocument();
        expect(getByPlaceholderText('filter2')).toBeInTheDocument();
        expect(getByText('Clear')).toBeInTheDocument();
    });

    test('calls handleResetFilters when clear button is clicked', () => {
        const mockHandleResetFilters = jest.fn();

        (useFilters as jest.Mock).mockReturnValue({
            textFields: ['filter1', 'filter2'],
            formState: { filter1: '', filter2: '' },
            isLoading: false,
            handleChange: () => jest.fn(),
            handleResetFilters: mockHandleResetFilters,
        });

        const { getByText } = render(<Filters />);
        fireEvent.click(getByText('Clear'));
        expect(mockHandleResetFilters).toHaveBeenCalled();
    });
});
