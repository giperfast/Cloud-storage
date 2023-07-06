'use client'
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './CreateFolderButton.module.css';
import { downloadFile } from '@/redux/slices/downloadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IFile } from '@/types/file';
import { useRouter, usePathname } from 'next/navigation';
import { createFolder } from '@/utils/api/files/createFolder';
import { Modal } from '@/components/modal/Modal';
import { CreateFolderModal } from '@/components/modal/create-folder/CreateFolderModal';


function CreateFolderButton({children}:{children:React.ReactNode}) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    //console.log(test);
    
    const clickHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowModal(true);
        //console.log('createPortal');
        //settest(true)
       // createPortal(<p>123123132123</p>, document.body)
        //createPortal(<Modal><CreateFolderModal/></Modal>, document.body)
        /*const path = pathname.replace( /\/\w+\//, '' );
        console.log(path);
        await createFolder(path);
        router.refresh();*/
    }
    //console.log(test);
    return (
        <>
            <span onClick={clickHandle} className={styles.delete}>
                {children}
            </span >

            {
                showModal && createPortal(
                    <Modal onClose={() => setShowModal(false)}><CreateFolderModal/></Modal>,
                    document.body
                )
            }
        </>
    )
}

export { CreateFolderButton };