import { useSnackbar } from 'notistack';
import { extractError } from '@/utils/extractError';

type Callback = (...args: any[]) => MaybePromise<unknown>;

function useErrorsHandler<T extends Callback>(callback: T) {
    const { enqueueSnackbar } = useSnackbar();

    return async (...args: any[]) => {
        try {
            await callback(...args);
        } catch (err) {
            enqueueSnackbar(extractError(err), { variant: 'error' });
        }
    };
}

export default useErrorsHandler;
