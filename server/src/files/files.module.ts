import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { DatabaseModule } from '../database/database.module';
import { RecycleBinService } from './recyclebin.service';
import { AuthService } from '../auth/auth.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { ValidatorsService } from './validators.service';
import { FileUtilsService } from './utils.service';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  controllers: [FilesController],
  providers: [FilesService, RecycleBinService, AuthService, ValidatorsService, FileUtilsService, CronService],
})
export class FilesModule {}
