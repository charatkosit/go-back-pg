/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { SapService } from './sap.service';

@Controller('sap')
export class SapController {
    constructor(private sap:SapService){}

    //localhost:3000/api/sap/bill
    @Get('bill')
    getBill() {
        // return "bill return"
        return this.sap.fetchDataFromExternalApi2();
    }
}
