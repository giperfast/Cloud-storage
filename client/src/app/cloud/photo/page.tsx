import 'server-only';
import styles from './page.module.css';
import { FilesContainer } from '@/components/files/files-container/FilesContainer';
import { File } from '@/components/files/file/File';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { DragDropArea } from '@/components/drag-drop/DragDropArea';
import { getUserFromCookie } from '@/utils/api/user/getFromCookie';
import { getFiles } from '@/utils/api/files/get';
import { FilesOverlay } from '@/components/files/files-overlay/FilesOverlay';
import { IUser } from '@/types/user';
import { IFile } from '@/types/file';
import { ContextMenu } from '@/components/context-menu/ContextMenu';
import { RecyclebinButtons } from '@/components/context-menu/recyclebin/RecyclebinButtons';
import { MouseSelector } from '@/components/mouse-selector/MouseSelector';

async function PhotoPage() {
	const user: IUser|null = await getUserFromCookie();
	const files: Array<IFile> = await getFiles('photo');

	if (user === null) {
		return <></>;
	}

	const can_upload = user.storage.used <= user.storage.total;

  	return (
		<>
			<Sidebar/>
			<div className="page-content">
				<div className="page-container" id="files">
					<p className={styles.title}>
						Photo
					</p>
					<FilesContainer>
					{
						files.map((file: IFile, index: number) => {
							return <File data={
								{
									file_id: file.file_id,
									name: file.name,
									extension: file.extension,
									type: file.type,
									expires: file.expires,
									index: index,
									path: file.path,
									date: file.date
								}
							} key={file.file_id}/>;
						})
					}
					</FilesContainer>
				</div>
			</div>
			<FilesOverlay/>
			<DragDropArea isActive={can_upload}/>
			<ContextMenu>
				<RecyclebinButtons/>
			</ContextMenu>
			<MouseSelector/>
		</>
	);
}

export default PhotoPage;