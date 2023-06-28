import 'server-only';
import styles from './page.module.css';
import { FilesContainer } from '@/components/files/files-container/FilesContainer';
import { File } from '@/components/files/file/File';
import { DragDropArea } from "@/components/drag-drop/DragDropArea";
import { getUserFromCookie } from '@/utils/api/user/getFromCookie';
import { getFiles } from '@/utils/api/files/get';
import { FilesOverlay } from '@/components/files/files-overlay/FilesOverlay';
import { IUser } from '@/types/user';
import { IFile } from '@/types/file';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ContextMenu } from '@/components/context-menu/ContextMenu';
import { GlobalButtons } from '@/components/context-menu/global/GlobalButtons';
import { MouseSelector } from '@/components/mouse-selector/MouseSelector';

async function Cloud() {
	const user: IUser|null = await getUserFromCookie();
	const files = await getFiles();

	if (user === null) {
		return <></>;
	}

	const can_upload = user.storage.used <= user.storage.total;

  	return (
		<>
			<Sidebar user={user}/>
			<div className="page-content">
				<div className="page-container" id="files">
					<p className={styles.title}>Files</p>
					<FilesContainer>
					{
						files.map((file: IFile, index: number) => {
							return <File data={{file_id: file.file_id, name: file.name, extension: file.extension, type: file.type, index: index}} key={file.file_id}/>
						})
					}
					</FilesContainer>
				</div>
			</div>
			<FilesOverlay/>
			<DragDropArea isActive={can_upload}/>
			<ContextMenu>
				<GlobalButtons/>
			</ContextMenu>
			<MouseSelector/>
		</>
	)
}

export default Cloud;