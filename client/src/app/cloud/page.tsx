import 'server-only'
import Image from 'next/image';
import styles from './page.module.css';
import { FilesContainer } from '@/components/files-container/FilesContainer';
import { File } from '@/components/file/File';
import { SidebarButton } from "@/components/sidebar-button/SidebarButton";
import { getUserFromCookie } from '@/utils/api/user/getFromCookie';

async function Cloud() {
	const user = await getUserFromCookie();

  	return (
    <>
		<div className={styles.sidebar}>
			<div className={styles.container}>

				<SidebarButton active="true" title="All files" icon="file"/>
				<SidebarButton active="false" title="Recent" icon="file-alt"/>
				<SidebarButton active="false" title="Photo" icon="file-image"/>
				<SidebarButton active="false" title="Recycle" icon="trash-alt"/>

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