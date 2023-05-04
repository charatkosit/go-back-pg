/* eslint-disable prettier/prettier */
export interface JwtPayload {
    userId:     number;
    permission: string;
    iat:        number;
    exp:        number;
}