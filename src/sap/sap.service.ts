/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';


@Injectable()
export class SapService {
  constructor(private http: HttpService) {
     }
  
  //แบบที่ 4

  async postData(url: string, data: any): Promise<any> {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error calling API: ${error.message}`);
    }
  }
}
