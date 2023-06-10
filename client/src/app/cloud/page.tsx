import 'server-only'
import Image from 'next/image';
import styles from './page.module.css';
import { FilesContainer } from '@/components/files-container/FilesContainer';
import { File } from '@/components/file/File';
import { SidebarButton, SidebarUploadFileButton } from "@/components/sidebar-button/SidebarButton";
import { getUserFromCookie } from '@/utils/api/user/getFromCookie';
import { getFiles } from '@/utils/api/files/get';

async function Cloud() {
	const user = await getUserFromCookie();
	const files = await getFiles();

  	return (
    <>
		<div className={styles.sidebar}>
			<div className={styles.container}>

				<SidebarUploadFileButton title="Upload file" icon="upload"/>
				<SidebarButton active={true} title="All files" icon="file"/>
				<SidebarButton active={false} title="Recent" icon="file-alt"/>
				<SidebarButton active={false} title="Photo" icon="file-image"/>
				<SidebarButton active={false} title="Recycle" icon="trash-alt"/>

				<label htmlFor="file">File progress:</label>
				<progress id="file" max="100" value="70"> 70% </progress>
			</div>
		</div>

    	<div className={styles.content}>
			<div className={styles.container}>
				<p className={styles.title}>Files</p>
				<FilesContainer>
				{
					files.map((file) => {
						return <File data={{id: file.file_id, name: file.name, extension: file.extension}}/>
					})
				}
				</FilesContainer>
			</div>
    	</div>
    </>
  )
}

/*
<File data={{id: 1, name: "movie", extension: ".mp4"}}/>
<File data={{id: 2, name: "document", extension: ".txt"}}/>
<File data={{id: 3, name: "piedpiper", extension: ".c"}}/>
<File data={{id: 4, name: "game", extension: ".exe"}}/>
<File data={{id: 5, name: "unknown", extension: ""}}/>
*/

export default Cloud;