import { PAGE_LIMIT } from '@/constants/tables';
import { useSearchParams } from 'next/navigation';

function usePaginationData() {
    const searchParams = useSearchParams();
    const { page: urlPage, ...filters } = Object.fromEntries(searchParams.entries());
    const page = Number(urlPage) || 1;
    const limit = PAGE_LIMIT;
    const offset = (page - 1) * limit;

    return { page, limit, offset, filters };
}

export default usePaginationData;
