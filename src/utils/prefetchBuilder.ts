import { FetchQueryOptions, QueryClient, QueryKey } from '@tanstack/react-query';

type Callback<A, B, C, D extends QueryKey> = (...args: any[]) => FetchQueryOptions<A, B, C, D>;

function prefetchBuiler<A, B, C, D extends QueryKey, Cb extends Callback<A, B, C, D>>(callback: Cb) {
    return async (queryClient: QueryClient, ...args: Parameters<Cb>) => {
        await queryClient.prefetchQuery(callback(...args));
    };
}

export default prefetchBuiler;
