import { Controller, Get, Post, UploadedFiles, UseInterceptors, Req, Res, Query } from '@nestjs/common';
import { FilesInterceptor} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FilesService } from './files.service';
import { AuthService } from '../auth/auth.service';

import { writeFile, readFileSync, createWriteStream } from 'fs';
import { gzip, unzip } from 'zlib';
import { Buffer } from "buffer";
import { Writable } from 'stream'
const archiver = require('archiver');


@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService, private readonly authService: AuthService) {}

	@Post('/upload')
	@UseInterceptors(FilesInterceptor('file'))
  	async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request: Request): Promise<any> {
		const user = await this.authService.fromBaerer(request);
		let result = [];
		for (const file of files) {
			console.log(file);
			
			const hash = await this.filesService.createFile(file, user.id);
			const path = this.filesService.getUrl(user.id, hash);

			gzip(file.buffer, function (_, result_buffer) {
				writeFile(path, result_buffer, function (err) {
					if (err) return console.log(err);
					console.log(path, file.originalname);
				});
			})

			result.push({
				file_id: hash,
				name: file.originalname
			});
		}

		return result;
  	}

	@Get('/')
	async getFiles(@Req() request: Request): Promise<any> {
		const user = await this.authService.fromBaerer(request);
		const files = this.filesService.getFiles(user.id);
		return files;
	}

	@Get('/download')
	async downloadFiles(@Req() request: Request, @Res() response: Response, @Query() query: Array<string>): Promise<any> {
		const user = await this.authService.fromBaerer(request);
		console.log(query);

		const file_hash = query['file'];
		console.log(file_hash);
		const file = await this.filesService.getFileFromId(file_hash)
		const path = this.filesService.getUrl(user.id, file['file_id'])
		const compressed_buffer = readFileSync(path);
		unzip(compressed_buffer, function (_, result_buffer) {
			response.setHeader('Content-Length', file['size'])
			response.send(result_buffer);
		})

		return true;
		/*if (!Array.isArray(query['files'])) {
			const file_hash = query['files'];
			const file = await this.filesService.getFileFromId(file_hash)
			const path = this.filesService.getUrl(user.id, file['file_id'])
			const compressed_buffer = readFileSync(path);
			unzip(compressed_buffer, function (_, result_buffer) {
				response.setHeader('Content-Length', file['size'])
				response.send(result_buffer);
			})
			return true;
		}*/
		
		/*var archive = archiver('zip', {
			gzip: false,
			zlib: { level: 9 } // Sets the compression level.
		});

		const buffs = []
		//var output = createWriteStream('./example.zip');
		const converter = new Writable()

    	converter._write = (chunk, encoding, cb) => {
			buffs.push(chunk)
			process.nextTick(cb)
		}

		archive.pipe(converter);*/
		
		/*for (const file_hash of query['files']) {
			const file_data = await this.filesService.getFileFromId(file_hash)
			const path = this.filesService.getUrl(user.id, file_hash)
			const compressed_buffer = readFileSync(path);
			unzip(compressed_buffer, function (_, result_buffer) {
				archive.append(result_buffer, { name: `${file_data['name']}.${file_data['extension']}` });
			})
			
		}

		archive.finalize();
		const bytes = Buffer.concat(buffs)
		console.log(bytes);*/
		response.send(this.filesService.zipFiles([
		{
			data: Buffer.from('just a buf'),
			name: 'file.txt'
		}
		]));
		
		//unzip(multiple_buffer, function (_, result_buffer) {
		//	response.send(result_buffer);
		//})
		
	
		
	}
	
	/*@Post('/single-upload')
	@UseInterceptors(FilesInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
		console.log(file);
	}*/

}
