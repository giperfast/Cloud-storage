'use client';
import { useState, useRef, useContext } from 'react';
import styles from './CreateFolderModal.module.css';
import { Input } from '@/components/UI/input/Input';
import { Button } from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';
import { createFolder } from '@/utils/api/files/createFolder';
import { useCurrentPath } from '@/app/hooks/useCurrentPath';
import { CreateFolderValidator } from '@/utils/validators/CreateFolderValidator';
import { IResult } from '@/utils/api/result/result';
import { CloseContext } from '@/utils/contexts/ModalContext';

const CreateFolderModal = () => {
    const close = useContext(CloseContext);
    const router = useRouter();
    const path = useCurrentPath();
    const inputRef = useRef();
    const [error, setError] = useState('');

    const submitHandle = async (e: any) => {
        e.preventDefault();
        setError('');
        const name = inputRef.current?.value;

        const validator = CreateFolderValidator();
        if (!validator.check(name)) {
            return setError(validator.getError());
        }

        const result: IResult = await createFolder(name, path);
        if (result.result === false) {
            setError(result.message);
        }

        router.refresh();

        if (typeof close === null) {
            return;
        }

        close();
    };

    const changeHandle = async (e: any) => {
        setError('');
        const name = e.target.value;

        const validator = CreateFolderValidator();
        if (!validator.check(name)) {
            setError(validator.getError());
        }
    };

    return (
        <form onSubmit={submitHandle}>
            <div className={styles.content}>
                <Input onChange={changeHandle} ref={inputRef} defaultValue="New folder"/>

                <div className={styles.error1}>
                    <div className={styles.error}>{error}</div>

                    <div className={styles.buttons}>
                        <Button type="submit" theme="primary">Create</Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export { CreateFolderModal };