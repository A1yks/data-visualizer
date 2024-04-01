import { prefetchData } from '@/api/data';
import DualBurgerMenu from '@/features/DualBurgerMenu';
import TablePageContent from '@/features/TablePageContent';
import { PAGE_LIMIT } from '@/constants/tables';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export type TablePageProps = {
    params: {
        tableType: string;
    };
    searchParams: {
        page?: number;
    };
};

async function TablePage({ params, searchParams }: TablePageProps) {
    const tableType = decodeURIComponent(params.tableType);
    const { page = 1, ...filters } = searchParams;
    const queryClient = new QueryClient();

    await prefetchData(queryClient, tableType, filters, (page - 1) * PAGE_LIMIT);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='flex flex-col h-full w-full'>
                <div className='sm:hidden'>
                    <DualBurgerMenu />
                </div>
                <TablePageContent />
            </div>
        </HydrationBoundary>
    );
}

export default TablePage;
