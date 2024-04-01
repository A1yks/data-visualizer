'use client';

import Portal from '../Portal';
import { ReactNode } from 'react';
import useModal from './hooks/useModal';
import c from 'clsx';
import './Modal.css';

export type ModalProps = {
    header?: ReactNode;
    active: boolean;
    setActive: (active: boolean) => void;
};

function Modal({ active, setActive, header, children }: React.PropsWithChildren<ModalProps>) {
    const { status, isHidden } = useModal(active);

    if (isHidden) {
        return null;
    }

    return (
        <Portal>
            <div className={c('fixed top-0 left-0 w-full h-screen flex flex-col bg-gray-700 bg-opacity-70 animation overflow-auto', status)}>
                <div onClick={() => setActive(false)} className='absolute inset-0' />
                <div className='flex-1 p-8 w-full flex justify-center items-center'>
                    <div className='relative md:w-[65%] w-full min-w-[280px] max-w-[640px] bg-white rounded-lg p-8'>
                        <div className='flex justify-between'>
                            <div className='mr-2'>{header}</div>
                            <div
                                className='text-gray-500 hover:text-gray-700 ml-auto cursor-pointer'
                                aria-label='Close'
                                onClick={() => setActive(false)}
                            >
                                &#10005;
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
}

export default Modal;
