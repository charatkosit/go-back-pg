/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';


@Injectable()
export class SapService {
 constructor(private http:HttpService ){}
 //แบบที่ 1
//  async fetchDataFromExternalApi(): Promise<any> {
//     const response = await fetch('https://fakestoreapi.com/products');
//     const data = await response.json();
//     return data;
//   }

//แบบที่2 axios  
async fetchDataFromExternalApi2(): Promise<AxiosResponse<any>> {
      return await axios.get('https://fakestoreapi.com/products').then(
        (res) => {
            const axiosResponse = res;
            const responseData = axiosResponse.data;
            // const responseStaus = axiosResponse.status;
            // const responseHeader = axiosResponse.headers;
            return responseData;
        })
        .catch((error) => console.error(error));
    
  }
}
