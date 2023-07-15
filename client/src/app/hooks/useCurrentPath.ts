'use client';
import { usePathname } from 'next/navigation';

const useCurrentPath = () => {
    const pathname = usePathname();
    const path = pathname.replace( /\/\w+\/*/, '' );
    return path;
};

export { useCurrentPath };