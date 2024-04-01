export function hasMessage(error: unknown): error is { message: string } {
    return error !== null && typeof error === 'object' && Object.hasOwn(error, 'message');
}

export function extractError(err: unknown) {
    if (hasMessage(err) || err instanceof Error) {
        return err.message;
    }

    return String(err);
}
