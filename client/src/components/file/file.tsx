import styles from './file.module.css';
import Image from 'next/image';

import unknown_icon from '@/public/file-icons/unknown.svg';

function File({}) {

    return (
        <div className={styles.file}>
            <div className={styles.file_overlay}></div>
            <div className={styles.image_wrapper}>
                <Image src="/file-icons/unknown.svg" width={80} height={80} alt="unknown file"/>
            </div>

            <p className={styles.name}>SEUS PTGIE12.zip</p>  
        </div>
    )
}

export default File;