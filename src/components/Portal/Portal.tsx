'use client';

import { createPortal } from 'react-dom';

export type PortalProps = {
    to?: HTMLElement;
};

function Portal({ children, to }: React.PropsWithChildren<PortalProps>) {
    if (typeof window === 'undefined') {
        return null;
    }

    return createPortal(children, to || document.body);
}

export default Portal;
