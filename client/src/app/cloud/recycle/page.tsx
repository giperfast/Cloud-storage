import 'server-only'
import styles from './page.module.css';
import { FilesContainer } from '@/components/files/files-container/FilesContainer';
import { File } from '@/components/files/file/File';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { DragDropArea } from "@/components/drag-drop/DragDropArea";
import { getUserFromCookie } from '@/utils/api/user/getFromCookie';
import { getFiles } from '@/utils/api/files/get';
import { FilesOverlay } from '@/components/files/files-overlay/FilesOverlay';
import { IUser } from '@/types/user';
import { IFile } from '@/types/file';
import { Button } from '@/components/buttons/button/Button';

async function Cloud() {
	const user: IUser|null = await getUserFromCookie();
	const files = await getFiles('recycle');

	if (user === null) {
		return <></>;
	}

	const can_upload = user.storage.used <= user.storage.total;

  	return (
    <>
		<Sidebar user={user}/>
    	<div className="page-content">
			<div className="page-container" id="files">
				<p className={styles.title}>
					Recycle bin
					<span className={styles.rightSection}>
						<Button theme='light'>Clear</Button>
					</span>
					
				</p>
				<FilesContainer>
				{
					files.map((file: IFile) => {
						return <File data={{file_id: file.file_id, name: file.name, extension: file.extension, type: file.type, expires: file.expires}} key={file.file_id}/>
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

export default Cloud;