import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class FileUtilsService {
  	constructor() {}

	getServerPath(userId: number, name: string, path: string = null): string {
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

}
