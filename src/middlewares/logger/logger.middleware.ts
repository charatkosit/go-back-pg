/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Logging } from "src/logging/entities/logging.entity";
import { LoggingService } from "src/logging/logging.service";
import { Repository } from "typeorm";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(
    @InjectRepository(Logging)
    private readonly loggingRepository: Repository<Logging>,
    private loggingService: LoggingService,
  ) {}


 async use(req: any, res: any, next: (error?: any) => void) {
    console.log(`body is: ${JSON.stringify(req.body)}`);
    console.log(`path is: ${req.path}`);
    console.log(`params is: ${JSON.stringify(req.params['0'])}`);
    console.log(`method is: ${req.method}`)
    // req.timestamp = Date.now();
    // console.log(`timestamp is: ${req.timestamp}`)
    // console.log(req.headers['authorization'].replace('Bearer ',''))


    const byUser = `${req.headers['authorization'].replace('Bearer ','')}`;
    const path = JSON.stringify(req.params['0']);
    const method = `${req.method}`
    const body = JSON.stringify(req.body)
    const timestamp = this.loggingService.formatTimestamp(Date.now())
    await this.loggingRepository.save({
         Log_By : byUser,
         Log_Path:  path,
         Log_Method: method,
         Log_Body: body ,
         Log_Timestamp: timestamp})
  next();
    
  }

}