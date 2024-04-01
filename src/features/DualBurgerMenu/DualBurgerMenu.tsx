'use client';

import useBooleanState from '@/hooks/useBooleanState';
import Drawer from 'react-modern-drawer';
import Navigation from '../Navigation';
import Filters from '../Filters';
import { memo } from 'react';

function DualBurgerMenu() {
    const [navigationOpened, openNavigation, closeNavigation] = useBooleanState();
    const [filtersOpened, openFilters, closeFilters] = useBooleanState();

    return (
        <>
            <div className='flex gap-2 justify-between p-4 w-full border-b'>
                <button className='button-secondary' onClick={openNavigation}>
                    Navigation
                </button>
                <button className='button-secondary' onClick={openFilters}>
                    Filters
                </button>
            </div>
            <Drawer open={navigationOpened} onClose={closeNavigation} direction='left' className='bg-purple-300' customIdSuffix='navigation'>
                <Navigation />
            </Drawer>
            <Drawer open={filtersOpened} onClose={closeFilters} direction='right' className='bg-yellow-300' customIdSuffix='filters'>
                <Filters />
            </Drawer>
        </>
    );
}

export default memo(DualBurgerMenu);
