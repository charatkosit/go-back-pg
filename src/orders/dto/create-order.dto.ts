/* eslint-disable prettier/prettier */
export class CreateOrderDto {
    cus_id: string;
    date_time: string;
    bill_to: string;
    transportation: string;
    ship_to: string;
    credit: number;
    sum_amountSale: number;
    sum_amountRTP: number;
    sum_discount: number;
    total: number;
    vat: number;
    grand_total: number;
}
