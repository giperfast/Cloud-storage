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

function timeConverter(UNIX_timestamp){
	//https://stackoverflow.com/a/6078873/18307094
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + ' ' + month + ' ' + year ;
	return time;
}


function groupFiles(files: Array<IFile>) {
	let last_date = 0;
	const result = {};

	for (var i = 0; i < files.length; i++) {
		const file = files[i];
		if (file.date - last_date >= 86000) {
			last_date = file.date;

			if (!result.hasOwnProperty(last_date)) {
				result[last_date] = [];
			}
		}
		result[last_date].push(file);
	}

	return result;
}

async function PhotoPage() {
	const user: IUser|null = await getUserFromCookie();
	const files: Array<IFile> = await getFiles('recent');
	const group_files = groupFiles(files);

	if (user === null) {
		return <></>;
	}

	const can_upload = user.storage.used <= user.storage.total;
	let index: number = 0;

  	return (
		<>
			<Sidebar/>
			<div className="page-content">
				<div className="page-container" id="files">
					<p className={styles.title}>
						Recent
					</p>
					<FilesContainer>
					{
						Object.keys(group_files).map((date: number) => {
							const files = group_files[date];
							
							return (
								<>
									<div className={styles.filesDate}>{timeConverter(date)}</div>
									{
										files.map((file: IFile) => {
											return (
												<File data={{
													file_id: file.file_id,
													name: file.name,
													extension: file.extension,
													type: file.type,
													expires: file.expires,
													index: index++,
													path: file.path,
													date: file.date
												}} key={file.file_id}/>
											);
										})
									}
									{
										[...Array(8)].map((index) =>
											<div className="empty-file-wrapper" key={index}></div>
										)
									}
								</>
							);
						})
					}
					</FilesContainer>
				</div>
			</div>
			<FilesOverlay/>
			<DragDropArea /*isActive={can_upload}*//>
			<ContextMenu>
				<RecyclebinButtons/>
			</ContextMenu>
			<MouseSelector/>
		</>
	);
}

export default PhotoPage;