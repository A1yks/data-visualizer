'use client';

import c from 'clsx';
import Link from 'next/link';
import { memo } from 'react';
import { useGetTypes } from '@/api/data/hooks';
import useGetTableType from '@/hooks/useGetTableType';

export type TableNavigationProps = {
    className?: string;
};

function Navigation({ className }: TableNavigationProps) {
    const { data } = useGetTypes();
    const tableType = useGetTableType();

    return (
        <nav className={className}>
            <ul className='flex flex-col gap-4 p-4'>
                {data?.map((type) => (
                    <li key={type}>
                        <Link
                            href={`/${encodeURIComponent(type)}`}
                            className={c('flex justify-center items-center px-2 py-2 rounded-lg hover:bg-gray-100 text-center', {
                                ['bg-gray-100']: type === tableType,
                            })}
                        >
                            <span className='first-letter:uppercase'>{type}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default memo(Navigation);
