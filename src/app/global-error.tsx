'use client';

import { extractError } from '@/utils/extractError';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <html>
            <body>
                <h2 className='font-bold'>A global error occured</h2>
                <p>More info: {extractError(error)}</p>
                <button className='button' onClick={() => reset()}>
                    Try again
                </button>
            </body>
        </html>
    );
}
