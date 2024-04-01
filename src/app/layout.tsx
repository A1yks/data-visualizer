import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { prefetchTableTypes } from '@/api/data';
import Navigation from '@/features/Navigation';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import Providers from './Providers';
import 'react-modern-drawer/dist/index.css';
import '@/styles/globals.css';

const inter = Inter({ weight: ['400', '500', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Test Task',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();

    await prefetchTableTypes(queryClient);

    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <div className='flex h-screen'>
                            <div className='min-w-[150px] w-[12%] hidden sm:block border-r flex-shrink-0'>
                                <Navigation />
                            </div>
                            {children}
                        </div>
                    </HydrationBoundary>
                </Providers>
            </body>
        </html>
    );
}
