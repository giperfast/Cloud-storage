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

	async createFile(file_data, userId): Promise<string> {
		const file = await this.databaseService.file.create({
			data: {
				file_id: randomBytes(32).toString('hex'),
				name: this.getName(file_data),
				extension: this.getExtension(file_data),
				size: this.getSize(file_data),
				type: this.getType(file_data),
				userId: userId
			}
		})

		return file.file_id;
	}

	async getFiles(userId): Promise<object> {
		const files = await this.databaseService.file.findMany({
			where: {
				userId: userId
			}
		})

		return files;
	}

	async getDeletedFiles(userId): Promise<object> {
		const files = await this.databaseService.deletedFile.findMany({
			where: {
				userId: userId
			}
		})

		return files;
	}

	async copyFileToRecycleBin(file_data): Promise<object> {
		const file = await this.databaseService.deletedFile.create({
			data: {
				file_id: file_data.file_id,
				name: file_data.name,
				extension: file_data.extension,
				size: file_data.size,
				type: file_data.type,
				expires: Math.floor(Date.now()/1000) + 86400,
				userId: file_data.userId
			}
		})

		await this.databaseService.file.delete({
			where: {
				file_id: file_data.file_id,
			},
		})
		
		return file;
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

	getUrl(userId: number, name: string): string {
		const index: number = Math.floor(userId/100);
		const path: string = `./files/${index}/${userId}`;

		if (!existsSync(path)){
			mkdirSync(path, { recursive: true });
		}

		return `${path}/${name}`;
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
