import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { FilesService } from 'src/files/files.service';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService, FilesService, CronService],
})
export class AuthModule {}
