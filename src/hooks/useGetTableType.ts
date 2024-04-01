import { TablePageProps } from '@/app/[tableType]/page';
import { useParams } from 'next/navigation';

function useGetTableType() {
    const { tableType } = useParams<TablePageProps['params']>();

    return decodeURIComponent(tableType);
}

export default useGetTableType;
