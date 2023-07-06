'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './CreateFolderModal.module.css';
import { Input } from '@/components/UI/input/Input';
import { Button } from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';
import { createFolder } from '@/utils/api/files/createFolder';
import { useCurrentPath } from '@/app/hooks/useCurrentPath';

const CreateFolderModal = () => {
    const router = useRouter();
    const path = useCurrentPath();
    const inputRef = useRef();

    const clickHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = inputRef.current?.value
        await createFolder(name, path);
        router.refresh();
    }

    return (
        <div className={styles.content}>
            <Input ref={inputRef} defaultValue="New folder"/>
            <Button onClick={clickHandle} theme="primary">Create</Button>
        </div>
    );
}

export { CreateFolderModal } 