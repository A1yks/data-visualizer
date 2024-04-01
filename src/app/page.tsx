import { getTableTypes } from '@/api/data';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const [firstType] = await getTableTypes();

    if (firstType !== undefined) {
        redirect(`/${firstType}`);
    }

    return <div className='flex flex-col justify-center items-center flex-1 text-center p-8 gap-6'>There are no available pages</div>;
}
