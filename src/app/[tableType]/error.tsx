'use client';

import { extractError } from '@/utils/extractError';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className='flex items-center justify-center w-full flex-col gap-4'>
            <h2 className='font-bold'>An error occured</h2>
            <p>More info: {extractError(error)}</p>
            <button className='button' onClick={() => reset()}>
                Try again
            </button>
        </div>
    );
}
