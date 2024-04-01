import { EditingFormProps } from '../EditingForm';
import React, { useMemo, useState } from 'react';
import useFormState from '@/hooks/useFormState';

function useEditingForm({ formData, onSubmit }: Pick<EditingFormProps, 'onSubmit' | 'formData'>) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { formState, handleChange } = useFormState(() => formData);
    const isDirty = useMemo(() => Object.keys(formData).some((key) => formData[key] !== formState[key]), [formData, formState]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isDirty) {
            setIsSubmitting(true);
        }

        await onSubmit(formState, isDirty)?.finally(() => setIsSubmitting(false));
    }

    return { formState, isSubmitting, handleSubmit, handleChange };
}

export default useEditingForm;
