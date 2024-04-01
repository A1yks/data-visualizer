import Spinner from '@/components/Spinner';

function Loading() {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Spinner size='large' />
        </div>
    );
}

export default Loading;
