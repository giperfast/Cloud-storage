'use client'
//import React from 'react';
import styles from './Breadcrumbs.module.css';
import { useRouter } from 'next/navigation';

function Breadcrumbs({path}) {
    const router = useRouter();

    let routes = [...path];
    routes.unshift('cloud');
    routes.pop();

    return (
        <span className={styles.breadcrumbs}>
            <span className={styles.crumbs}>
            {
                routes.map((route, index) => {
                    const route_array = routes.slice(0, index + 1);
                    const route_string = route_array.join('/');
                    
                    return <span className={styles.route} onClick={() => router.push(route_string)} key={index}>{decodeURIComponent(route)}</span>
                })
            }
            </span>
            <span className={styles.current}>{decodeURIComponent(path.at(-1))}</span>
		</span>
    );
}

export { Breadcrumbs };