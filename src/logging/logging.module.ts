import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { Logging } from './entities/logging.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Logging])],
  controllers: [LoggingController],
  providers: [LoggingService],
})
export class LoggingModule {}
