import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { existsSync, mkdirSync } from 'fs';
import { randomBytes } from 'node:crypto';
import { Buffer } from "buffer";

@Injectable()
export class FilesService {
  	constructor(private readonly databaseService: DatabaseService) {}

	async createFile(file_data, userId): Promise<string> {
		const file_id = randomBytes(32).toString('hex');
		const file = await this.databaseService.file.create({
			data: {
				file_id: file_id,
				name: this.getName(file_data),
				extension: this.getExtension(file_data),
				size: this.getSize(file_data),
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

	getUrl(userId: number, name: string): string {
		const index: number = Math.floor(userId/100);
		const path: string = `./files/${index}/${userId}`;

		if (!existsSync(path)){
			mkdirSync(path);
		}

		return `${path}/${name}`;
	}

	getName(file): string {
		return file.originalname.split(/\.(?=[^\.]+$)/)[0] ?? null;
	}

	getExtension(file): string {
		return file.originalname.split(/\.(?=[^\.]+$)/)[1] ?? null;
	}

	getSize(file): number {
		return Buffer.byteLength(file.buffer);
	}
}
