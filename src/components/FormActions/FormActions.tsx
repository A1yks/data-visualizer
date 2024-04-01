import { memo } from 'react';
import Spinner from '../Spinner';

export type FormActionsProps = {
    submitText?: string;
    cancelText?: string;
    onCancel?: () => void;
    isLoading?: boolean;
};

function FormActions({ submitText = 'Submit', cancelText = 'Cancel', isLoading, onCancel }: FormActionsProps) {
    return (
        <div className='flex gap-2 justify-end h-10'>
            <button type='submit' disabled={isLoading} className='button w-24'>
                {isLoading ? <Spinner size='small' color='#fff' /> : submitText}
            </button>
            <button type='button' disabled={isLoading} onClick={onCancel} className='button w-24 bg-red-500 hover:enabled:bg-red-600'>
                {cancelText}
            </button>
        </div>
    );
}

export default memo(FormActions);
