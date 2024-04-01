import { render, fireEvent, getByLabelText } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
    const setActive = jest.fn();

    test('renders children when active', () => {
        const { getByText } = render(
            <Modal active={true} setActive={setActive}>
                <div>Test content</div>
            </Modal>
        );
        expect(getByText('Test content')).toBeInTheDocument();
    });

    test('does not render when not active', () => {
        const { queryByText } = render(
            <Modal active={false} setActive={setActive}>
                <div>Test content</div>
            </Modal>
        );
        expect(queryByText('Test content')).not.toBeInTheDocument();
    });

    test('calls setActive when close button is clicked', () => {
        const { getByLabelText } = render(
            <Modal active={true} setActive={setActive}>
                <div>Test content</div>
            </Modal>
        );
        fireEvent.click(getByLabelText('Close'));
        expect(setActive).toHaveBeenCalledWith(false);
    });
});
