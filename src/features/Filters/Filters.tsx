'use client';

import c from 'clsx';
import useFilters from './hooks/useFilters';
import Spinner from '@/components/Spinner';

export type FiltersProps = {
    className?: string;
};

function Filters({ className }: FiltersProps) {
    const { textFields, formState, isLoading, handleChange, handleResetFilters } = useFilters();

    return (
        <div className='w-full'>
            <div className={c('w-full flex flex-col gap-4 p-4', className)}>
                <span className='font-bold'>Filters</span>
                {textFields.length === 0 ? (
                    <div>No filters available</div>
                ) : (
                    <>
                        {textFields.map((textField) => (
                            <input
                                key={textField}
                                type='text'
                                placeholder={textField}
                                value={formState[textField]}
                                onChange={handleChange(textField)}
                                className='input placeholder:capitalize'
                            />
                        ))}
                        <button className='button min-h-8 rounded-lg' onClick={handleResetFilters}>
                            Clear
                        </button>
                    </>
                )}
            </div>
            {isLoading && <Spinner />}
        </div>
    );
}

export default Filters;
