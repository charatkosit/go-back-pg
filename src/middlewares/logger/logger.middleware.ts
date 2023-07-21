/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {


  use(req: any, res: any, next: () => void) {
    console.log(`body is: ${JSON.stringify(req.body)}`);
    console.log(`path is: ${req.path}`);
    console.log(`method is: ${req.method}`)
    req.timestamp = Date.now();
    console.log(`timestamp is: ${req.timestamp}`)
    // const {keyword} = req.query;


    next();
  }



}
