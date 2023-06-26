import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { DatabaseModule } from '../database/database.module';
import { RecycleBinService } from './recyclebin.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService, RecycleBinService, AuthService],
})
export class FilesModule {}
