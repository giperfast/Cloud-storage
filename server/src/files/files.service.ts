import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { existsSync, mkdirSync } from 'fs';
import { randomBytes } from 'node:crypto';
import { Buffer } from "buffer";

const archiver = require('archiver');
//import archiver from 'archiver'
import { Writable } from 'stream'

@Injectable()
export class FilesService {
  	constructor(private readonly databaseService: DatabaseService) {}

	async createFileFromClient(file_data, user_id, path=null): Promise<string> {
		const hash = randomBytes(32).toString('hex');
		const file = await this.databaseService.file.create({
			data: {
				file_id: hash,
				name: this.getName(file_data),
				extension: this.getExtension(file_data),
				size: this.getSize(file_data),
				type: this.getType(file_data),
				path: path,
				childId: null,
				parentId: null,
				userId: user_id 
			}
		})

		return file.file_id;
	}

	async createFile(file_data): Promise<string> {
		const file = await this.databaseService.file.create({
			data: {
				file_id: file_data.file_id,
				name: file_data.name,
				extension: file_data.extension,
				size: file_data.size,
				type: file_data.type,
				path: file_data.path,
				childId: null,
				parentId: null,
				userId: file_data.userId
			}
		})

		return file.file_id;
	}

	async createFolder(name, path, user_id, parent): Promise<string> {
		const hash = randomBytes(32).toString('hex');
		const folder = await this.databaseService.file.create({
			data: {
				file_id: hash,
				name: name,
				extension: null,
				size: 0,
				type: 'folder',
				path: path,
				childId: null,
				parentId: parent,
				userId: user_id
			}
		})

		return folder.file_id;
	}

	async getFiles(userId, type='', path=null): Promise<object> {
		console.log(type, path);
		const files = await this.databaseService.file.findMany({
			where: {
				userId: userId,
				type: {
					startsWith: type
				},
				path: path
			}
		})
		
		return files;
	}

	async getPhotos(userId): Promise<object> {
		const files = await this.databaseService.file.findMany({
			where: {
				userId: userId,
				type: {
					startsWith: 'image'
				}
			}
		})

		return files;
	}

	async delete(file_data): Promise<boolean> {
		await this.databaseService.file.delete({
			where: {
				file_id: file_data.file_id
			}
		})

		return true;
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
		const file = await this.databaseService.file.findUnique({
			where: {
				file_id: file_id
			}
		})
		
		return file;
	}

	getUrl(userId: number, name: string, path: string = null): string {
		const index: number = Math.floor(userId/100);

		let server_path: string = '';

		if (path === null) {
			server_path = `./files/${index}/${userId}`;
		} else {
			server_path = `./files/${index}/${userId}/${path}`;
		}

		if (!existsSync(server_path)){
			mkdirSync(server_path, { recursive: true });
		}

		return `${server_path}/${name}`;
	}

	getPath(): string {
		return '';
		//return `${path}/${name}`;
	}

	getName(file): string {
		return file.originalname.split(/\.(?=[^\.]+$)/)[0] ?? '';
	}

	getExtension(file): string {
		return file.originalname.split(/\.(?=[^\.]+$)/)[1] ?? null;
	}

	getSize(file): number {
		return Buffer.byteLength(file.buffer);
	}

	getType(file): string {
		return file.mimetype ?? null;
		//return file.mimetype.split('/')[0] ?? null;
	}
}
