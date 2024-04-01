import { useGetData } from '@/api/data/hooks';
import useFormState from '@/hooks/useFormState';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function useFilters() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data, isFetching } = useGetData();
    const textFieldsRef = useRef(data?.parsedData.textFields || []);

    const debounced = useDebouncedCallback(() => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        params.delete('page');

        textFieldsRef.current.forEach((field) => {
            if (formState[field]) {
                params.set(field, formState[field]);
            } else {
                params.delete(field);
            }
        });

        window.history.pushState({}, '', `${pathname}?${params.toString()}`);
    }, 500);

    const getFiltersState = useCallback(() => {
        return textFieldsRef.current.reduce<Record<string, string>>((acc, field) => ({ ...acc, [field]: searchParams.get(field) || '' }), {});
    }, [searchParams]);

    const { formState, handleChange, clearFormState, setFormState } = useFormState(getFiltersState, debounced);

    function handleResetFilters() {
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        textFieldsRef.current.forEach((field) => {
            params.delete(field);
        });

        clearFormState();
        window.history.pushState({}, '', `${pathname}`);
    }

    useEffect(() => {
        setFormState((prev) => ({ ...prev, ...getFiltersState() }));
    }, [getFiltersState, setFormState]);

    return {
        textFields: textFieldsRef.current,
        formState,
        isLoading: isFetching,
        handleChange,
        handleResetFilters,
    };
}

export default useFilters;
