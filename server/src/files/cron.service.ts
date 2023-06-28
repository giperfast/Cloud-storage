import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CronService {
    constructor(private readonly databaseService: DatabaseService) {}

    @Cron('* 10 * * * *')
    async clearRecyclebin() {
        console.log('start file cron');
        
        await this.databaseService.deletedFile.deleteMany({
            where: {
                expires: {
                    gte: Math.floor(Date.now()/1000),
                },
            },
        })

        console.log('end file cron');
    }
}