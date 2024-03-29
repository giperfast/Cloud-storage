import { Controller, Get, Post, UploadedFiles, UseInterceptors, Req, Res, Query, Body } from '@nestjs/common';
import { FilesInterceptor} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FilesService } from './files.service';
import { AuthService } from '../auth/auth.service';

import { writeFile, readFileSync, createWriteStream } from 'fs';
import { gzip, unzip, unzipSync } from 'zlib';
import { Buffer } from "buffer";
import { Writable } from 'stream'
import { RecycleBinService } from './recyclebin.service';
import { ValidatorsService } from './validators.service';

const archiver = require('archiver');
var Stream = require('stream');

@Controller('files')
export class FilesController {
	constructor(
		private readonly filesService: FilesService,
		private readonly recyclebinService: RecycleBinService,
		private readonly authService: AuthService,
		private readonly validatorsService: ValidatorsService
	) {}

	@Post('/upload')
	@UseInterceptors(FilesInterceptor('file'))
  	async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request: Request, @Query() query: string): Promise<any> {
		const user = await this.authService.fromBaerer(request);

		let result = [];
		
		for (const file of files) {
			const hash = await this.filesService.createFileFromClient(file, user.id, query['path'] || null);
			const path = this.filesService.getUrl(user.id, hash, query['path'] || null);

			gzip(file.buffer, function (_, result_buffer) {
				writeFile(path, result_buffer, function (err) {
					if (err) return console.log(err);
					console.log(path, file.originalname);
				});
			});

			result.push({
				file_id: hash,
				name: file.originalname
			});
		}

		return result;
  	}

	@Get('/')
	async getFiles(@Req() request: Request, @Query() query: string): Promise<any> {
		const user = await this.authService.fromBaerer(request);
		
		let files = {};

		switch (query['type']) {
			case 'recent':
				files = await this.filesService.getRecent(user.id);
				break;

			case 'photo':
				files = await this.filesService.getImages(user.id);
				break;

			case 'recycle':
				files = await this.recyclebinService.getFiles(user.id);
				break;
			
			default:
				files = await this.filesService.getFiles(user.id, '', query['path'] || null);
				break;
		}

		return files;
	}

	@Get('/download')
	async downloadFiles(@Req() request: Request, @Res() response: Response, @Query() query: Array<string>): Promise<any> {
		const user = await this.authService.fromBaerer(request);

		if (!Array.isArray(query['file'])) {
			const file_hash = query['file'];
			const file = await this.filesService.getFileFromId(file_hash);
			const path = this.filesService.getUrl(user.id, file['file_id']);
			console.log(path);
			
			const compressed_buffer = readFileSync(path);
			const uncompressed_buffer = unzipSync(compressed_buffer);
			//response.attachment('test.zip');
			response.setHeader('content-type', file['type']);
			return response.send(uncompressed_buffer);
		}

		console.log('start');
		
		let archive = archiver('zip', {
			zlib: { level: 0 }
		});
		const converter = new Writable();
		const buffs = [];
		
		response.attachment('files.zip');
		response.setHeader('content-type', 'application/zip');

		converter._write = (chunk, encoding, cb) => {
			buffs.push(chunk);
			process.nextTick(cb);
		}
	  
		converter.on('finish', () => {
			console.log('finish');
			return response.send(Buffer.concat(buffs));
		})

		archive.pipe(converter);
		
		for (const file_hash of query['file']) {
			const file_data = await this.filesService.getFileFromId(file_hash);
			const path = this.filesService.getUrl(user.id, file_hash);
			console.log('read file');
			const compressed_buffer = readFileSync(path);
			console.log('unzipping file');
			const uncompressed_buffer = unzipSync(compressed_buffer);
			console.log('append to zip file');
			archive.append(uncompressed_buffer, {name: `${file_data['name']}.${file_data['extension']}` });
		}
		
		console.log('finalize');
		await archive.finalize(); 
		console.log('finish finalize');
	}

	@Post('/delete')
	async deleteFiles(@Req() request: Request, @Res() response: Response, @Body() body: Array<string>): Promise<any> {
		await this.authService.fromBaerer(request);
		//response.status(200).send({ success: true });

		for (const file_hash of body['files']) {

			const file = await this.filesService.getFileFromId(file_hash);

			if (file === null) {
				continue;
			}

			/*const childs: Array<Object> = await this.filesService.getChilds(file['userId'], file['path'] || encodeURIComponent(file['name']));
			console.log(childs);
			
			for (let index = 0; index < childs.length; index++) {
				const child = childs[index];

				if (child === undefined) {
					break;
				}

				await this.recyclebinService.createFile(child);
				await this.filesService.delete(child);
			}*/

			await this.recyclebinService.createFile(file);
			await this.filesService.delete(file);
		}

		response.status(200).send({ success: true });
	}

	@Post('/force-delete')
	async forceDeleteFiles(@Req() request: Request, @Res() response: Response, @Body() body: Array<string>): Promise<any> {
		await this.authService.fromBaerer(request)
		//response.status(200).send({ success: true });

		for (const file_hash of body['files']) {

			await this.recyclebinService.forceDelete(file_hash);

			/*const file = await this.filesService.getFileFromId(file_hash)

			if (file === null) {
				continue;
			}

			await this.recyclebinService.createFile(file);
			await this.filesService.delete(file);*/
		}

		//response.status(200).send({ success: true });
	}

	@Post('/restore')
	async restoreFiles(@Req() request: Request, @Res() response: Response, @Body() body: Array<string>): Promise<any> {
		await this.authService.fromBaerer(request);
		console.log(body);
		//response.status(200).send({ success: true });

		for (const file_hash of body['files']) {
			const file = await this.recyclebinService.getFileFromId(file_hash)
			
			if (file === null) {
				continue;
			}

			await this.filesService.createFile(file);
			await this.recyclebinService.delete(file['file_id']);
		}

		response.status(200).send({ success: true });
	}

	@Post('/create-folder')
	async createFilder(@Req() request: Request, @Res() response: Response, @Query() query: Array<string>): Promise<any> {
		const user = await this.authService.fromBaerer(request)
		const validator = await this.validatorsService.folderName(query['name']);

		console.log(query);

		if (!validator.check()) {
			console.log(validator.getError());
			return response.status(500).send({ success: false, error: validator.getError() });
		}

		const hash = await this.filesService.createFolder(query['name'], query['path'] || null, user.id, null);
		return response.status(200).send({ success: true });
	}
}
