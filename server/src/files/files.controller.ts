import { Controller, Get, Post, UploadedFiles, UseInterceptors, Req, Res, Query } from '@nestjs/common';
import { FilesInterceptor} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FilesService } from './files.service';
import { AuthService } from '../auth/auth.service';

import { writeFile, readFileSync, createWriteStream } from 'fs';
import { gzip, unzip, unzipSync } from 'zlib';
import { Buffer } from "buffer";
import { Writable } from 'stream'
const archiver = require('archiver');
var Stream = require('stream');

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

		if (!Array.isArray(query['file'])) {
			const file_hash = query['file'];
			const file = await this.filesService.getFileFromId(file_hash)
			const path = this.filesService.getUrl(user.id, file['file_id'])
			const compressed_buffer = readFileSync(path);
			const uncompressed_buffer = unzipSync(compressed_buffer);
			//response.attachment('test.zip');
			return response.send(uncompressed_buffer);
		}

		
		let archive = archiver('zip');
		const converter = new Writable()
		const buffs = [];
		
		response.attachment('files.zip');

		converter._write = (chunk, encoding, cb) => {
			buffs.push(chunk)
			process.nextTick(cb)
		}
	  
		converter.on('finish', () => {
			
			/*response.write('test');
			response.write(Buffer.concat(buffs));
			return response.end();*/

			//response.write("bar");
			return response.send(Buffer.concat(buffs));
		})

		archive.pipe(converter)
		
		//response.send('unzipping')
		for (const file_hash of query['file']) {
			const file_data = await this.filesService.getFileFromId(file_hash)
			const path = this.filesService.getUrl(user.id, file_hash)
			const compressed_buffer = readFileSync(path);
			const uncompressed_buffer = unzipSync(compressed_buffer);
			archive.append(uncompressed_buffer, {name: `${file_data['name']}.${file_data['extension']}` });
		}
		
		archive.finalize();
	}
}
