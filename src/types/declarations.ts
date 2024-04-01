declare global {
    type MaybePromise<T> = T | Promise<T>;

    namespace API {
        export type Response<T = unknown> = { data: T; error?: never } | { error: string; data?: never };
    }
}

export {};
