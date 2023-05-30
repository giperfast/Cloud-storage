'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

interface UserCardDTO {
    username: string,
    avatar: string
}

function UserCard({ user }:{ user:UserCardDTO }) {
    const [isOpened, setIsOpened] = useState(false);
    
    const clickHandle = (e) => {
        console.log(e.target.className, styles.user_card);
        setIsOpened(!isOpened);
        /*if (e.target.className == styles.user_card) {
            setIsOpened(true);
        }
        if (e.target.className !== styles.user_card) {
            setIsOpened(false);
        }*/
    }

    /*useEffect(() => {
        document.body.addEventListener('click', clickHandle );
    })*/

    return (
        <div className={styles.user_card} onClick={clickHandle} id="user_card">
            Logined as {user.username}
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