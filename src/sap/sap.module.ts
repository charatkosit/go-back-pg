/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SapController } from './sap.controller';
import { SapService } from './sap.service';
import { HttpModule } from '@nestjs/axios';
// import { HttpService } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [SapController],
  providers: [SapService,
              // HttpService,
            ]
})
export class SapModule { }
