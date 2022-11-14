/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234567890',
    database: 'autogp1',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}