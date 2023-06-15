import 'server-only'
import Image from 'next/image';
import styles from './page.module.css';
import { FilesContainer } from '@/components/files-container/FilesContainer';
import { File } from '@/components/file/File';
import { Button } from "@/components/buttons/button/Button";
import { UploadButton } from "@/components/buttons/upload-button/UploadButton";
import { getUserFromCookie } from '@/utils/api/user/getFromCookie';
import { getFiles } from '@/utils/api/files/get';

async function Cloud() {
	const user = await getUserFromCookie();
	const files = await getFiles();

  	return (
    <>
		<div className={styles.sidebar}>
			<div className={styles.container}>
				<div className={styles.wrapper}>
				<UploadButton title="Upload file" icon="upload"/>
				<Button title="All files" icon="file" theme="gray"/>
				<Button title="Recent" icon="file-alt"/>
				<Button title="Photo" icon="file-image"/>
				<Button title="Recycle" icon="trash-alt"/>

				<label htmlFor="file">File progress:</label>
				<progress id="file" max="100" value="70"> 70% </progress>
				</div>
			</div>
		</div>

    	<div className={styles.content}>
			<div className={styles.container}>
				<p className={styles.title}>Files</p>
				<FilesContainer>
				{
					files.map((file) => {
						return <File data={{file_id: file.file_id, name: file.name, extension: file.extension, type: file.type}}/>
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