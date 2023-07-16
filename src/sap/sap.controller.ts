/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SapService } from './sap.service';
import { environment } from '../environments/environment';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { urlencoded } from 'express';
import { cursorTo } from 'readline';
import { ApiBulkDetails } from 'src/interfaces/ApiBulkDetails';

@Controller({
    version: '1',
    path: 'sap'
})
export class SapController {
    constructor(private sap: SapService) { }

    //localhost:3000/api/v1/sap/BillTo/
    // @UseGuards(JwtAuthGuard)
    @Post('BillTo')
    @HttpCode(200)
    async billTo(@Body('customer_code') customer_code: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { customer_code: customer_code }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetBillTo/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/Shipto/
    // @UseGuards(JwtAuthGuard)
    @Post('ShipTo')
    @HttpCode(200)
    async shipToData(@Body('BillToCode') BillToCode: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { BillToCode: BillToCode }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetShipTo/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/Transport/
    // @UseGuards(JwtAuthGuard)
    @Post('Transport')
    @HttpCode(200)
    async Transport(@Body('ShipToCode') ShipToCode: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { ShipToCode: ShipToCode }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetTransport/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/Invoice/
    @UseGuards(JwtAuthGuard)
    @Post('Invoice')
    @HttpCode(200)
    async Invoice(@Body('customer_code') customer_code: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { customer_code: customer_code }
        }
        console.log(dataUrl)
        // const url = 'http://192.168.20.17:8880/apigoplus/GetInv/';
        const url = 'apigoplus/GetInv/';

        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/InvoiceDetails/
    // @UseGuards(JwtAuthGuard)
    @Post('InvoiceDetails')
    @HttpCode(200)
    async InvoiceDetails(@Body() data: any) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: {
                customer_code: data.customer_code,
                taxnumber: data.taxnumber,
                doctype: data.doctype
            }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetInvDetails/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/CreditBalance/
    // @UseGuards(JwtAuthGuard)
    @Post('CreditBalance')
    @HttpCode(200)
    async CreditBalance(@Body('customer_code') customer_code: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { customer_code: customer_code }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetCreditBalance/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/Delivery/
    // @UseGuards(JwtAuthGuard)
    @Post('Delivery')
    @HttpCode(200)
    async Delivery(@Body('customer_code') customer_code: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { customer_code: customer_code }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetOpenOrder/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/DeliveryDetails/
    // @UseGuards(JwtAuthGuard)
    @Post('DeliveryDetails')
    @HttpCode(200)
    async DeliveryDetails(@Body() data: any) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: {
                customer_code: data.customer_code,
                orderno: data.orderno
            }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetOpenOrderDetails/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/CusDiscount/
    // @UseGuards(JwtAuthGuard)
    @Post('CusDiscount')
    @HttpCode(200)
    async CusDiscount(@Body() data: any) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: {
                CardCode: data.CardCode,
                ItemCode: data.ItemCode
            }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetItemInfo/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }

    //localhost:3000/api/v1/sap/searchPartlist/
    // @UseGuards(JwtAuthGuard)
    @Post('searchPartlist')
    @HttpCode(200)
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
        console.log(dataUrl)
        const url = 'apigoplus/EnqPartlist/';
        const response = await this.sap.postData(url, dataUrl);
        return response;

    }


    //****************************
    //localhost:3000/api/v1/sap/bulkInvoice/   ดึงทั้ง INV และ CN
    // @UseGuards(JwtAuthGuard)
    @Post('bulkInvoice')
    @HttpCode(200)
    async bulkInvoice(@Body('customer_code') customer_code: string) {
        const dataUrl = {
            token: environment.sapApiToken,
            data: { customer_code: customer_code }
        }
        console.log(dataUrl)
        const url = 'apigoplus/GetInv/';
        const initialData = await this.sap.postData(url, dataUrl);
        const dataFullTax = initialData.data.map(item => ({a:item.FullTaxNumber,b:item.DocType,c:customer_code}));
        const result = await this.sap.fetchAllData(dataFullTax);
        const finalResult = await result.flat();
        // console.log(dataFullTax)
         return finalResult
 

    }

}
