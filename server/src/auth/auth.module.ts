import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { FilesService } from 'src/files/files.service';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RecycleBinService } from 'src/files/recyclebin.service';
import { FileUtilsService } from 'src/files/utils.service';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService, FilesService, RecycleBinService, FileUtilsService, CronService],
})
export class AuthModule {}
