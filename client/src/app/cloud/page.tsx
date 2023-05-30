import 'server-only'
import Image from 'next/image';
import styles from './page.module.css';
import {Icon} from '@/components/icon/icon';
import FilesContainer from '@/components/files-container/FilesContainer';
import File from '@/components/file/file';

import { getUser } from '@/utils/api/user/get';

async function Cloud() {
	const user = await getUser();

  	return (
    <>
		<div className={styles.sidebar}>
			<div className={styles.container}>
				<Icon/>
				<button className={styles.button + ' ' + styles.active}>All files</button>
				<button className={styles.button}>Recent</button>
				<button className={styles.button}>Photo</button>
				<button className={styles.button}>Recycle</button>
				<label htmlFor="file">File progress:</label>
				<progress id="file" max="100" value="70"> 70% </progress>
			</div>
		</div>

    	<div className={styles.content}>
			<div className={styles.container}>
				<p className={styles.title}>Files</p>
				<FilesContainer>
					<File name="movie.mp4" type="unknown"/>
					<File name="document.txt" type="unknown"/>
					<File name="piedpiper.c" type="unknown"/>
					<File name="game.exe" type="unknown"/>
					<File name="unknown" type="unknown"/>
				</FilesContainer>
			</div>
    	</div>
    </>
  )
}


export default Cloud;