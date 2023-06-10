'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './UserCard.module.css';
import Image from 'next/image';

interface UserCardDTO {
    username: string,
    avatar: string
}

function UserCard({ user }:{ user:UserCardDTO }) {
    const [isOpened, setIsOpened] = useState(false);
    
    const clickHandle = (e: any) => {
        setIsOpened(!isOpened)
    }

    useEffect(() => {
        window.addEventListener('mouseup', (e: any) => {
            if (e.target.closest(`.${styles.user_card}`)) {
                return false
            }
    
            setIsOpened(false);
        });
    }, [])

    return (
        <div className={styles.user_card} onClick={clickHandle}>
            <span className={styles.username} title={user.username}>{user.username}</span>
            <div className={styles.avatar}>
                <Image src="/avatar.png" width="30" height="30" alt=""/>
            </div>

            {
                !isOpened ? '' :
                <div className={styles.menu}>
                    <Link href="/cloud">My cloud</Link>
                    <Link href="/">Account</Link>
                    <Link href="/logout">Logout</Link>
                </div>

            }
            
        </div>
    )
}

export default UserCard;