import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { unlink, stat } from 'node:fs';
import { FileUtilsService } from './utils.service';
import { FilesService } from './files.service';

@Injectable()
export class RecycleBinService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly filesService: FilesService,
		private readonly fileUtilsService: FileUtilsService
	) {}

	async createFile(file_data): Promise<string> {
		const file = await this.databaseService.deletedFile.create({
			data: {
				file_id: file_data.file_id,
				name: file_data.name,
				extension: file_data.extension,
				size: file_data.size,
				type: file_data.type,
				path: file_data.path,
				expires: Math.floor(Date.now()/1000) + 86400,
				userId: file_data.userId
			}
		})

		return file.file_id;
	}

	async delete(file_id): Promise<boolean> {
		await this.databaseService.deletedFile.delete({
			where: {
				file_id: file_id
			}
		})

		return true;
	}

	async forceDelete(file_id): Promise<boolean> {
		const target = await this.getFileFromId(file_id);
		const name = target['type'] == 'folder' ? target['name'] : target['file_id'];
		const server_path = this.fileUtilsService.getServerPath(target['userId'], name, target['path']);
		//const childs: Array<Object> = await this.filesService.getFiles(target['userId'], '', path);
		//console.log(target, server_path, name, target['path']);
		
		await this.delete(target['file_id']);

		await this.databaseService.file.deleteMany({
			where: {
				path: {
					startsWith: target['path'] || encodeURIComponent(target['name'])
				},
			}
		});

		unlink(server_path, function(err) {
			if(err && err.code == 'ENOENT') {
				console.info("File doesn't exist, won't remove it.", target['path']);
			} else if (err) {
				console.error("Error occurred while trying to remove file", err);
			} else {
				console.info(`removed`);
			}
		});

		return true;
	}

	async getFiles(userId): Promise<object> {
		const folders = await this.databaseService.deletedFile.findMany({
			where: {
				userId: userId,
				type: {
					startsWith: 'folder'
				},
			}
		})

		const files = await this.databaseService.deletedFile.findMany({
			where: {
				userId: userId,
				type: {
					not: {
						contains: 'folder',
					}
				},
			}
		})
		
		return [...folders, ...files];
	}

	async getFilesTotalSize(userId): Promise<number> {
		const files = await this.getFiles(userId);

		let size = 0;
		for (let index = 0; index < Object.keys(files).length; index++) {
			const file = files[index];
			size += file['size']
		}

		return size;
	}

	async getFileFromId(file_id): Promise<object> {
		const file = await this.databaseService.deletedFile.findUnique({
			where: {
				file_id: file_id
			}
		})
		
		return file;
	}

	async getChildsFromId(path): Promise<object> {
		const file = await this.databaseService.deletedFile.findMany({
			where: {
				path: {
					startsWith: path
				},
			}
		})
		
		return file;
	}
}
