import React, { useCallback, useState } from 'react';

export type BaseFormState = Record<PropertyKey, unknown>;
type ChangeHandlerEvent = React.ChangeEvent<{ value: unknown }>;

function useFormState<InitState extends BaseFormState>(getInitialState: () => InitState, onChange?: (event: ChangeHandlerEvent) => void) {
    const [formState, setFormState] = useState(getInitialState);

    function handleChange(key: keyof InitState) {
        return (event: ChangeHandlerEvent) => {
            onChange?.(event);
            setFormState((prevState) => ({
                ...prevState,
                [key]: event.target.value,
            }));
        };
    }

    const resetFormState = useCallback(
        (keys?: Array<keyof InitState>) => {
            if (keys === undefined) {
                setFormState(getInitialState());
            } else {
                setFormState((prevState) => {
                    const newState = { ...prevState };
                    const initState = getInitialState();

                    keys.forEach((key) => {
                        newState[key] = initState[key];
                    });

                    return newState;
                });
            }
        },
        [getInitialState]
    );

    const clearFormState = useCallback(() => {
        setFormState((prevState) => Object.keys(prevState).reduce((acc, key) => ({ ...acc, [key]: '' }), {} as InitState));
    }, []);

    return { formState, handleChange, resetFormState, clearFormState, setFormState };
}

export default useFormState;
