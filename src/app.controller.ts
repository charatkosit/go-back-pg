/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService, Movie, Envs } from './app.service';
import { HttpStatus } from '@nestjs/common';

@Controller({
  version : '1',
  path: 'env'
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // getMovies(): Movie[] {
  //   return this.appService.getMovies();
  // }



  getenvStatus() {
    const data = this.appService.getenvStatus();
    const counter:number = Object.keys(data).length
    let code:number;
    let message:string;
    console.log(counter);
    if (counter == 0) {
        code =HttpStatus.NOT_FOUND;
        message='Not Found';  
    }else {
        code =HttpStatus.OK;
        message='OK';
    }
    return {
      code: code,
      message: message,
      resultFound: counter,
      data
    } 
  }
}
