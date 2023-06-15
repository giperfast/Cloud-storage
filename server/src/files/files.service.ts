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
		const file_id = randomBytes(32).toString('hex');
		const file = await this.databaseService.file.create({
			data: {
				file_id: file_id,
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

	async getFileFromId(file_id): Promise<object> {
		const file = await this.databaseService.file.findUnique({
			where: {
				file_id: file_id
			}
		})
		
		return file;
	}

	zipFiles(files) {
	  return new Promise((resolve, reject) => {
		const buffs = []
	
		const converter = new Writable()
	
		converter._write = (chunk, encoding, cb) => {
		  buffs.push(chunk)
		  process.nextTick(cb)
		}
	
		converter.on('finish', () => {
		  resolve(Buffer.concat(buffs))
		})
	
		const archive = archiver('zip', {
		  zlib: { level: 9 }
		})
	
		archive.on('error', err => {
		  reject(err)
		})
	
		archive.pipe(converter)
	
		for (const file of files) {
		  archive.append(file.data, { name: file.name })
		}
	
		archive.finalize()
	  })
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
		return file.mimetype.split('/')[0] ?? null;
	}
}
