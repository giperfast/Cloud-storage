import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RecycleBinService {
  	constructor(private readonly databaseService: DatabaseService) {}

	async createFile(file_data): Promise<string> {
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

		return file.file_id;
	}

	async delete(file_data): Promise<boolean> {
		await this.databaseService.deletedFile.delete({
			where: {
				file_id: file_data.file_id
			}
		})

		return true;
	}

	async getFiles(userId): Promise<object> {
		const files = await this.databaseService.deletedFile.findMany({
			where: {
				userId: userId
			}
		})

		return files;
	}

	async getFileFromId(file_id): Promise<object> {
		const file = await this.databaseService.deletedFile.findUnique({
			where: {
				file_id: file_id
			}
		})
		
		return file;
	}
}
