/* eslint-disable prettier/prettier */
export interface AxiosRequestConfig {
    headers: Headers;
    params:  Params;
}

export interface Headers {
    "Content-Type": string;
}

export interface Params {
    token:         string;
    customer_code: string;
}
