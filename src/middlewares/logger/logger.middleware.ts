/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { environment } from "src/environments/environment";
import { Logging } from "src/logging/entities/logging.entity";
import { LoggingService } from "src/logging/logging.service";
import { Repository } from "typeorm";
import jwtDecoder from 'jwt-decode';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(
    @InjectRepository(Logging)
    private readonly loggingRepository: Repository<Logging>,
    private loggingService: LoggingService,
    // private authService: AuthService
  ) { }

  byUser = '';
  //UTC บน NB กับบน EC2 ไม่ตรงกันบน EC2 ต้องตั้ง UTC_OFFSET=7
  utcOffset:any = process.env.UTC_OFFSET || 0;
  
 
  async use(req: any, res: any, next: (error?: any) => void) {
    console.log(`body is: ${JSON.stringify(req.body)}`);
    console.log(`params is: ${JSON.stringify(req.params['0'])}`);
    console.log(`method is: ${req.method}`)


    //กรณี Get method จะไม่มี Header มา
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.slice(7);
      if (token) {
        try {
          // ถอดรหัส JWT ด้วยคีย์ลับเพื่อรับข้อมูล payload
          //debug
          // console.log(`jwtToken=${token}`)
          const decodedPayload:any = jwtDecoder(token)
          console.log(decodedPayload.userId);
          this.byUser = decodedPayload.userId
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการถอดรหัส JWT:', error.message);
        }
      }

    } else {
      this.byUser = 'System'
    }


    const path = JSON.stringify(req.params['0']);
    const method = `${req.method}`
    const body = JSON.stringify(req.body)
    const timestamp = this.loggingService.formatTimestamp(Date.now() + this.utcOffset * 60 * 60 * 1000)
    // const timestamp:string = toString(Date.now()); 
    console.log(`utc=${this.utcOffset}`)
    console.log(timestamp)
    
    await this.loggingRepository.save({
      Log_By: this.byUser,
      Log_Path: path,
      Log_Method: method,
      Log_Body: body,
      Log_Timestamp: timestamp
    })
    next();

  }

}