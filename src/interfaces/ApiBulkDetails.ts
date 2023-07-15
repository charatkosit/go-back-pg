/* eslint-disable prettier/prettier */
export interface ApiBulkDetails {
    DocType: any;
    FullTaxNumber: any;
    access_token:  string;
    customer_code: string;
    data:          Datum[];
}

export interface Datum {
    FullTaxNumber: string;
    DocType:string;
}
