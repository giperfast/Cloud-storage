'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './CreateFolderButton.module.css';
import { Modal } from '@/components/modal/Modal';
import { CreateFolderModal } from '@/components/modal/create-folder/CreateFolderModal';


function CreateFolderButton({children}:{children:React.ReactNode}) {
    const [showModal, setShowModal] = useState(false);
    
    const clickHandle = async (e: any) => {
        setShowModal(true);
    };

    return (
        <>
            <span onClick={clickHandle} className={styles.delete}>
                {children}
            </span >

            {
                showModal && createPortal(
                    <Modal close={() => setShowModal(false)}><CreateFolderModal/></Modal>,
                    document.body
                )
            }
        </>
    );
}

export { CreateFolderButton };