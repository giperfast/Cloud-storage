'use client'
import React, { useState } from 'react';
import Link from 'next/link';

import styles from './header.module.css';

//const pages = ['Products', 'Pricing', 'Blog'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

//const anchorElNav = false;
//const anchorElUser = false;

function Header() {

    const [userMenu, setUserMenu] = useState(false);
    const [navMenu, setNavMenu] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>CLOUD</div>

                <div className={styles.buttons}>
                    <div className={styles.left_section}>
                        <Link href="/">Home</Link>
                        <Link href="/">Products</Link>
                        <Link href="/">Pricing</Link>
                    </div>
                    <div className={styles.right_section}>
                        <Link href="/login">Login</Link>
                    </div>
                </div>
            </div>

        </header>
    )
}

export {Header};