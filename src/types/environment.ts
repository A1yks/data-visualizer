declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_URL: string;
            DB_CONNECT: string;
        }
    }
}

export {};
