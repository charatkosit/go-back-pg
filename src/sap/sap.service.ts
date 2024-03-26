/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, catchError, from, lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class SapService {
  constructor(private http: HttpService) {
  }

  //แบบ Promise
  async postData(preurl: string, data: any): Promise<any> {
    try {
      const url = 'http://192.168.20.17:8880/' + preurl;
      const response = await this.http.post(url, data).toPromise();
      return response.data;
    } catch (error) {
      throw new Error(`Error calling API: ${error.message}`);
    }
  }



//ใช้แบบ Observable
  postData2(preurl: string, body: any, headers: any): Observable<any> {
    const url = 'http://192.168.20.17:8880/' + preurl;
    const config: AxiosRequestConfig = {
      headers: headers
    };
    
    // แปลง Axios Promise ไปเป็น Observable
    return from(axios.post(url, body, config)).pipe(
      map(response => response.data),
      catchError(error => { throw new Error(`Error calling API: ${error.message}`); })
    );
  }
  

  async fetchData(url:string,taxnumber:string, doctype:string,customer_code:string): Promise<any> {
    try{
      const dataUrl = {
        token: environment.sapApiToken,
        data: {
            customer_code: customer_code,
            taxnumber:     taxnumber,
            doctype:       doctype
        }
    }
      const response = await axios.post(url, dataUrl);
      const adjResponse = response.data.data.map( item => 
        ( {
           taxnumber:     taxnumber,
           customer_code: customer_code,
           ItemCode:   item.ItemCode,
           ItemName:   item.ItemName,
           Quantiy:    item.Quantiy,
           Price:      item.Price,
           DiscPrcnt:  item.DiscPrcnt,
           LineTotal:  item.LineTotal,
           BillDisAmt: item.BillDisAmt,
           LineTotalAfterBillDisc: item.LineTotalAfterBillDisc

          }))
      return adjResponse
    }catch(error){
      throw new Error(`Error calling API: ${error.message}`);
    }
    
    
  }

  async fetchAllData(dataFullTax: any[]): Promise<any[]> {
    const url = 'http://192.168.20.17:8880/apigoplus/GetInvDetails/';
    const requests = dataFullTax.map( item => this.fetchData(url,item.a,item.b,item.c ));
    return Promise.all(requests);
   
  }
}
