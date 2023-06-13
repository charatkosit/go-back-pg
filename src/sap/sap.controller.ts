/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SapService } from './sap.service';
import { environment } from '../environments/environment';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { urlencoded } from 'express';

@Controller({
    version: '1',
    path: 'sap'
})
export class SapController {
    constructor(private sap: SapService) { }

    //localhost:3000/api/v1/sap/BillTo/
    @UseGuards(JwtAuthGuard)
    @Post('BillTo')
    async billTo(@Body('customer_code') customer_code: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { customer_code: customer_code }
        }
        // console.log(dataUrl)
        const url = 'http://192.168.20.17:8880/apigoplus/GetBillTo/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/Shipto/
    @UseGuards(JwtAuthGuard)
    @Post('ShipTo')
    async shipToData(@Body('BillToCode') BillToCode: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { BillToCode: BillToCode }
        }
        // console.log(dataUrl)
        const url = 'http://192.168.20.17:8880/apigoplus/GetShipTo/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }
    //localhost:3000/api/v1/sap/Transport/
    @UseGuards(JwtAuthGuard)
    @Post('Transport')
    async Transport(@Body('ShipToCode') ShipToCode: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { ShipToCode: ShipToCode }
        }
        // console.log(dataUrl)
        const url = 'http://192.168.20.17:8880/apigoplus/GetTransport/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }
    //localhost:3000/api/v1/sap/Invoice/
    @UseGuards(JwtAuthGuard)
    @Post('Invoice')
    async Invoice(@Body('customer_code') customer_code: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { customer_code: customer_code }
        }
        // console.log(dataUrl)
        const url = 'http://192.168.20.17:8880/apigoplus/GetInv/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }
    //localhost:3000/api/v1/sap/InvoiceDetails/
    @UseGuards(JwtAuthGuard)
    @Post('InvoiceDetails')
    async InvoiceDetails(@Body() data: any) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: {
                customer_code: data.customer_code,
                taxnumber: data.taxnumber,
                doctype: data.doctype
            }
        }
        // console.log(dataUrl)
        const url = 'http://192.168.20.17:8880/apigoplus/GetInvDetails/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }


    //localhost:3000/api/v1/sap/CreditBalance/
    @UseGuards(JwtAuthGuard)
    @Post('CreditBalance')
    async CreditBalance(@Body('customer_code') customer_code: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { customer_code: customer_code }
        }
        // console.log(dataUrl)
        const url = 'http://192.168.20.17:8880/apigoplus/GetCreditBalance/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }


    //localhost:3000/api/v1/sap/CusDiscount/
    @UseGuards(JwtAuthGuard)
    @Post('CusDiscount')
    async CusDiscount(@Body() data: any) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { CardCode: data.CardCode,
                    ItemCode: data.ItemCode
                  }
        }
        // console.log(dataUrl)
        const url = 'http://192.168.20.17:8880/apigoplus/GetItemInfo/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }
    //localhost:3000/api/v1/sap/searchPartlist/
    @UseGuards(JwtAuthGuard)
    @Post('searchPartlist')
    async searchPartlist(@Body() data: any) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: {
                partsno: data.partsno,
                partsname: data.partsname,
                brand: data.brand,
                model: data.model
            }
        }
        // console.log(dataUrl)
        const url = 'http://192.168.20.17:8880/apigoplus/EnqPartlist/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }
}
