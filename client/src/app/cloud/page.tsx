import 'server-only'
import Image from 'next/image';
import styles from './page.module.css';
import { FilesContainer } from '@/components/files/files-container/FilesContainer';
import { File } from '@/components/files/file/File';
import { DragDropArea } from "@/components/drag-drop/DragDropArea";
import { Button } from "@/components/buttons/button/Button";
import { UploadButton } from "@/components/buttons/upload-button/UploadButton";
import { getUserFromCookie } from '@/utils/api/user/getFromCookie';
import { getFiles } from '@/utils/api/files/get';
import { convertBytes } from '@/utils/common/bytes';
import { FilesOverlay } from '@/components/files/files-overlay/FilesOverlay';

async function Cloud() {
	const user = await getUserFromCookie();
	const files = await getFiles();

	const usage_percent = (100 * user.storage.used) / user.storage.total;
	const can_upload = user.storage.used <= user.storage.total;

  	return (
    <>
		<div className={styles.sidebar}>
			<div className={styles.container}>
				<div className={styles.wrapper}>

				<UploadButton isActive={can_upload}>
					<Button icon="upload" theme="primary">Upload</Button>
				</UploadButton>

				<Button icon="file" theme="gray">All files</Button>
				<Button icon="file-alt">Recent</Button>
				<Button icon="file-image">Photo</Button>
				<Button icon="trash-alt">Recycle</Button>

				<div className={styles.capacity}>
					<label htmlFor="file">
						{convertBytes(user.storage.total - user.storage.used, 'GB')} GB of {convertBytes(user.storage.total, 'GB')} GB free
					</label>
					<progress id="file" max="100" value={usage_percent}/>
				</div>
				</div>
			</div>
		</div>

    	<div className={styles.content}>
			<div className={styles.container} id="files">
				<p className={styles.title}>Files</p>
				<FilesContainer>
				{
					files.map((file) => {
						return <File data={{file_id: file.file_id, name: file.name, extension: file.extension, type: file.type}} key={file.file_id}/>
					})
				}
				</FilesContainer>
			</div>
    	</div>
		<FilesOverlay/>
		<DragDropArea isActive={can_upload}/>
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