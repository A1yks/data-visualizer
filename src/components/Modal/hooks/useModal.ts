import { useEffect, useState } from 'react';
import useTransition from 'react-transition-state';

function useModal(active: boolean) {
    const [{ status, isMounted }, toggle] = useTransition({
        timeout: 200,
        unmountOnExit: true,
        mountOnEnter: true,
        preEnter: true,
    });
    const [isModalMounted, setIsModalMounted] = useState(false);
    const isHidden = !isMounted || !isModalMounted;

    useEffect(() => setIsModalMounted(true), []);

    useEffect(() => {
        toggle(active);
    }, [active]);

    return { status, isHidden };
}

export default useModal;
