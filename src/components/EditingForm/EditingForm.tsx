import { memo } from 'react';
import FormActions from '../FormActions';
import useEditingForm from './hooks/useEditingForm';
import { TableRowData } from '../Table/types';

export type EditingFormProps = {
    formData: TableRowData;
    onSubmit: (formState: TableRowData, isDirty: boolean) => MaybePromise<void>;
    onCancel?: () => void;
};

function EditingForm({ formData, onSubmit, onCancel }: EditingFormProps) {
    const { formState, isSubmitting, handleSubmit, handleChange } = useEditingForm({ formData, onSubmit });

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                {Object.keys(formData).map((columnName) => (
                    <div key={columnName} className='flex flex-col gap-2'>
                        <label htmlFor={columnName} className='font-bold capitalize'>
                            {columnName}
                        </label>
                        <input type='text' className='input' id={columnName} value={formState[columnName]} onChange={handleChange(columnName)} />
                    </div>
                ))}
            </div>
            <div className='mt-8'>
                <FormActions submitText='Save' onCancel={onCancel} isLoading={isSubmitting} />
            </div>
        </form>
    );
}

export default memo(EditingForm);
