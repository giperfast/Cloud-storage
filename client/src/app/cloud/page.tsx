import Image from 'next/image';
import styles from './page.module.css';
import {Icon} from '@/components/icon/icon';
import File from '@/components/file/file';

function Cloud() {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.container}>
          <Icon/>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <p className={styles.title}>Files</p>
          <div className={styles.files}>
            <File/>
            <File/>
            <File/>
            <File/>
            <File/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cloud;