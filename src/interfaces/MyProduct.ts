/* eslint-disable prettier/prettier */
export interface myProduct {
    errorCode:   string;
    resultFound: string;
    data:        Datum[];
}

export interface Datum {
    Brand:      Brand;
    ItemName:   string;
    Barcode:    string;
    BarcodeNew: string;
    Model:      string;
    Price:      string;
}

export enum Brand {
    Chevrolet = "CHEVROLET",
    Isuzu = "ISUZU",
    Toyota = "TOYOTA",
}
