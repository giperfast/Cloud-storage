import 'server-only'
import styles from './filesContainer.module.css';
import Image from 'next/image';

function FilesContainer({children}) {
    return (
        <div className={styles.files}>
           {children}
        </div>
    )
}

export default FilesContainer;