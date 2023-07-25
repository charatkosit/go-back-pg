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
 
  byUser = ''; 

 async use(req: any, res: any, next: (error?: any) => void) {
    console.log(`body is: ${JSON.stringify(req.body)}`);
    console.log(`params is: ${JSON.stringify(req.params['0'])}`);
    console.log(`method is: ${req.method}`)

    //กรณี Get method จะไม่มี Header มา
    // console.log(req.headers['authorization'])
    if (req.headers['authorization'] != null){
       this.byUser = `${req.headers['authorization'].replace('Bearer ','')}`;
    } else {
       this.byUser = 'System'
    }

    
    const path = JSON.stringify(req.params['0']);
    const method = `${req.method}`
    const body = JSON.stringify(req.body)
    const timestamp = this.loggingService.formatTimestamp(Date.now())
    await this.loggingRepository.save({
         Log_By : this.byUser,
         Log_Path:  path,
         Log_Method: method,
         Log_Body: body ,
         Log_Timestamp: timestamp})
  next();
    
  }

}