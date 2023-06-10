import { Controller, Get, Post, UploadedFiles, UseInterceptors, Req } from '@nestjs/common';
import { FilesInterceptor} from '@nestjs/platform-express';
import { Request } from 'express';
import { FilesService } from './files.service';
import { AuthService } from '../auth/auth.service';

import { writeFile } from 'fs';
import { gzip, unzip } from 'zlib';


@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService, private readonly authService: AuthService) {}

	@Post('/upload')
	@UseInterceptors(FilesInterceptor('files[]'))
  	async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request: Request): Promise<any> {
		const user = await this.authService.fromBaerer(request);

		for (const file of files) {

			const hash = await this.filesService.createFile(file, user.id);
			const path = this.filesService.getUrl(user.id, hash);

			gzip(file.buffer, function (_, result_buffer) {
				writeFile(path, result_buffer, function (err) {
					if (err) return console.log(err);
					console.log(path, file.originalname);
				});
			})
		}
  	}

	  @Get('/')
	  
	async getFiles(@Req() request: Request): Promise<any> {
		const user = await this.authService.fromBaerer(request);
  
		const files = this.filesService.getFiles(user.id);
		return files;
	}

	/*@Post('/single-upload')
	@UseInterceptors(FilesInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
		console.log(file);
	}*/

}
